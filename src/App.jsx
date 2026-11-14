import { tiles as defaultTiles, categories } from "./data/tiles";
import { Tile } from "./components/Tile/Tile.jsx";
import { CategoryTabs } from "./components/CategoryTabs/CategoryTabs.jsx";
import { SentenceBar } from "./components/SentenceBar/SentenceBar.jsx";
import { AddTileDialog } from "./components/AddTileDialog/AddTileDialog.jsx";
import "./App.css";
import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [clickedWords, setClickedWords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [speed, setSpeed] = useState(() => {
    try {
      const saved = Number(localStorage.getItem("speed"));
      return saved >= 0.5 && saved <= 1.5 ? saved : 1;
    } catch {
      return 1;
    }
  });

  const [tiles, setTiles] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tiles"));
      return Array.isArray(saved) && saved.length > 0 ? saved : defaultTiles;
    } catch {
      return defaultTiles;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    try {
      localStorage.setItem("speed", String(speed));
    } catch {}
  }, [speed]);

  useEffect(() => {
    try {
      localStorage.setItem("tiles", JSON.stringify(tiles));
    } catch {}
  }, [tiles]);

  const tileClickHandler = (tile) => {
    if (editMode) {
      console.log("edit", tile);
    } else {
      setClickedWords((prev) => [...prev, tile.label]);
    }
  };

  const emptySentenceHandler = () => {
    setClickedWords([]);
  };

  const speak = () => {
    const sentence = clickedWords.join(" ");

    if (!sentence) return;

    if (!("speechSynthesis" in window)) {
      alert("Sorry, this browser can't speak. Try Chrome.");
      return;
    }

    window.speechSynthesis.cancel();
    // an object holding my text
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = speed;
    window.speechSynthesis.speak(utterance);
  };

  const removeWord = (index) => {
    setClickedWords((prev) => prev.filter((w, i) => i !== index));
  };

  const addTile = (tile) => {
    setTiles((prev) => [...prev, tile]);
    setSelectedCategory(tile.category);
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>AAC Board</h1>
        <button
          type="button"
          className={`edit-toggle ${editMode ? "on" : ""}`}
          aria-pressed={editMode}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Done editing" : "Edit board"}
        </button>
      </header>

      {editMode && (
        <p className="edit-banner" role="status">
          Editing: tap a tile to change it, or add a new one
        </p>
      )}

      <div className="sentencebar-container">
        <SentenceBar words={clickedWords} onRemoveWord={removeWord} />
        <div className="sentencebar-btns-container">
          <div className="actions-btn-container">
            <button onClick={emptySentenceHandler}>Clear</button>
            <button className="speak-btn" onClick={speak}>
              Speak <Volume2 />
            </button>
          </div>
        </div>
      </div>

      <div className="speed-control">
        <label htmlFor="speed" className="speed-label">
          Speaking speed
        </label>
        <div className="speed-row">
          <input
            id="speed"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            aria-valuetext={`${speed.toFixed(1)} times normal speed`}
          />
          <output htmlFor="speed" className="speed-value">
            {speed.toFixed(1)}x
          </output>
        </div>
      </div>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid">
        {tiles
          .filter((tile) => tile.category === selectedCategory)
          .map((tile) => (
            <Tile
              onTileClick={tileClickHandler}
              key={tile.id}
              tile={tile}
              editMode={editMode}
            />
          ))}

        {editMode && (
          <button onClick={() => setShowAddForm(true)} type="button" className="tile add-tile">
            + Add tile
          </button>
        )}
      </div>
      {showAddForm && (
        <AddTileDialog
          categories={categories}
          defaultCategory={selectedCategory}
          onAdd={addTile}
          onClose={() => setShowAddForm(false)}
        />
      )}
      <footer className="credit">
        <p>
          Pictograms by{" "}
          <a href="https://arasaac.org" target="_blank" rel="noreferrer">
            ARASAAC
          </a>{" "}
          (Government of Aragón, created by Sergio Palao), licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            CC BY-NC-SA
          </a>
          .
        </p>
      </footer>
    </main>
  );
}

export default App;

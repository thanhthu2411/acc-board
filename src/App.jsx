import { tiles } from "./data/tiles";
import {Tile} from "./components/Tile/Tile.jsx";
import { SentenceBar } from "./components/SentenceBar/SentenceBar.jsx";
import './App.css'
import {useState} from "react";

function App() {
    const [clickedWords, setClickedWords] = useState([]);
    
    const tileClickHandler = (tile) => {
        setClickedWords(prev => [...prev, tile.label])
    }
    
    return (
    <main className="app">
      <h1>AAC Board</h1>
      <SentenceBar words={clickedWords} />
      <div className="grid">
        {tiles.map((tile) => (
          <Tile onTileClick={tileClickHandler} key={tile.id} tile={tile} />
        ))}
      </div>
    </main>
  );
}

export default App

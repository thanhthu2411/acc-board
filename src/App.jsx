import { tiles } from "./data/tiles";
import {Tile} from "./components/Tile/Tile.jsx";
import { SentenceBar } from "./components/SentenceBar/SentenceBar.jsx";
import './App.css'

function App() {
    return (
    <main className="app">
      <h1>AAC Board</h1>
      <SentenceBar words={[]} />
      <div className="grid">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>
    </main>
  );
}

export default App

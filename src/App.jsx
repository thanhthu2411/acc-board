import {tiles, categories} from "./data/tiles";
import {Tile} from "./components/Tile/Tile.jsx";
import {CategoryTabs} from "./components/CategoryTabs/CategoryTabs.jsx";
import {SentenceBar} from "./components/SentenceBar/SentenceBar.jsx";
import './App.css'
import {Volume2} from "lucide-react"
import {useState} from "react";

function App() {
    const [clickedWords, setClickedWords] = useState([]);
    const [category, setCategory] = useState("Core")

    const tileClickHandler = (tile) => {
        setClickedWords(prev => [...prev, tile.label])
    }
    
    const emptySentenceHandler = () => {
        setClickedWords([])
    }
    
    const speak = () => {
        const sentence = clickedWords.join(" ")
        
        if (!sentence) return
        
        if (!("speechSynthesis" in window)) {
            alert("Sorry, this browser can't speak. Try Chrome.");
            return;
        }
        
        window.speechSynthesis.cancel()
        // an object holding my text
        const utterance = new SpeechSynthesisUtterance(sentence)
        window.speechSynthesis.speak(utterance)
        
    }
    
    const removeWord = (index) => {
        setClickedWords(prev => prev.filter((w, i) => i !== index))
    }
    
    return (
        <main className="app">
            <h1>AAC Board</h1>
            <div className="sentencebar-container">
                <SentenceBar words={clickedWords} onRemoveWord={removeWord}/>
                <button onClick={emptySentenceHandler}>Clear</button>
                <button className="speak-btn" onClick={speak}>Speak <Volume2/></button>
            </div>
            <CategoryTabs categories={categories} selectedCategory={category} onCategoryChange={setCategory}/>
            <div className="grid">
                {tiles.filter((tile) => tile.category === category).map((tile) => (
                    <Tile onTileClick={tileClickHandler}  key={tile.id} tile={tile}/>
                ))}
            </div>
        </main>
    );
}

export default App


import "./Tile.css"

export function Tile({tile, onTileClick}) {

    return (
        <button className="tile" onClick={() => onTileClick(tile)}>
            <span className="tile-emoji" aria-hidden="true">{tile.emoji}</span>
            <span className="tile-label">{tile.label}</span>
        </button>
    )
}

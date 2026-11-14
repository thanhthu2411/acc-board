
import "./Tile.css"

export function Tile({tile}) {

    return (
        <button className="tile">
            <span className="tile-emoji" aria-hidden="true">{tile.emoji}</span>
            <span className="tile-label">{tile.label}</span>
        </button>
    )
}

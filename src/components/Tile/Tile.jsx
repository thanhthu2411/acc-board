
import "./Tile.css"

export function Tile({tile, onTileClick, editMode}) {

    return (
        <button type="button" className={`tile ${editMode ? "editing" : ""}`} onClick={() => onTileClick(tile)}>
            {tile.image ? (
                <img className="tile-img" src={tile.image} alt="" />
            ) : (
                <span className="tile-emoji" aria-hidden="true">{tile.emoji}</span>
            )}
            <span className="tile-label">{tile.label}</span>
        </button>
    )
}

import "./CategoryTabs.css";
import {Tile} from "../Tile/Tile.jsx";

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }) {
  return (
    <nav>
      {categories.map((cate) => (
          <button
              key={cate}
              type="button"
              className={`category-btn ${cate === selectedCategory ? "selected" : ""}`}
              aria-pressed={cate === selectedCategory}
              onClick={() => onCategoryChange(cate)}
          >
            {cate}
          </button>
      ))}
    </nav>
  );
}

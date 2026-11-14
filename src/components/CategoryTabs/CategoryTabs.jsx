import "./CategoryTabs.css";

export function CategoryTabs({ categories, selectedCategory, onCategoryChange }) {
  return (
    <nav className="category-nav">
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

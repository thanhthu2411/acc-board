import "./AddTileDialog.css";

import { useEffect, useRef, useState } from "react";

export function AddTileDialog({ categories, defaultCategory, onAdd, onClose }) {
  const dialogRef = useRef(null);
  const [form, setForm] = useState({
    label: "",
    category: defaultCategory,
    emoji: "",
  });
  const [error, setError] = useState("");

  // Open as a modal as soon as this component appears
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "label") setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const label = form.label.trim();
    if (!label) {
      setError("Enter a word");
      return;
    }


    const emoji = form.emoji.trim();
    const firstLetter = [...label][0].toUpperCase();

    onAdd({
      id: crypto.randomUUID(),
      label,
      category: form.category,
      emoji: emoji || firstLetter,
      image: null,
    });
    dialogRef.current.close(); // triggers onClose below
  };

  return (
    <dialog ref={dialogRef} onClose={onClose} className="dialog">
      <form onSubmit={handleSubmit}>
        <h2>Add a tile</h2>

        <label htmlFor="label">Word or phrase</label>
        <input
          id="label"
          name="label"
          value={form.label}
          onChange={handleChange}
          maxLength={40}
        />
        <p className="hint">This is what the board will say.</p>
        {error && <p role="alert" className="field-error">{error}</p>}

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor="emoji">Emoji (optional)</label>
        <input id="emoji" name="emoji" value={form.emoji} onChange={handleChange} />

        <div className="dialog-buttons">
          <button type="button" onClick={() => dialogRef.current.close()}>
            Cancel
          </button>
          <button type="submit">Add tile</button>
        </div>
      </form>
    </dialog>
  );
}

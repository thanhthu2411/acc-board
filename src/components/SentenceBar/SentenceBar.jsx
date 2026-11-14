import "./SentenceBar.css";
import { X } from "lucide-react";

export function SentenceBar({ words }) {
  return (
    <div className="sentence-bar" aria-label="Sentence" aria-live="polite">
      {words.length > 0 ? (
        <ul className="sentence-words">
          {words.map((w, i) => (
            <li className="sentence-chip" key={i}>
              {w}
              <button
                type="button"
                className="chip-remove"
                aria-label={`Remove ${w}`}
              >
                <X />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="sentence-hint">Tap tiles to build a sentence</p>
      )}
    </div>
  );
}

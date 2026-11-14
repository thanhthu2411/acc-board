import { writeFile } from "node:fs/promises";
import { words } from "../data/words.js";

const result = {};

for (const w of words) {
    const term = w.search ?? w.label;
    try {
        const res = await fetch(
            `https://api.arasaac.org/v1/pictograms/en/search/${encodeURIComponent(term)}`
        );
        const data = res.ok ? await res.json() : [];
        if (data.length > 0) {
            result[w.id] = data[0]._id;
            console.log(`${w.label} -> ${data[0]._id}`);
        } else {
            console.log(`${w.label} -> NO MATCH`);
        }
    } catch (err) {
        console.log(`${w.label} -> ERROR`);
    }
    await new Promise((r) => setTimeout(r, 300)); // be gentle with their server
}

await writeFile("src/data/pictograms.json", JSON.stringify(result, null, 2));
console.log("Saved src/data/pictograms.json");
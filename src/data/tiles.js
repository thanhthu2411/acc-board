import { words } from "./words";
import pictograms from "./pictograms.json";

export const categories = ["Core", "Needs", "Feelings", "Doctor"];

export const tiles = words.map((w) => {
  const pid = pictograms[w.id];
  return {
    ...w,
    image: pid
        ? `https://static.arasaac.org/pictograms/${pid}/${pid}_300.png`
        : null,
  };
});
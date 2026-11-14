# AAC Board - Project Guide

## What this is
A free web AAC (communication) board. Users tap picture tiles to build a
sentence, and the browser speaks it. Built for a 24-hour hackathon
(iHack 2026, Innovating Yesterday). 

## Stack
React + Vite, Express, MongoDB, Web Speech API. Plain JavaScript, no TypeScript.

## Priorities
1. Core board: tiles, sentence bar, speak, categories
2. Edit mode and saving boards
3. Scanning mode, sharing, offline
Do not work on a lower priority until the one above works.

## Accessibility rules
- Tap targets at least 80px, high contrast, visible focus outlines
- Everything works with keyboard only
- Never rely on color alone; always show a text label

## How we work together
- I write the code. You explain, review, and suggest.
- Before writing code, explain your approach in 2 to 3 sentences.
- Give small pieces (one component or function), not whole rewrites.
- Explain anything I might not know, in simple words.
- Ask before adding a new dependency.
- Do not change files I didn't mention.
- Keep it simple. This is a hackathon, not production.

## Code style
Small components, clear names, short comments explaining why.
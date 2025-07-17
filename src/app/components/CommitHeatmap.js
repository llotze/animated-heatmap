'use client'
import { useEffect, useState, useRef } from 'react'

export default function CommitHeatmap() {
  const rows = 7;
  const cols = 10;

  // Custom random level generator: empty (0) is 75% less likely
  function getRandomLevel() {
    // 0 = empty, 2 = medium, 3 = dark, 4 = darkest, 5 = even darker
    // 0: 1/8 chance, 2-5: 7/8 chance distributed
    const r = Math.random();
    if (r < 0.075) return 0;
    // Randomly pick 2, 3, 4, or 5
    return 2 + Math.floor(Math.random() * 4);
  }

  // Persist random levels for each cell across renders
  const levelsRef = useRef(
    Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => getRandomLevel())
    )
  );
  const levels = levelsRef.current;

  // Build fill order: leftmost column, top to bottom, then next column, etc.
  const fillOrder = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      fillOrder.push({ row, col });
    }
  }

  const [filledCells, setFilledCells] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;
    setFilledCells(0);
    let i = 0;
    const interval = setInterval(() => {
      setFilledCells(i + 1);
      i++;
      if (i >= fillOrder.length) {
        clearInterval(interval);
        setTimeout(() => setIsAnimating(false), 800);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Helper to get the color for each level (GitHub heatmap colors + extra dark)
  const getColor = (level) => {
    switch (level) {
      case 2: return 'bg-[#40c463]'; // medium green
      case 3: return 'bg-[#30a14e]'; // dark green
      case 4: return 'bg-[#216e39]'; // darkest green
      case 5: return 'bg-[#14351b]'; // extra dark green
      default: return 'bg-zinc-200 dark:bg-zinc-800'; // empty
    }
  };

  // Build a 2D array for rendering
  const grid = Array.from({ length: cols }, (_, col) =>
    Array.from({ length: rows }, (_, row) => ({ row, col }))
  );

  return (
    <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-md">
      <button
        className="mb-8 px-4 py-2 rounded bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-colors"
        onClick={() => setIsAnimating(true)}
        disabled={isAnimating}
      >
        {isAnimating ? "Animating..." : "Start Animation"}
      </button>
      <div className="flex justify-center">
        <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {grid.map((colArr, colIdx) =>
            colArr.map(cell => {
              // Find the index in fillOrder for this cell
              const fillIdx = fillOrder.findIndex(
                ({ row, col }) => row === cell.row && col === cell.col
              );
              // Only show color if cell is filled
              const level = fillIdx > -1 && fillIdx < filledCells ? levels[cell.col][cell.row] : 0;
              return (
                <div
                  key={`${cell.row},${cell.col}`}
                  className={`w-3 h-3 rounded-xs transition-all duration-100 ${getColor(level)}`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
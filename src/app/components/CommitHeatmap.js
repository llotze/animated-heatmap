'use client'
import { useEffect, useState } from 'react'

export default function CommitHeatmap() {
  // Grid size (GitHub heatmap is usually 7 rows x 18 columns)
  const rows = 7;
  const cols = 10;

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
  }, [isAnimating, fillOrder.length]);

  // Build a 2D array for rendering
  const grid = Array.from({ length: cols }, (_, col) =>
    Array.from({ length: rows }, (_, row) => ({ row, col }))
  );

  // For fast lookup, which cells should be filled
  const filledSet = new Set(
    fillOrder.slice(0, filledCells).map(({ row, col }) => `${row},${col}`)
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
            colArr.map(cell => (
              <div
                key={`${cell.row},${cell.col}`}
                className={`w-3 h-3 rounded-xs transition-all duration-100 ${
                  filledSet.has(`${cell.row},${cell.col}`)
                    ? 'bg-[#39d353]'
                    : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
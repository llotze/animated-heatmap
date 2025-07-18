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

  // Helper to get the color for each level (GitHub heatmap colors for light/dark mode)
  const getColor = (level) => {
    switch (level) {
      case 2: return 'bg-[#9be9a8] dark:bg-[#0e4429] border border-[#95e5a3] dark:border-[#0c3f26]'; // light green - very subtle border
      case 3: return 'bg-[#40c463] dark:bg-[#006d32] border border-[#3cbf5e] dark:border-[#00652f]'; // medium green - very subtle border
      case 4: return 'bg-[#30a14e] dark:bg-[#26a641] border border-[#2e9e4b] dark:border-[#24a03f]'; // dark green - very subtle border
      case 5: return 'bg-[#216e39] dark:bg-[#39d353] border border-[#206a37] dark:border-[#37ce50]'; // darkest green - very subtle border
      default: return 'bg-[#ebedf0] dark:bg-[#161b22] border border-[#e8eaed] dark:border-[#14191f]'; // empty - very subtle border
    }
  };

  // Build a 2D array for rendering
  const grid = Array.from({ length: cols }, (_, col) =>
    Array.from({ length: rows }, (_, row) => ({ row, col }))
  );

  return (
    <div className="text-center p-4 rounded-md transform scale-150 border border-[#d5dce3] dark:border-[#30363d]">
      <button
        className="mb-8 px-4 py-2 rounded bg-gray-50 dark:bg-[#21262d] text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-[#30363d] transition-colors border border-[#d5dce3] dark:border-[#30363d]"
        onClick={() => setIsAnimating(true)}
        disabled={isAnimating}
      >
        {isAnimating ? "Animating..." : "Start Animation"}
      </button>
      <div className="flex justify-center">
        <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {grid.map((colArr, colIdx) =>
            colArr.map(cell => {
              const fillIdx = fillOrder.findIndex(
                ({ row, col }) => row === cell.row && col === cell.col
              );
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
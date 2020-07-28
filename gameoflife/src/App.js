import React, { useState } from "react";
import "./App.css";

const numRows = 50;
const numCols = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0)); //reduce all the value of iteration to zeros with Array.from([1,2,3], x => x + x) // [2, 4, 6]
    }

    return rows;
  });

  // console.log(grid)

  return (
    <>
      <div className="App">
        <h1>Game of Life</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}>
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i},${j}`}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][j] ? "skyblue" : undefined,
                  border: "solid 1px black"
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;

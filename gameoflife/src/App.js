import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

const numRows = 50; // number of rows
const numCols = 50; // number of columns


const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const makeEmptyGrid = () => { // make a sample or empty grid
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0)); //reduce all the value of iteration to zeros with Array.from([1,2,3], x => x + x) // [2, 4, 6]
  }

  return rows;
};

// game of life's component starts here
function App() {
  const [grid, setGrid] = useState(() => { //set a state called grid
    return makeEmptyGrid();
  });
  // console.log(grid)

  const [running, setRunning] = useState(false); // set a state called running

  const runningRef = useRef(running); // 
  runningRef.current = running;

  const runGeneration = useCallback(() => { // useCallback prevents multiple calls or returns of the callback function
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0; // cell dies
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1; // cell lives
            }
          }
        }
      });
    });

    setTimeout(runGeneration, 100); //
  }, []);

  return (
    <>
      <div className="App">
        <h1>Conway's Game of Life</h1>
        <div>
          {/* start / stop button is here */}
          <button 
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runGeneration();
              }
            }}
            style={{ width: "70px", marginBottom: "20px" }}
          >
            {running ? "stop" : "start"}
          </button>
          {/* random generation button is here */}
          <button 
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            random
          </button>
          
          {/* clear grid button is here */}
          <button 
            onClick={() => {
              setGrid(makeEmptyGrid());
            }}
          >
            clear
          </button>
        </div>
        {/* all buttons end here */}
        {/* grid display starts */}
        <div 
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
            margin: "0px auto",
          }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i},${j}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: grid[i][j] ? "grey" : undefined,
                  border: "solid 1px black",
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

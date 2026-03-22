import { useState, useEffect } from "react";
import { createStage } from "../gamehelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    let spawnTimeout;

    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(
            new Array(newStage[0].length).fill(0).map(() => [0, "clear"]),
          );
          return ack;
        }

        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      // Flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell)),
      );

      //Draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            if (
              newStage[y + player.pos.y] &&
              newStage[y + player.pos.y][x + player.pos.x]
            ) {
              newStage[y + player.pos.y][x + player.pos.x] = [
                value,
                player.collided ? "merged" : "clear",
              ];
            }
          }
        });
      });

      if (player.collided) {
        return sweepRows(newStage);
      }
      return newStage;
    };

    setStage((prev) => updateStage(prev));

    if (player.collided) {
      spawnTimeout = setTimeout(() => {
        resetPlayer();
      }, 100);
    }

    return () => {
      clearTimeout(spawnTimeout);
    };
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};

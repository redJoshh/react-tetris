import React from "react";

import { createStage } from "../gamehelpers";
import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledTetris } from "./styles/StyledTetris";
//components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <div>
          <Stage stage={createStage()} />
          <aside>
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
            <StartButton />
          </aside>
        </div>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

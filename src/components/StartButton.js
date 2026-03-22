import React from "react";
import { StyledStartButton } from "./styles/StyledStartButton";
const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback} onFocus={(e) => e.target.blur()}>
    Start Game
  </StyledStartButton>
);

export default StartButton;

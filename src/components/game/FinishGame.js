import React, { useEffect } from "react";
import { GameScore } from "./GameScore";

export const FinishGame = ({
  cards,
  finishedGame,
  myCompletedCards,
  oppCompletedCards,
}) => {
  return (
    <>
      <section>
        <div>Game Over!</div>
        <div>My Score: {myCompletedCards.length}</div>
        <div>Opponent Score: {oppCompletedCards.length} </div>
      </section>
    </>
  );
};

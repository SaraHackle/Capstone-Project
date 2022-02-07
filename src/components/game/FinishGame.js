import React from "react";


export const FinishGame = ({
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

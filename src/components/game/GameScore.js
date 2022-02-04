import React from "react";

export const GameScore = ({ myCompletedCards, oppCompletedCards }) => {
  return (
    <section>
      <div>My Score: {myCompletedCards.length}</div>
      <div>Opponent Score: {oppCompletedCards.length} </div>
    </section>
  );
};

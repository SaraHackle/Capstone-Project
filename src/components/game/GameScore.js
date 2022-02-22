import React from "react";

export const GameScore = ({ myCompletedCards, oppCompletedCards }) => {
  return (
    <section className="scoreCounter">
      <div className="scoreCounter">My Score: {myCompletedCards.length}</div>
      <div className="scoreCounter">
        Opponent Score: {oppCompletedCards.length}{" "}
      </div>
    </section>
  );
};

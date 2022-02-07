import React from "react";

export const OppActiveCard = ({ oppActiveCard, finishCard, completedCard }) => {
  if (oppActiveCard) {
    return (
      <section>
        <div> {oppActiveCard?.card?.title}</div>
        <div>
          <button
            className="btn btn-completeCard"
            onClick={() => {
              completedCard(oppActiveCard.id, oppActiveCard.game.id);
            }}
          >
            Complete Task
          </button>
        </div>
        <div>
          <button
            className="btn btn-skipCard"
            onClick={() => {
              finishCard(oppActiveCard.id, oppActiveCard.game.id);
            }}
          >
            Decline Task
          </button>
        </div>
      </section>
    );
  } else if (!oppActiveCard) {
    return <div> Waiting for Opponent to play a card... </div>;
  }
};

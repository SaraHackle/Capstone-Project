import React from "react";

export const ActiveCard = ({
  myActiveCard,
  oppActiveCard,
  finishCard,
  completedCard,
}) => {
  return (
    <section>
      <section
        key={`myActiveCard--1`}
        className="myActiveCard myActiveCard-item"
      >
        {myActiveCard.map((mac) => {
          return (
            <div key={`myActiveCard--${mac.card.id}`}>{mac.card.title}</div>
          );
        })}
      </section>
      <section
        key={`oppActiveCard--2`}
        className="oppActiveCard oppActiveCard-item"
      >
        {oppActiveCard.map((oac) => {
          return (
            <>
              <div key={`oppActiveCard--${oac.card.id}`}>
                {oac?.card?.title}

                <button
                  key={`completeButton--${oac.card.id}`}
                  className="btn btn-completeCard"
                  onClick={() => {
                    completedCard(oac.id, oac.game.id);
                  }}
                >
                  Complete Task
                </button>

                <button
                  key={`skipButton--${oac.card.id}`}
                  className="btn btn-skipCard"
                  onClick={() => {
                    finishCard(oac.id, oac.game.id);
                  }}
                >
                  Decline Task
                </button>
              </div>
            </>
          );
        })}
      </section>
    </section>
  );
};

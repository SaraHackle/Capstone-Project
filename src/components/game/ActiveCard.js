import React from "react";

export const ActiveCard = ({
  myActiveCard,
  oppActiveCard,
  finishCard,
  completedCard,
}) => {
  return (
    <>
      <section>
        {myActiveCard.map((mac) => {
          return <div key={mac.id}>{mac.card.title}</div>;
        })}
      </section>
      <section>
        {oppActiveCard.map((oac) => {
          return (
            <>
              <div key={oac.id}>{oac?.card?.title}</div>
              <div>
                <button
                  className="btn btn-completeCard"
                  onClick={() => {
                    completedCard(oac.id);
                  }}
                >
                  Complete Task
                </button>
              </div>
              <div>
                <button
                  className="btn btn-skipCard"
                  onClick={() => {
                    finishCard(oac.id);
                  }}
                >
                  Decline Task
                </button>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};

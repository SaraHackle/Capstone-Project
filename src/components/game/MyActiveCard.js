import React from "react";

export const MyActiveCard = ({ myActiveCard, isMyFinalCard }) => {
  if (myActiveCard) {
    return (
      <section>
        <div> {`${myActiveCard?.card?.title}`}</div>
      </section>
    );
  } else if (!myActiveCard && isMyFinalCard === false) {
    return <div> Play your next card </div>;
  } else if (!myActiveCard && isMyFinalCard === true) {
    return <div> You've played all of your cards! </div>;
  }
};

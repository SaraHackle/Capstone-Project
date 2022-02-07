import React from "react";

export const MyActiveCard = ({ myActiveCard }) => {
  if (myActiveCard) {
    return (
      <section>
        <div> {`${myActiveCard?.card?.title}`}</div>
      </section>
    );
  } else if (!myActiveCard) {
    return <div> Play your next card </div>;
  }
};

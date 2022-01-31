import React from "react";
import { useEffect, useState } from "react";

export const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/cards`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  return (
    <>
      <div>
        {cards.map((cardObject) => {
          return (
            <div key={cardObject.id}>
              <h2>{cardObject.title}</h2> <br></br>
              {cardObject.description}
            </div>
          );
        })}
      </div>
    </>
  );
};

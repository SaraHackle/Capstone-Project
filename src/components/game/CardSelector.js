import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CardSelector = ({ availableCards, playCard }) => {
  const [cardToUpdate, updateCardToUpdate] = useState({});

  const updateCard = (event) => {
    event.preventDefault();
    playCard(cardToUpdate);
  };

  return (
    <section>
      <fieldset>
        {availableCards.map((card) => {
          return (
            <li key={card.id}>
              <h1>{card.card.title}</h1>
              <p>{card.card.description}</p>
              <input
                onChange={(event) => {
                  const copy = { ...card };
                  copy.isActive = event.target.checked;
                  updateCardToUpdate(copy);
                }}
                type="radio"
                value={card.id}
                name="card"
              ></input>
            </li>
          );
        })}
      </fieldset>
      <fieldset>
        <button className="btn btn-playCard" onClick={updateCard}>
          Play Card
        </button>
      </fieldset>
    </section>
  );
};

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CardSelector = () => {
  const [cards, setCards] = useState([]);
  const [cardToUpdate, updateCardToUpdate] = useState({});
  const [activeCard, selectActiveCard] =useState(0)
  const { gameId } = useParams();
  const userId = parseInt(localStorage.getItem("betcha_user"));

  useEffect(() => {
    fetch(
      `http://localhost:8088/gameCards?gameId=${gameId}&_expand=card&_expand=game`
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, [activeCard]);

  const updateCard = (event) => {
    event.preventDefault();
    const activeCard = {
      isActive: cardToUpdate.isActive,
    };

    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activeCard),
    };

    return fetch(
      `http://localhost:8088/gameCards/${cardToUpdate.id}`,
      fetchOption
    ).then(() => {
        selectActiveCard(activeCard)
    });
  };

  return (
    <section>
      <fieldset>
        {cards.map((card) => {
          if (card.game.hostId === userId && card.isHostCard === true && card.isActive === false) {
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
          } else {
            if (card.game.visitorId === userId && card.isHostCard === false && card.isActive === false) {
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
            }
          }
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

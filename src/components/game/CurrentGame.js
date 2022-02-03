import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardSelector } from "./CardSelector";

export const CurrentGame = () => {
  const [cards, setCards] = useState([]);
  const [cardToUpdate, updateCardToUpdate] = useState({});
  const [reload, setReload] = useState(0);
  const [isUserHost, setIsUserHost] = useState();
  const [availableCards, updateAvailableCards] = useState([]);
  const [myActiveCard, setMyActiveCard] = useState([]);
  const [oppActiveCard, setOppActiveCard] = useState([]);
  const { gameId } = useParams();
  const userId = parseInt(localStorage.getItem("betcha_user"));

  useEffect(() => {
    fetch(
      `http://localhost:8088/gameCards?gameId=${gameId}&_expand=card&_expand=game`
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        let gameHostId = data[0].game.hostId;
        let isUserHost = userId === gameHostId ? true : false;
        setIsUserHost(isUserHost);
        let myCards = data.filter((c) => c.isHostCard === isUserHost);
        let myAvailableCards = myCards.filter(
          (mc) => mc.isActive === false && mc.isPlayed === false
        );
        updateAvailableCards(myAvailableCards);
        let oppCards = data.filter((c) => c.isHostCard !== isUserHost);
        let tMyActiveCard = myCards.filter((mc) => mc.isActive === true);
        setMyActiveCard(tMyActiveCard);
        let tOppActiveCard = oppCards.filter((oc) => oc.isActive === true);
        setOppActiveCard(tOppActiveCard);
      });
  }, [reload]);

  const finishCard = (card, isCompleted) => {
    const playedCard = {
      isCompleted: card.isCompleted,
      isPlayed: true,
    };

    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playedCard),
    };

    return fetch(
      `http://localhost:8088/gameCards/${card.id}`,
      fetchOption
    ).then(() => {
      setReload(reload + 1);
    });
  };

  const playCard = (card) => {
    const activeCard = {
      isActive: card.isActive,
    };

    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activeCard),
    };

    return fetch(
      `http://localhost:8088/gameCards/${card.id}`,
      fetchOption
    ).then(() => {
      setReload(reload + 1);
    });
  };

  const updateCard = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {" "}
      <section>
        <h2>Current Game:</h2>
        <p>Am I the host? {`${isUserHost}`}</p>
        <CardSelector availableCards={availableCards} playCard={playCard} />
      </section>
    </>
  );
};

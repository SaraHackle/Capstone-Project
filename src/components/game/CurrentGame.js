import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardSelector } from "./CardSelector";
import { ActiveCard } from "./ActiveCard";
import { GameScore } from "./GameScore";
import { FinishGame } from "./FinishGame";

export const CurrentGame = () => {
  const [cards, setCards] = useState([]);
  const [cardToUpdate, updateCardToUpdate] = useState({});
  const [reload, setReload] = useState(0);
  const [isUserHost, setIsUserHost] = useState();
  const [availableCards, updateAvailableCards] = useState([]);
  const [myActiveCard, setMyActiveCard] = useState([]);
  const [oppActiveCard, setOppActiveCard] = useState([]);
  const [myCompletedCards, updateMyCompletedCards] = useState([]);
  const [oppCompletedCards, updateOppCompletedCards] = useState([]);
  const [finishedGame, setFinishedGame] = useState(false);
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
        let tMyCompletedCards = oppCards.filter(
          (completedCards) => completedCards.isCompleted === true
        );
        updateMyCompletedCards(tMyCompletedCards);
        let tOppCompletedCards = myCards.filter(
          (completedCards) => completedCards.isCompleted === true
        );
        updateOppCompletedCards(tOppCompletedCards);
        let allPlayedCards = data.filter((c) => c.isPlayed === true);
        let isGameFinished = allPlayedCards.length === 14 ? true : false;
        setFinishedGame(isGameFinished);
      });
  }, [reload]);

  useEffect(() => {
    if (finishedGame === true) {
      return fetch(`http://localhost:8088/games/${gameId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameCompleted: true,
        }),
      });
    }
  }, [finishedGame]);

  const finishCard = (cardId) => {
    const skippedCard = {
      isPlayed: true,
      isActive: false,
    };

    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skippedCard),
    };

    return fetch(`http://localhost:8088/gameCards/${cardId}`, fetchOption).then(
      () => {
        setReload(reload + 1);
      }
    );
  };

  const completedCard = (cardId, gameId) => {
    const playedCard = {
      isCompleted: true,
      isPlayed: true,
      isActive: false,
    };
    const updateScore = {
      hostScore: myCompletedCards.length,
      visitorScore: oppCompletedCards.length,
    };

    const fetchOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playedCard),
    };

    return fetch(`http://localhost:8088/gameCards/${cardId}`, fetchOption)
      .then(() => {
        setReload(reload + 1);
      })
      .then(() => {
        return fetch(`http://localhost:8088/games/${gameId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateScore),
        });
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
    <fieldset>
      <section>
        <h2>Current Game:</h2>
        <p>Am I the host? {`${isUserHost}`}</p>
        {finishedGame ? (
          <FinishGame
            cards={cards}
            finishedGame={finishedGame}
            myCompletedCards={myCompletedCards}
            oppCompletedCards={oppCompletedCards}
          />
        ) : (
          <div>
            <GameScore
              myCompletedCards={myCompletedCards}
              oppCompletedCards={oppCompletedCards}
            />

            <ActiveCard
              myActiveCard={myActiveCard}
              oppActiveCard={oppActiveCard}
              completedCard={completedCard}
              finishCard={finishCard}
            />
            <CardSelector
              availableCards={availableCards}
              playCard={playCard}
              myActive={myActiveCard}
            />
          </div>
        )}
      </section>
    </fieldset>
  );
};

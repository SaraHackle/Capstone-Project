import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardSelector } from "./CardSelector";
import { OppActiveCard } from "./OppActiveCard";
import { GameScore } from "./GameScore";
import { FinishGame } from "./FinishGame";
import { MyActiveCard } from "./MyActiveCard";
import "./Game.css";

//this holds all state for active gameplay
export const CurrentGame = () => {
  const [cards, setCards] = useState([]);
  const [reload, setReload] = useState(0);
  const [isUserHost, setIsUserHost] = useState();
  const [availableCards, updateAvailableCards] = useState([]);
  const [myActiveCard, setMyActiveCard] = useState({});
  const [oppActiveCard, setOppActiveCard] = useState({});
  const [myCompletedCards, updateMyCompletedCards] = useState([]);
  const [oppCompletedCards, updateOppCompletedCards] = useState([]);
  const [finishedGame, setFinishedGame] = useState(false);
  const [isMyFinalCard, setIsMyFinalCard] = useState(false);
  const [isOppFinalCard, setIsOppFinalCard] = useState(false);
  const { gameId } = useParams();
  const userId = parseInt(localStorage.getItem("betcha_user"));

  //this gets all data needed for game play
  //fetches all gamecards that match the current game linked to using params
  //expands all card details on the cards
  //expands the game with the matching game Id and all relevant information
  //then it sets each state based on various conditions
  //
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
        let tMyActiveCard = myCards.find((mc) => mc.isActive === true);
        setMyActiveCard(tMyActiveCard);
        let tOppActiveCard = oppCards.find((oc) => oc.isActive === true);
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
        let myPlayedCards = myCards.filter((mc) => mc.isPlayed === true);
        let myFinalCard = myPlayedCards.length === 7 ? true : false;
        setIsMyFinalCard(myFinalCard);
        let oppPlayedCards = oppCards.filter((oc) => oc.isPlayed === true);
        let oppFinalCard = oppPlayedCards.length === 7 ? true : false;
        setIsOppFinalCard(oppFinalCard);
      });
  }, [reload]);

  //sets game completed to true when all cards are played
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

  //when card is completed or declined, patches to database to set card to played and active to false
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

  //when card is marked completed, database updates as completed card, played card, and active to false
  //then another patch to the database updates gamescore
  const completedCard = (cardId, gameId) => {
    const playedCard = {
      isCompleted: true,
      isPlayed: true,
      isActive: false,
    };

    let updateScore;
    if (isUserHost) {
      updateScore = {
        hostScore: myCompletedCards.length + 1,
      };
    } else {
      updateScore = {
        visitorScore: myCompletedCards.length + 1,
      };
    }

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
  //sets active card into game board when a card is selected
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

  //renders game until game is marked completed, and then renders game over.
  return (
    <section className="betchaWont">
      <div>
        {finishedGame ? (
          <FinishGame
            cards={cards}
            finishedGame={finishedGame}
            myCompletedCards={myCompletedCards}
            oppCompletedCards={oppCompletedCards}
          />
        ) : (
          <div className="gameWrapper">
            <div className="activeGameWrapper">
              <GameScore
                myCompletedCards={myCompletedCards}
                oppCompletedCards={oppCompletedCards}
              />
              <div className="activeCardGameplay">
                <MyActiveCard
                  myActiveCard={myActiveCard}
                  isMyFinalCard={isMyFinalCard}
                />

                <OppActiveCard
                  oppActiveCard={oppActiveCard}
                  completedCard={completedCard}
                  finishCard={finishCard}
                  isOppFinalCard={isOppFinalCard}
                />
              </div>
            </div>
            <div className="availableCardWraper">
              <CardSelector
                isMyFinalCard={isMyFinalCard}
                availableCards={availableCards}
                playCard={playCard}
                myActiveCard={myActiveCard}
                isMyFinalCard={isMyFinalCard}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

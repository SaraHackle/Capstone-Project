import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const NewGameForm = () => {
  const [users, setUsers] = useState([]);
  const [visitorId, updateVisitor] = useState({});
  const [cards, setCards] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const userId = parseInt(localStorage.getItem("betcha_user"));

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        let otherUsers = data.filter((ou) => ou.id !== userId);
        setAvailableUsers(otherUsers);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/cards`)
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  const saveGame = (event) => {
    event.preventDefault();
    let newGameId;

    const newGame = {
      hostId: parseInt(localStorage.getItem("betcha_user")),
      visitorId: visitorId,
      visitorAccepted: false,
      visitorScore: 0,
      hostScore: 0,
      gameCompleted: false,
    };

    //this creates a new game
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    };
    let gameId;
    return fetch("http://localhost:8088/games", fetchOption)
      .then((data) => data.json())
      .then(async (data) => {
        gameId = data.id;
        await Promise.all(
          cards.map((card) => {
            return fetch("http://localhost:8088/gameCards", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cardId: card.id,
                gameId: gameId,
                isPlayed: false,
                isCompleted: false,
                isActive: false,
                isHostCard: true,
              }),
            });
          })
        );
      })
      .then(async (data) => {
        await Promise.all(
          cards.map((card) => {
            return fetch("http://localhost:8088/gameCards", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cardId: card.id,
                gameId: gameId,
                isPlayed: false,
                isCompleted: false,
                isActive: false,
                isHostCard: false,
              }),
            });
          })
        );
      })
      .then(() => {
        history.push("/allgames");
      });
  };

  const handleUserInput = (event) => {
    updateVisitor(parseInt(event.target.value));
  };

  return (
    <form className="newGameForm">
      <h2 className="newGameForm_title">Create a New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="opponent"> Pick your Opponent</label>
          <select
            onChange={handleUserInput}
            defaultValue=""
            name="user"
            className="form-control"
          >
            <option value="0">Select your opponent</option>
            {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <button className="btn btn-game" onClick={saveGame}>
          Start Game
        </button>
      </fieldset>
    </form>
  );
};

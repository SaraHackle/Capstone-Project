import React, { useEffect, useState } from "react";

export const NewGameForm = () => {
  const [users, setUsers] = useState([]);
  const [visitorId, updateVisitor] = useState({});

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const saveGame = (event) => {
    event.preventDefault();

    const newGame = {
      hostId: parseInt(localStorage.getItem("betcha_user")),
      visitorId: visitorId,
      visitorAccepted: false,
      visitorScore: 0,
      hostScore: 0,
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    };

    return fetch("http://localhost:8088/games", fetchOption);
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
            {users.map((user) => (
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

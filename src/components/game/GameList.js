import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [deleted, updateDelete] = useState(0);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("betcha_user"));
    let games;
    let users;
    fetch("http://localhost:8088/games")
      .then((res) => res.json())
      .then((data) => {
        games = data;
        fetch(`http://localhost:8088/users?userId=${userId}`)
          .then((res) => res.json())
          .then((data) => {
            users = data;
            let g = games.map((gameObject) => ({
              ...gameObject,
              visitor: users.find((u) => u.id === gameObject.visitorId),
              host: users.find((u) => u.id === gameObject.hostId),
            }));
            setGames(g);
          });
      });
  }, [deleted]);

  const deleteGame = (id) => {
    fetch(`http://localhost:8088/games/${id}`, {
      method: "DELETE",
    }).then(() => {
      updateDelete(deleted + 1);
    });
  };

  return (
    <div>
      {games.map((gameObject) => {
        if (
          parseInt(localStorage.getItem("betcha_user")) === gameObject.hostId
        ) {
          return (
            <div key={gameObject.id}>
              <Link to={`/game/${gameObject.id}`}>
                <h2>Game{gameObject.id}</h2>
              </Link>
              Opponent: {gameObject.visitor.name} Score: {gameObject.hostScore}
            </div>
          );
        } else {
          return (
            <div key={gameObject.id}>
              <Link to={`/game/${gameObject.id}`}>
                <h2>Game{gameObject.id}</h2>
              </Link>
              Opponent: {gameObject.host.name} Score: {gameObject.visitorScore}
              <Link to={"/allgames"}>
                {" "}
                <button
                  className="btn--deleteGame"
                  onClick={() => {
                    deleteGame(gameObject.id);
                  }}
                >
                  Quit Game
                </button>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

import React from "react";
import { useEffect, useState } from "react";

export const GameList = () => {
  const [games, setGames] = useState([]);

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
            console.log(g);
          });
      });
  }, []);

  return (
    <div>
      {games.map((gameObject) => {
        return (
          <p key={gameObject.id}>
            Opponent: {gameObject.visitor.name} Score: {gameObject.hostScore}
          </p>
        );
      })}
    </div>
  );
};

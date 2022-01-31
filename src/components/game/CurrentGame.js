import React, { useState, useEffect } from "react";
import { GameList } from "./GameList";
import { useParams } from "react-router-dom";

export const CurrentGame = () => {
  const [games, setGames] = useState([]);
  const { gameId } = useParams();

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("betcha_user"));
    let users;
    fetch(`http://localhost:8088/gameCards/${gameId}?_expand=game&_expand=card`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        console.log(data);
      });
  }, []);

  return (
    <section>
      <div>
        <h2>{games?.card?.title}</h2>
        {games?.card?.description}
      </div>
    </section>
  );
};

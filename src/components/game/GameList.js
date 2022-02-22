import React from "react";
import "./Game.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [deleted, updateDelete] = useState(0);

  //this use effect returns promise object of all games that are not marked as completed
  //then sets the games state with that data
  //then it grabs the user information that matches the logged in user
  //then it creates a copy of the gameobject and added new properties that match the visitor and host ids
  useEffect(() => {
    const userId = parseInt(localStorage.getItem("betcha_user"));
    let games;
    let users;
    fetch("http://localhost:8088/games?gameCompleted=false")
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

  //this function deletes the game matching the correct game Id
  const deleteGame = (id) => {
    fetch(`http://localhost:8088/games/${id}`, {
      method: "DELETE",
    }).then(() => {
      updateDelete(deleted + 1);
    });
  };
  //this populates the html for the current game list based on logged in user
  return (
    <div className="gameList">
      {games.map((gameObject) => {
        if (
          parseInt(localStorage.getItem("betcha_user")) === gameObject.hostId
        ) {
          return (
            <div className="gameListItem" key={gameObject.id}>
              <Button
                sx={{ color: "#f7b9a1" }}
                component={Link}
                to={`/game/${gameObject.id}`}
              >
                <Typography
                  mb={1}
                  sx={{
                    color: "#34586e",
                    "&:hover": {
                      color: "white",
                    },
                    fontWeight: "bold",
                    fontSize: "xx-large",
                  }}
                >
                  {" "}
                  Enter Game {gameObject.id}{" "}
                  <DoubleArrowIcon mt={2} fontSize="medium" />
                </Typography>
              </Button>
              <Typography
                mb={2}
                sx={{
                  fontFamily: "Permanent Marker",
                }}
              >
                Opponent: {gameObject.visitor.name}
                <br />
                My Score: {gameObject.hostScore}{" "}
              </Typography>

              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    color: " #34586e",
                    backgroundColor: "white",
                  },
                  background: "#34586e",
                }}
                variant="contained"
                className="btn--deleteGame"
                onClick={() => {
                  deleteGame(gameObject.id);
                }}
              >
                Quit Game
              </Button>
            </div>
          );
        } else if (
          parseInt(localStorage.getItem("betcha_user")) === gameObject.visitorId
        ) {
          return (
            <div className="gameListItem " key={gameObject.id}>
              <Button
                sx={{ color: "#34586e" }}
                component={Link}
                to={`/game/${gameObject.id}`}
              >
                <Typography
                  mb={1}
                  sx={{
                    color: "#34586e",
                    "&:hover": {
                      color: "white",
                    },
                    fontWeight: "bold",
                    fontSize: "xx-large",
                  }}
                >
                  {" "}
                  Enter Game {gameObject.id}{" "}
                  <DoubleArrowIcon mt={2} fontSize="medium" />
                </Typography>
              </Button>

              <Typography
                mb={2}
                sx={{
                  fontFamily: "Permanent Marker",
                }}
              >
                Opponent: {gameObject.host.name} <br /> My Score:{" "}
                {gameObject.visitorScore}{" "}
              </Typography>
              <Button
                sx={{
                  color: "white",
                  "&:hover": {
                    color: " #34586e",
                    backgroundColor: "white",
                  },
                  background: "#34586e",
                }}
                variant="contained"
                className="btn--deleteGame"
                onClick={() => {
                  deleteGame(gameObject.id);
                }}
              >
                Quit Game
              </Button>
            </div>
          );
        } else {
          return "";
        }
      })}
    </div>
  );
};

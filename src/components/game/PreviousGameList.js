import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

export const PreviousGameList = () => {
  const [games, setGames] = useState([]);
  const [deleted, updateDelete] = useState(0);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("betcha_user"));
    let games;
    let users;
    fetch("http://localhost:8088/games?gameCompleted=true")
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
                  View Game {gameObject.id}{" "}
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
                Score: {gameObject.hostScore}{" "}
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
                Remove Game
              </Button>
            </div>
          );
        } else if (
          parseInt(localStorage.getItem("betcha_user")) === gameObject.visitorId
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
                  View Game {gameObject.id}{" "}
                  <DoubleArrowIcon mt={2} fontSize="medium" />
                </Typography>
              </Button>

              <Typography
                mb={2}
                sx={{
                  fontFamily: "Permanent Marker",
                }}
              >
                Opponent: {gameObject.host.name}
                <br />
                Score: {gameObject.visitorScore}{" "}
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
                Remove Game
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

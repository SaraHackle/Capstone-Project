import React from "react";
import "./Game.css";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const FinishGame = ({ myCompletedCards, oppCompletedCards }) => {
  return (
    <div className="gameOver">
      <div className="gameOverItem">
        <Typography fontFamily="Sofia" fontSize="xxx-large">
          Game Over!
        </Typography>
        <Typography fontFamily="Permanent Marker" fontSize="x-large">
          My Score: {myCompletedCards.length}
        </Typography>
        <Typography mb={2} fontFamily="Permanent Marker" fontSize="x-large">
          Opponent Score: {oppCompletedCards.length}
        </Typography>
        <div className="gameOverButtons">
          <Button
            sx={{
              color: "white",
              "&:hover": {
                color: " #34586e",
                backgroundColor: "white",
              },
              background: "#34586e",
            }}
            size="small"
            variant="contained"
            component={Link}
            to="/newgame"
          >
            Rematch?
          </Button>
          &nbsp;&nbsp;
          <Button
            sx={{
              color: "white",
              "&:hover": {
                color: " #34586e",
                backgroundColor: "white",
              },
              background: "#34586e",
            }}
            size="small"
            variant="contained"
            component={Link}
            to="/"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Home = () => {
  return (
    <Box
      className="homePageBox"
      margin={10}
      sx={{
        background: "#f7b9a1",
      }}
    >
      <Typography variant="h2" fontFamily="Permanent Marker">
        BetchaWont
      </Typography>
      <Typography variant="caption" fontStyle="Italic">
        The game of real life tasks
      </Typography>
      <br />
      <br />
      <Typography variant="h5" fontFamily="Sofia">
        Game Play Rules:
      </Typography>
      <Typography fontFamily="Permanent Marker">
        1. The game begins when you choose your opponent and start the game
      </Typography>
      <Typography fontFamily="Permanent Marker">
        2. You will be given a deck of cards and the power to demand various
        tasks to be completed by your opponent.
      </Typography>
      <Typography fontFamily="Permanent Marker">
        3. Select the card that you wish to be completed, play it, and wait for
        your tasks to come to life.
      </Typography>
      <Typography fontFamily="Permanent Marker">
        4. When your opponent's card appears on the game board, you have can
        choose to complete or decline the task.
      </Typography>
      <Typography fontFamily="Permanent Marker" color="#ed5b2d">
        BEWARE: declining a task will not award you a point
      </Typography>
      <Typography fontFamily="Permanent Marker">
        5. Complete more tasks than your opponent, enjoy your freshly cleaned
        home, and brag for days about how you've always known you do more around
        here!
      </Typography>
      <Button
        mt={5}
        sx={{
          maxWidth: 200,
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
        Start A Game Now!
      </Button>
    </Box>
  );
};

import React, { useState } from "react";
import "./Game.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const CardSelector = ({
  availableCards,
  playCard,
  myActiveCard,
  isMyFinalCard,
}) => {
  const [cardToUpdate, updateCardToUpdate] = useState({});

  const updateCard = (event) => {
    event.preventDefault();
    playCard(cardToUpdate);
  };

  return (
    <div>
      <div className=" availableCardRow">
        {availableCards.map((card) => {
          return (
            <Card
              variant="outlined"
              className="availableCard"
              sx={{ maxWidth: 100 }}
              key={card.id}
            >
              <CardContent>
                <Typography
                  color="#34586e"
                  align="center"
                  variant="h5"
                  fontWeight="bolder"
                >
                  {card.card.title}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  className="availableCardItem"
                  fontWeight="bolder"
                  variant="body2"
                >
                  {card.card.description}
                </Typography>
              </CardContent>
              {!isMyFinalCard && !myActiveCard ? (
                <CardActions>
                  <Typography
                    align="center"
                    variant="subtitle2"
                    className="radioButton"
                  >
                    {" "}
                    Select Card{" "}
                  </Typography>

                  <input
                    onChange={(event) => {
                      const copy = { ...card };
                      copy.isActive = event.target.checked;
                      updateCardToUpdate(copy);
                    }}
                    type="radio"
                    value={card.id}
                    name="card"
                    className="radioButton"
                    align="center"
                  ></input>
                </CardActions>
              ) : (
                ""
              )}
            </Card>
          );
        })}
      </div>
      <div>
        {!isMyFinalCard && !myActiveCard ? (
          <section className="playButton">
            <Button
              sx={{
                color: "white",
                "&:hover": {
                  color: " #34586e",
                  backgroundColor: "white",
                },
                background: "#34586e",
              }}
              className="btn btn-playCard"
              variant="contained"
              onClick={updateCard}
            >
              Play Card
            </Button>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

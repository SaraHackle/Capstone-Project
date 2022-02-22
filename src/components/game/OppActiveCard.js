import React from "react";
import "./Game.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const OppActiveCard = ({
  oppActiveCard,
  finishCard,
  completedCard,
  isOppFinalCard,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (card) => {
    setExpanded(!expanded);
  };

  if (oppActiveCard) {
    return (
      <Card
        variant="outlined"
        className="activeCard"
        sx={{ maxWidth: 200 }}
        key={oppActiveCard.id}
      >
        <CardContent>
          <Typography
            className="activeCardItem"
            align="center"
            variant="h4"
            fontWeight="bolder"
          >
            {" "}
            {`${oppActiveCard?.card?.title}`}
          </Typography>
          <Typography className="expandItem" align="right" variant="caption">
            *Expand to see your task
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} mt={1} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              className="activeCardItem"
              fontWeight="bolder"
              variant="body2"
            >
              {oppActiveCard?.card?.description}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions>
          <Button
            sx={{
              color: "#34586e",
              "&:hover": {
                color: "white",
              },
              fontWeight: "bold",
              fontSize: "small",
            }}
            size="small"
            className="btn btn-completeCard"
            onClick={() => {
              completedCard(oppActiveCard.id, oppActiveCard.game.id);
            }}
          >
            Complete Task
          </Button>
          <Button
            sx={{
              color: "#34586e",
              "&:hover": {
                color: "white",
              },
              fontWeight: "bold",
              fontSize: "small",
            }}
            size="small"
            className="btn btn-skipCard"
            onClick={() => {
              finishCard(oppActiveCard.id, oppActiveCard.game.id);
            }}
          >
            Decline Task
          </Button>
        </CardActions>
      </Card>
    );
  } else if (!oppActiveCard && isOppFinalCard === false) {
    return (
      <div className="waitingCard">
        {" "}
        Waiting for Opponent to play a card...{" "}
      </div>
    );
  } else if (!oppActiveCard && isOppFinalCard === true) {
    return <div className="waitingCard"> Opponent has played all cards </div>;
  }
};

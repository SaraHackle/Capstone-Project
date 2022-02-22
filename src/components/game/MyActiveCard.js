import React from "react";
import "./Game.css";
import { styled } from "@mui/material/styles";
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

export const MyActiveCard = ({ myActiveCard, isMyFinalCard }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = (card) => {
    setExpanded(!expanded);
  };
  if (myActiveCard) {
    return (
      <Card
        variant="outlined"
        className="activeCard"
        sx={{ minHeight: 250 }}
        key={myActiveCard.id}
      >
        <CardContent>
          <Typography
            className="activeCardItem"
            align="center"
            variant="h4"
            fontWeight="bolder"
          >
            {" "}
            {`${myActiveCard?.card?.title}`}
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography
              className="activeCardItem"
              mb={10}
              fontWeight="bolder"
              variant="body2"
            >
              {myActiveCard?.card?.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  } else if (!myActiveCard && isMyFinalCard === false) {
    return <div className="waitingCard"> Play your next card... </div>;
  } else if (!myActiveCard && isMyFinalCard === true) {
    return (
      <div className="waitingCard"> You've played all of your cards! </div>
    );
  }
};

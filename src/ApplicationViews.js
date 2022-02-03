import React from "react";
import { Route } from "react-router-dom";
import { CardList } from "./components/cards/CardList";
import { GameList } from "./components/game/GameList";
import { NewGameForm } from "./components/game/NewGameForm";
import { CurrentGame } from "./components/game/CurrentGame";
import { CardSelector } from "./components/game/CardSelector";

export const ApplicationViews = () => {
  return (
    <>
      <Route path="/allgames">
        <h3> Current Games: </h3>
        <GameList />
      </Route>
      <Route path="/newgame">
        <NewGameForm />
      </Route>
      <Route path="/cardList">
        <CardList />
      </Route>
      <Route exact path="/game/:gameId(\d+)">
        <CurrentGame />
      </Route>
    </>
  );
};

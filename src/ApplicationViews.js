import React from "react";
import { Route } from "react-router-dom";
import { CardList } from "./components/cards/CardList";
import { GameList } from "./components/game/GameList";
import { NewGameForm } from "./components/game/NewGameForm";
import { CurrentGame } from "./components/game/CurrentGame";
import { Home } from "./components/home/Home";
import { PreviousGameList } from "./components/game/PreviousGameList";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/allgames">
        <GameList />
      </Route>
      <Route exact path="/previousgames">
        <PreviousGameList />
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

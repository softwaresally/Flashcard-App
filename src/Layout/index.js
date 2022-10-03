import React from "react";
import { Route, Switch } from "react-router-dom";
import EditCard from "../Cards/EditCard";
import CreateDeck from "../Decks/NewDeck";
import EditDeck from "../Decks/EditDeck";
import Header from "./Header";
import Home from "./Home";
import DeckView from "../Decks/DeckView";
import NotFound from "./NotFound";
import Study from "./Study";
import AddCard from "../Cards/AddCard";
import DeckStudy from "../Decks/DeckStudy";



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <DeckStudy />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>

          <NotFound />

        </Switch>
      </div>
    </>
  );
}

export default Layout;

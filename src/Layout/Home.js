import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/index";

import DeckList from "../Decks/DeckList";

function Home() {
  const [decks, setDecks] = useState([]);
  
  useEffect(() => {
    async function getDeck() {
      const getDeckFromAPI = await listDecks();
      setDecks(getDeckFromAPI);
    }
    getDeck();
  }, []);

  return (
    <div>
      <div className="row mx-auto">
        <Link to="/decks/new" className="btn btn-secondary w-25 mb-3">
          + Create Deck
        </Link>
      </div>
      <div className="row w-100 mx-auto">
        {decks.map((deck) => (
          <DeckList key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}

export default Home;
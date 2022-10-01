import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck, deleteDeck } from "../utils/api";

function DeckView() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({cards: []});
    const { id, name, description, cards } = deck;
    const history = useHistory();

    // get a deck from the API
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const deckFromApi = await readDeck(deckId, abortController.signal);
            setDeck(deckFromApi);
        }
        getDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    // delete deck handler
    const handleDeckDelete = async (id) => {
        const deleteOnClick = window.confirm(
            "Are you sure you want to delete this deck? You will not be able to recover it."
        )
        if (deleteOnClick) {
            await deleteDeck(id);
            history.go(0);
        } else {
            history.go(0);
        }
    };

 
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">
                        {name}
                    </li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h4>{name}</h4>
                        <p className="card-text">
                            {description}
                        </p>
                        <Link to={`${deckId}/edit`} className="btn btn-secondary">
                            Edit
                        </Link>
                        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
                            Study
                        </Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                            + Add Cards
                        </Link>
                        <button onClick={handleDeckDelete} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h3>Cards</h3>
                    <CardList cards={cards} />
            </div>
        </div>
    );
}

export default DeckView;
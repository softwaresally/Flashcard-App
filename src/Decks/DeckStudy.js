import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Study from "../Layout/Study";
import { readDeck } from "../utils/api";

function DeckStudy() {
    const [deck, setDeck] = useState("");
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
        }
        getDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    if (deck) {
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                Home
                            </Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item active">
                            Study
                        </li>
                    </ol>
                </nav>

                <h1>{deck.name}: Study</h1>

                <Study deck={deck} />
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        );
    }
}

export default DeckStudy;
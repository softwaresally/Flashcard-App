import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
    const [deck, setDeck] = useState({cards: [0]});
    const history = useHistory();
    const { deckId } = useParams();
    const [count, setCount] = useState(0);
    const { cards } = deck;
    const [cardFront, setCardFront] = useState(true);


    //get deck from API
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

    // flip button handler card is currently displaying the front
    const handleFlip = () => {
        if (cardFront) {
            setCardFront(false);
        } else {
            setCardFront(true)
        }
    };

    // next button handler
    const nextButton = () => {
        if (cards.length === count + 1) {
            window.confirm(
                "Restart cards? Click 'cancel' to return to the home page."
            ) ? setCount(0) : history.push("/");
        } else {
            setCount((count) => count + 1);
            setCardFront(true);
        }
    };


    if (cards.length > 2) {
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

                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{deck.name}: Study</h3>

                            <h5>Cards {count + 1} of {cards.length}</h5>
                            
                            <div className="card-text">
                                <p>{cardFront ? cards[count].front : cards[count].back}</p>
                                
                                <button className="btn btn-secondary" onClick={handleFlip}>
                                    Flip
                                </button>

                                {!cardFront ? <button className="btn btn-primary" onClick={nextButton}>
                                    Next
                                </button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
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

                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{deck.name}: Study</h3>

                            <h5>Not enough cards.</h5>
                            
                            <div className="card-text">
                                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>

                                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                                    + Add Cards
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({deck}) {
    // const [deck, setDeck] = useState({cards: [0]});
    const history = useHistory();
    const { deckId } = useParams();
    const [count, setCount] = useState(0);
    // const { cards } = deck;
    const [cardFront, setCardFront] = useState(true);
    const [currentCard, setCurrentCard] = useState(deck.cards[0]);
    const cardList = deck.cards;

    useEffect(() => {
        const abortController = new AbortController();
        setCurrentCard(cardList[count]);

        return () => {
            abortController.abort();
        }
    }, [cardList, count]);

    //get deck from API
    // useEffect(() => {
    //     const abortController = new AbortController();
    //     async function getDeck() {
    //         const response = await readDeck(deckId, abortController.signal);
    //         setDeck(response);
    //     }
    //     getDeck();
    //     return () => {
    //         abortController.abort();
    //     }
    // }, [deckId]);

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
        if (cardList.length === count + 1) {
            window.confirm(
                "Restart cards? Click 'cancel' to return to the home page."
            ) ? setCount(0) : history.push("/");
        } else {
            setCount((count) => count + 1);
            setCardFront(true);
        }
    };


    if (cardList.length > 2) {
        return (
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h5>Card {count + 1} of {cardList.length}</h5>
                            
                            <div className="card-text">
                                <p>{cardFront ? cardList[count].front : cardList[count].back}</p>
                                
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
        )
    } else {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h3>{deck.name}: Study</h3>

                            <h5>Not enough cards.</h5>
                            
                            <div className="card-text">
                                <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>

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
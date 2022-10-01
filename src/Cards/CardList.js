import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";

function CardList({cards}) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const history = useHistory();
    
    // get cards from deck with api call
    useEffect(() => {
        const abortController = new AbortController();
        async function getCards() {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
        }
        getCards();
        return () => {
            abortController.abort()
        }
    }, [deckId]);

    //delete card button handler
    // const handleCardDelete = async () => {
    //     const deleteHandler = window.confirm(
    //         "Delete this card? You will not be able to recover it."
    //     )
    //     if (deleteHandler) {
    //         await deleteCard(id);
    //         history.go(0);
    //     } else {
    //         history.go(0);
    //     }
    // };

    return (
        <div>
            {cards.map((card, id) => (
                <div className="card" key={id}>
                    <div className="card-body">
                        <p>{card.front}</p>
                        <p>{card.back}</p>

                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary">
                            Edit
                        </Link>

                        <button onClick={async () => {
                            if (window.confirm(
                                "Delete this card? You will not be able to recover it."
                            )) {
                                await deleteCard(card.id);
                                history.go(0);
                            } else {
                                history.go(0);
                            }
                        }} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardList;
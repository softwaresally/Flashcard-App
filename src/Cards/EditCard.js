import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
    const [card, setCard] = useState({ front: "", back: "", deckId: "", id: "" });
    const history = useHistory();

    // get card from API
    useEffect(() => {
        const abortController = new AbortController();
        async function getCard() {
            const response = await readCard(cardId, abortController.signal);
            setCard(response);
        }
        getCard();
        return () => {
            abortController.abort();
        }
    }, [cardId]);

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

    async function submitHandler(event) {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    }

    const changeHandler = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            Deck {deck.name}
                        </Link>
                    </li>

                    <li className="breadcrumb-item active">
                        Edit Card {card.id}
                    </li>
                </ul>
            </nav>

            <form onSubmit={submitHandler}>
                <h2>Edit Card</h2>

                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        type="text"
                        style={{ width: "100%" }}
                        value={card.front}
                        onChange={changeHandler}
                    />

                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        type="text"
                        style={{ width: "100%" }}
                        value={card.back}
                        onChange={changeHandler}
                    />

                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                        Cancel
                    </Link>

                    <button onSubmit={submitHandler} type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditCard;
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

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

    // const changeHandler = ({ target }) => {
    //     setCard({
    //         ...card,
    //         [target.name]: target.value,
    //     });
    // }

    const frontHandler = ({ target }) => {
        setCard({
            ...card,
            front: target.value,
        })
    }

    const backHandler = ({ target }) => {
        setCard({
            ...card,
            back: target.value,
        })
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

            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h2>Edit Card</h2>
                    </div>
                    <CardForm card={card} frontHandler={frontHandler} backHandler={backHandler} />
                </div>
            </div>

                

            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Cancel
            </Link>

            <button onClick={submitHandler} type="submit" className="btn btn-primary">
                Submit
            </button>
        </div>
    )
}

export default EditCard;
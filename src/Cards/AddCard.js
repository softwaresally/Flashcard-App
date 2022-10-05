import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
    const initialFormState = {
        front: "",
        back: "",
    };
    const [card, setCard] = useState({ ...initialFormState });

    // get deck from API
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response)
        }
        getDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    //submit handler for submit button onClick
    const submitHandler = async () => {
        await createCard(deckId, card);
        setCard({ ...initialFormState });
    };

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
                            {deck.name}
                        </Link>
                    </li>

                    <li className="breadcrumb-item active">
                        Add Card
                    </li>
                </ul>
            </nav>

            <h4>{deck.name}: Add Card</h4>
            
            <CardForm frontHandler={frontHandler} backHandler={backHandler} card={card} />    

            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Done
            </Link>
                    
            <button onClick={submitHandler} type="submit" className="btn btn-primary">
                Save
            </button>
        </div>
    )
}

export default AddCard;
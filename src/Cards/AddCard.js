import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const initialFormState = {
        front: "",
        back: "",
    };
    const [newCard, setNewCard] = useState({ ...initialFormState });

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
        await createCard(deckId, newCard);
        setNewCard({ ...initialFormState });
    };

    //front handler
    const handleFront = ({target}) => {
        setNewCard({
            ...newCard,
            front: target.value,
        });
    }

    // back handler
    const handleBack = ({target}) => {
        setNewCard({
            ...newCard,
            back: target.value,
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
                            {deck.name}
                        </Link>
                    </li>

                    <li className="breadcrumb-item active">
                        Add Card
                    </li>
                </ul>
            </nav>

            <form onSubmit={submitHandler}>
                
                <h4>{deck.name}: Add Card</h4>

                <div className="form-group">

                    <label>Front</label>
                    <textarea
                        id="front"
                        rows="3"
                        type="textarea"
                        name="front"
                        style={{ width: "100%" }}
                        placeholder="Front side of card"
                        onChange={handleFront}
                    />

                    <br />

                    <label>Back</label>
                    <textarea
                        id="back"
                        rows="3"
                        type="textarea"
                        name="back"
                        style={{ width: "100%" }}
                        placeholder="Back side of card"
                        onChange={handleBack}
                    />

                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                        Done
                    </Link>
                    
                    <button onClick={submitHandler} type="submit" className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCard;
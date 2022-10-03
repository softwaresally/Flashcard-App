import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
    const history = useHistory();

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
        const response = await updateDeck(deck);
        history.push(`/decks/${response.id}`);
    }

    const nameHandler = ({target}) => {
        setDeck({
            ...deck,
            name: target.value,
        });
    }

    const descriptionHandler = ({target}) => {
        setDeck({
            ...deck,
            description: target.value,
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
                        Edit deck
                    </li>
                </ul>
            </nav>
            <form onSubmit={submitHandler}>
                <h2>Edit Deck</h2>

                <div className="form-group">
                    <label>Name</label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        style={{ width: "100%" }}
                        value={deck.name}
                        onChange={nameHandler}
                        className="form-control"
                    />

                    <label>Description</label>

                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        style={{ width: "100%" }}
                        value={deck.description}
                        onChange={descriptionHandler}
                        className="form-control"
                    />

                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                        Cancel
                    </Link>

                    <button onClick={submitHandler} type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDeck;
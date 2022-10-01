import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
    const initialFormState = { name: "", description: "" }
    const [newDeck, setNewDeck] = useState({ ...initialFormState });
    const history = useHistory();

    
    async function submitHandler(event) {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`)
    }

    const nameHandler = ({target}) => {
        setNewDeck({
            ...newDeck,
            name: target.value,
        });
    }

    const descriptionHandler = ({target}) => {
        setNewDeck({
            ...newDeck,
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

                    <li className="breadcrumb-item active">
                        Create Deck
                    </li>
                </ul>
            </nav>

            <form onSubmit={submitHandler}>
                <h2>Create Deck</h2>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        style={{ width: "100%" }}
                        placeholder="Deck Name"
                        onChange={nameHandler}
                    />

                    <br />

                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        type="textarea"
                        rows="4" 
                        style={{ width: "100%" }}
                        placeholder="Brief description of the deck"
                        onChange={descriptionHandler}
                    />

                    <Link to="/" className="btn btn-secondary">
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

export default CreateDeck;
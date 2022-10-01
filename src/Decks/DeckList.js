import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckList({ deck }) {
    const { id, name, description, cards } = deck;
    const deckLength = cards.length;
    const history = useHistory();

    const handleDelete = async (id) => {
        const deleteOnClick = window.confirm(
            "Are you sure you want to delete this deck? You will not be able to recover it."
        )
        if (deleteOnClick) {
            await deleteDeck(id);
            history.go(0);
        } else {
            history.go(0);
        }
    };

    return (
        <div className="card w-75 mb-4">
            <div className="card-body">
                <div className="row px-3">
                    <h4 className="card-title">{name}</h4>
                    <p className="ml-auto">{deckLength} cards</p>
                </div>
                <p className="card-text">{description}</p>
                <div className="row px-3">
                    <Link to={`/decks/${id}`} className="btn btn-secondary">
                        View
                    </Link>
                    <Link to={`/decks/${id}/study`} className="btn btn-primary">
                        Study
                    </Link>
                    <button
                        onClick={handleDelete}
                        name="delete"
                        value={id}
                        className="btn btn-danger">
                            Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeckList;
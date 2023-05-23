import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useDispatch } from "react-redux";
import * as listingActions from "../../../store/listings"

function ListingDeleteFormModal({listingId, onDelete}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = () => {
        dispatch(listingActions.removeListing(listingId));
        setShowModal(false)
        onDelete();
    };

    return (
        <>
        <button onClick={() => setShowModal(true)}>Delete Listing</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <p>Are you sure you want to delete this listing?</p>
            <button onClick={handleSubmit}>Yes</button>
            <button onClick={() => setShowModal(false)}>No</button>
            </Modal>
        )}
        </>
    );
}

export default ListingDeleteFormModal;

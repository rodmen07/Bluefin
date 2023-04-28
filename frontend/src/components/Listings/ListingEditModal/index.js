import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ListingEditForm from './ListingEditForm';

function ListingEditFormModal({listingId}) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingEditForm listingId={listingId} onSubmit={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default ListingEditFormModal;
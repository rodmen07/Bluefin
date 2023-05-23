import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ListingCreateForm from './ListingCreateForm';

function ListingCreateFormModal( {onListingCreate} ) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  }

  const handleListingCreate = () => {
    onListingCreate();
    closeModal();
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Listing</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <ListingCreateForm onSubmit={handleListingCreate} />
        </Modal>
      )}
    </>
  );
}

export default ListingCreateFormModal;

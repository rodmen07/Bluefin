import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ListingCreateForm from './ListingCreateForm';

function ListingCreateFormModal() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingCreateForm onSubmit={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default ListingCreateFormModal;
import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ListingCreateForm from './ListingCreateForm';

function ListingCreateFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingCreateForm />
        </Modal>
      )}
    </>
  );
}

export default ListingCreateFormModal;
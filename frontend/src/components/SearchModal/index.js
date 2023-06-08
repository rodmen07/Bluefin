import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SearchForm from './SearchForm';

export default function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Search by Filters</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SearchForm />
        </Modal>
      )}
    </>
  );
}

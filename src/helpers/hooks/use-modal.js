import { useState } from 'react';

const useModal = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  return {
    isOpen,
    toggleModal: () => setIsOpen((prev) => !prev),
  };
};

export default useModal;

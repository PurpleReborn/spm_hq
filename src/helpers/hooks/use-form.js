import { useState } from 'react';

const useForm = (initialState) => {
  const [state, setState] = useState(initialState);

  const handleStateSchange = (key, value) => {
    setState((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const resetFields = () => {
    setState(initialState);
  };

  return {
    state,
    handleStateSchange,
    resetFields,
  };
};

export default useForm;

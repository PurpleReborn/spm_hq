import { useEffect, useState } from 'react';

import { customerOrderServices, masterDataServices } from 'services/fetch';

const useCustomerOrder = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      _initData();
    }
  }, [query]);

  const _initData = async () => {
    try {
      setLoading(true);
      const response = await customerOrderServices.getList(query);
      console.log(response, 'init data customer order');
      const { value } = response;
      setData(value.orders);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const revalidate = () => {
    if (query) {
      setData([]);
      _initData();
    }
  };

  return {
    data,
    loading,
    error,
    revalidate,
  };
};

export default useCustomerOrder;

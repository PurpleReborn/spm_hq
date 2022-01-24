import { useEffect, useState } from 'react';

import { masterDataServices } from 'services/fetch';

const useCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    _initData();
  }, []);

  const _initData = async () => {
    try {
      setLoading(true);
      const response = await masterDataServices.customers.getList();
      console.log(response, 'init data customer');
      const { value } = response;
      setData(value.customers);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const revalidate = () => {
    setData([]);
    _initData();
  };

  return {
    data,
    loading,
    error,
    revalidate,
  };
};

export default useCustomer;

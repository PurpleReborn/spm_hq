import { useEffect, useState } from 'react';

import { masterDataServices } from 'services/fetch';

const useUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    _initData();
  }, []);

  const _initData = async () => {
    try {
      setLoading(true);
      const response = await masterDataServices.user.getList();
      console.log(response, 'init data user');
      const { value } = response;
      setData(value.users);
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

export default useUser;

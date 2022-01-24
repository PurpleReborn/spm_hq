import { useEffect, useState } from 'react';

import { deliveryOrderServices } from 'services/fetch';

const useDeliveryOrder = (query) => {
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
      const response = await deliveryOrderServices.getList(query);
      console.log(response, 'init data delivery order');
      const { value } = response;
      setData(value.deliveries);
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

export default useDeliveryOrder;

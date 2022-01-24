import Axios from 'libs/axios';

export const API_URL = process.env.REACT_APP_API_URL;
// export const API_URL = `https://3e3c-103-82-14-140.ngrok.io/api/v1/`;

export const BASE_URL = (target, query = '') => `${API_URL}${target}${query}`;

// const BASE_URL = (target) => `https://c7072ffa887b.ngrok.io/api/v1/${target}`;
export const masterDataServices = {
  products: {
    getList: () => {
      return Axios.requestUser
        .get(BASE_URL('master-data/product'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    create: (payload) => {
      return Axios.requestUser
        .post(BASE_URL('master-data/product'), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    edit: (payload, productId) => {
      return Axios.requestUser
        .put(BASE_URL(`master-data/product/${productId}`), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
  suppliers: {
    getList: () => {
      return Axios.requestUser
        .get(BASE_URL('master-data/supplier'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    create: (payload) => {
      return Axios.requestUser
        .post(BASE_URL('master-data/supplier'), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    edit: (payload, supplierId) => {
      return Axios.requestUser
        .put(BASE_URL(`master-data/supplier/${supplierId}`), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
  customers: {
    getList: () => {
      return Axios.requestUser
        .get(BASE_URL('master-data/customer'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    create: (payload) => {
      return Axios.requestUser
        .post(BASE_URL('master-data/customer'), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    edit: (payload, customerId) => {
      return Axios.requestUser
        .put(BASE_URL(`master-data/customer/${customerId}`), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
  factory: {
    getList: () => {
      return Axios.requestUser
        .get(BASE_URL('master-data/factory'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    create: (payload) => {
      return Axios.requestUser
        .post(BASE_URL('master-data/factory'), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    edit: (payload, factoryId) => {
      return Axios.requestUser
        .put(BASE_URL(`master-data/factory/${factoryId}`), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
  customerOrder: {
    getCreateInit: () => {
      return Axios.requestUser
        .get(BASE_URL('order/create-init'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
  user: {
    getList: () => {
      return Axios.requestUser
        .get(BASE_URL('master-data/user'))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    create: (payload) => {
      return Axios.requestUser
        .post(BASE_URL('master-data/user'), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    edit: (payload, userId) => {
      return Axios.requestUser
        .put(BASE_URL(`master-data/user/${userId}`), payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
    delete: (userId) => {
      return Axios.requestUser
        .delete(BASE_URL(`master-data/user/${userId}`))
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
    },
  },
};

export const customerOrderServices = {
  getList: (query) => {
    return Axios.requestUser
      .get(BASE_URL('order/order', query))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  getCreateInit: () => {
    return Axios.requestUser
      .get(BASE_URL('order/create-init'))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  addOrder: (payload) => {
    return Axios.requestUser
      .post(BASE_URL('order/order'), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  addOrderItem: (payload) => {
    return Axios.requestUser
      .post(BASE_URL('order/order/item'), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  deleteOrder: (id) => {
    return Axios.requestUser
      .delete(BASE_URL('order/order/' + id))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  editOrderItem: (payload, id) => {
    return Axios.requestUser
      .put(BASE_URL('order/order/item/' + id), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  deleteOrderItem: (id) => {
    return Axios.requestUser
      .delete(BASE_URL('order/order/item/' + id))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
};

export const deliveryOrderServices = {
  getList: (query) => {
    return Axios.requestUser
      .get(BASE_URL('order/delivery', query))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  addOrder: (payload) => {
    return Axios.requestUser
      .post(BASE_URL('order/delivery'), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  addOrderItem: (orderId, payload) => {
    return Axios.requestUser
      .post(BASE_URL(`order/delivery/${orderId}`), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  deleteOrder: (id) => {
    return Axios.requestUser
      .delete(BASE_URL('order/delivery/' + id))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  editOrderItem: (payload, id, deliveryId) => {
    return Axios.requestUser
      .put(BASE_URL(`order/delivery/${deliveryId}/${id}`), payload)
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
  deleteOrderItem: (id, deliveryId) => {
    return Axios.requestUser
      .delete(BASE_URL(`order/delivery/${deliveryId}/${id}`))
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response));
  },
};

import { useEffect, useState } from 'react';

import { Button, Card, Divider } from 'components/atoms';
import {
  DatePickerInput,
  DrawerBase,
  Input,
  InputNumberButton,
  SelectInput,
  TitleDescriptionItem,
} from 'components/molecules';

import { ReactComponent as EditSVG } from 'assets/icons/edit-pencil-icon.svg';
import { ReactComponent as MinusSVG } from 'assets/icons/minus-icon.svg';
import { ReactComponent as TrashSVG } from 'assets/icons/trash-icon.svg';
import { ReactComponent as CancelSVG } from 'assets/icons/close-icon.svg';
import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';

import styles from './styles.module.scss';
import format from 'date-fns/format';
import { deliveryOrderServices } from 'services/fetch';
import {
  useCustomer,
  useCustomerOrder,
  useForm,
  useProducts,
} from 'helpers/hooks';

const {
  order_drawer,
  order_drawer__info,
  order_drawer__content,
  drawer_action__button,
  drawer_action__container,
  drawer_tab,
  drawer_tab__button,
  drawer_customer,
  order_product,
  order_product__list,
  order_product__item,
  form_btn_container,
  form_product__container,
  form_product__list,
  product_input,
  icon_button,
  edit_container,
  edit_basic_info,
  edit_footer,
} = styles;

const DetailDeliveryOrder = (props) => {
  const { isOpen, toggleModal, data = null, refetchData = () => {} } = props;
  const { state, handleStateSchange } = useForm({
    products: [
      {
        product: '',
        quantity: 0,
        order: '',
      },
    ],
    delivery_plan_date: '',
  });
  const { data: productsData, loading } = useProducts();
  const { data: customersData } = useCustomer();
  const { data: dataOrders, loading: loadingOrders } =
    useCustomerOrder(`?status=On Going`);

  const [isEdit, setIsEdit] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsEdit(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (data && dataOrders) {
      const found = dataOrders.find((order) => order._id === data?.order?._id);
      setOrder(found);
    }
  }, [data, dataOrders]);

  useEffect(() => {
    if (data) {
      console.log(data, 'this is detail data do');
      if (data.item) {
        console.log(data.item);
        const products = data.item?.map((item) => ({
          product: item.product?._id,
          quantity: item.quantity,
          unit: item.product?.unit,
          order: item.order,
          _id: item._id,
        }));
        handleStateSchange('products', products);
      }
      handleStateSchange('delivery_plan_date', data?.delivery_plan_date);
    }
  }, [data]);

  const _handleDelete = async (id) => {
    try {
      const response = await deliveryOrderServices.deleteOrder(id);
      if (response) {
        console.log(response, 'response delete');
        toggleModal();
        refetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _addNewProduct = () => {
    handleStateSchange('products', [
      ...state.products,
      {
        product: '',
        quantity: 0,
        order: '',
      },
    ]);
  };

  const _removeProduct = (index) => {
    const removed = state?.products?.filter((_, idx) => idx !== index);
    handleStateSchange('products', removed);
  };

  const _changeProduct = (key, value, index) => {
    const newProducts = state.products.map((pd, i) => {
      if (i === index) {
        pd[key] = value;
      }

      return pd;
    });

    handleStateSchange('products', newProducts);
  };

  const _submitEditProduct = async (values) => {
    try {
      const promises = values?.map((item) => {
        const payload = {
          product: item.product,
          quantity: item.quantity,
        };

        console.log(item, 'this is item');

        return item._id
          ? deliveryOrderServices.editOrderItem(payload, item._id, data?._id)
          : deliveryOrderServices.addOrderItem(data?._id, {
              orderItemId: item.product,
              quantity: item.quantity,
            });
      });

      const responses = await Promise.all(promises);

      if (responses) {
        console.log(responses);
        refetchData();
        setIsEdit(false);
        toggleModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _deleteOrderItem = async (id, index) => {
    try {
      const response = await deliveryOrderServices.deleteOrderItem(
        id,
        data?._id
      );

      console.log(response, 'response delete order item');
      if (response) {
        _removeProduct(index);
        refetchData();
        toggleModal();
        setIsEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DrawerBase isOpen={isOpen} onClose={toggleModal}>
      <section className={order_drawer}>
        <header>
          <div className={order_drawer__info}>
            <div>
              <p>DELIVERY ORDER NUMBER</p>
              <h3>{data?.customer_po_number}</h3>
            </div>
            <p>
              Submitted:{' '}
              {data ? format(new Date(data?.createdAt), 'MM/dd/yyyy') : '-'}
            </p>
          </div>
          <div className={drawer_action__container}>
            <button
              className={drawer_action__button}
              onClick={() => setIsEdit((prev) => !prev)}
            >
              <EditSVG width={18} height={18} />
            </button>
            <button
              className={drawer_action__button}
              onClick={() => _handleDelete(data?._id)}
            >
              <TrashSVG width={18} height={18} />
            </button>
            <button
              className={drawer_action__button}
              data-grey={true}
              onClick={toggleModal}
            >
              <CancelSVG width={18} height={18} />
            </button>
          </div>
        </header>

        <article>
          {!isEdit && (
            <div className={drawer_tab}>
              <button className={drawer_tab__button} data-active={true}>
                Submitted
              </button>
              <button className={drawer_tab__button}>Activity</button>
            </div>
          )}

          <div className={order_drawer__content}>
            {isEdit ? (
              <section className={edit_container}>
                <div className={edit_basic_info}>
                  <SelectInput
                    label="Customer"
                    placeholder="Customer"
                    selections={customersData?.map((prod) => ({
                      label: prod.name,
                      value: prod._id,
                    }))}
                    disabled
                    value={data?.customer?._id}
                  />
                  <Input
                    type="text"
                    value={data?.order?.customer_po_number}
                    readonly
                    label="Order Number"
                  />
                </div>

                <DatePickerInput
                  label="Date Plan"
                  onChange={(v) => {
                    console.log(v, 'date');
                    handleStateSchange('delivery_plan_date', v);
                  }}
                  value={new Date(state?.delivery_plan_date)}
                />
                <div className={form_product__container}>
                  <p>Products</p>
                  <div className={form_product__list}>
                    {state?.products?.length
                      ? state?.products?.map((prd, index) => {
                          const isLastIndex = !prd?.product;

                          return (
                            <Card
                              bordered={!isLastIndex ? '' : 'dash'}
                              color={!isLastIndex ? 'grey' : 'white'}
                            >
                              <div className={product_input}>
                                <SelectInput
                                  placeholder="Product"
                                  selections={order?.item?.map((prod) => ({
                                    label: prod.product?.name,
                                    value: prod.product?._id,
                                  }))}
                                  onChange={(v) =>
                                    _changeProduct('product', v, index)
                                  }
                                  value={state.products[index]?.product}
                                />
                                <InputNumberButton
                                  value={state.products[index]?.quantity || 0}
                                  onChange={(v) =>
                                    _changeProduct('quantity', v, index)
                                  }
                                />
                                <SelectInput
                                  placeholder="Unit"
                                  disabled
                                  selections={[
                                    {
                                      label: 'KG',
                                      value: 'KG',
                                    },
                                    {
                                      label: 'Unit',
                                      value: 'unit',
                                    },
                                  ]}
                                  value={state.products[index]?.unit || 'KG'}
                                />
                                <button
                                  className={icon_button}
                                  onClick={() =>
                                    state.products[index]?._id
                                      ? _deleteOrderItem(
                                          state.products[index]?._id,
                                          index
                                        )
                                      : _removeProduct(index)
                                  }
                                >
                                  <MinusSVG />
                                </button>
                              </div>
                            </Card>
                          );
                        })
                      : null}
                  </div>
                  <div className={form_btn_container}>
                    <Button prefixIcon={<PlusSVG />} onClick={_addNewProduct}>
                      Add Product
                    </Button>
                  </div>
                </div>
              </section>
            ) : (
              <>
                <div className={drawer_customer}>
                  <TitleDescriptionItem
                    title="Customer"
                    description={data?.customer?.name || '-'}
                  />
                  <TitleDescriptionItem
                    title="Order Number"
                    description={data?.order?.order_number || '-'}
                  />
                </div>

                <Divider grey />

                <div className={drawer_customer}>
                  <TitleDescriptionItem
                    title="Date Plan"
                    description={
                      data?.delivery_plan_date
                        ? format(
                            new Date(data?.delivery_plan_date),
                            'MM/dd/yyyy'
                          )
                        : '-'
                    }
                  />
                </div>

                <Divider grey />

                <div className={drawer_customer}>
                  <TitleDescriptionItem
                    title="Address"
                    description={data?.address || '-'}
                  />
                </div>

                <Divider grey />

                {data?.item?.length ? (
                  <div className={order_product}>
                    <h6>Produk List</h6>

                    <div className={order_product__list}>
                      {data?.item?.map((dt, index) => {
                        return (
                          <div className={order_product__item} key={dt?._id}>
                            <p>{dt?.product?.name}</p>
                            <p>
                              {dt?.quantity} {dt?.product?.unit}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <Divider grey />

                    <div className={order_product__item}>
                      <h6>Total Quantity</h6>
                      <p>
                        {data?.item?.reduce(
                          (curr, acc) => curr + Number(acc?.quantity),
                          0
                        )}{' '}
                        kg
                      </p>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </article>
      </section>

      {isEdit && (
        <footer className={edit_footer}>
          <div>
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => _submitEditProduct(state.products)}
            >
              Submit
            </Button>
          </div>
        </footer>
      )}
    </DrawerBase>
  );
};

export default DetailDeliveryOrder;

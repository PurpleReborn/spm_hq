import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Card, Divider } from 'components/atoms';
import { FormLayout } from 'components/layout';
import {
  DatePickerInput,
  Input,
  InputNumberButton,
  SelectInput,
  TitleDescriptionItem,
} from 'components/molecules';
import { CardGreyInformation } from 'components/organism';

import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { ReactComponent as MinusSVG } from 'assets/icons/minus-icon.svg';
import { ReactComponent as EyeOpenSVG } from 'assets/icons/eye-open-icon.svg';
import { ReactComponent as EditPencilSVG } from 'assets/icons/edit-pencil-icon.svg';

import styles from './styles.module.scss';
import {
  useCustomerOrder,
  useFactory,
  useForm,
  useProducts,
} from 'helpers/hooks';
import { format } from 'date-fns';
import { deliveryOrderServices } from 'services/fetch';
import { useHistory } from 'react-router';

const {
  form_root,
  form_container,
  form_btn_container,
  form_product__container,
  form_product__list,
  product_input,
  icon_button,
  review_container,
  name_icon,
  order_number_card,
  order_number__data,
  order_number__text,
  order_number__po,
  product_list,
  product_list__count,
  product_list__item,
} = styles;

const CreateDeliveryOrderPage = () => {
  const { state, handleStateSchange } = useForm({
    products: [
      {
        product: '',
        quantity: 0,
        order: '',
      },
    ],
    order: '',
    customer: '',
    address: '',
    delivery_plan_date: '',
    factory: '',
    customer_po_number: '',
  });
  const [isPreview, setIsPreview] = useState(false);
  const { data: dataOrders, loading: loadingOrders } =
    useCustomerOrder(`?status=On Going`);
  const { data: dataProducts } = useProducts();
  const { data: dataFactory } = useFactory();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const history = useHistory();

  const _addNewProduct = () => {
    handleStateSchange('products', [
      ...state.products,
      {
        product: '',
        quantity: 0,
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

  const _createDeliveryOrder = async (values) => {
    try {
      if (
        values.customer &&
        values.order &&
        values.products?.[0]?.product &&
        values.factory &&
        values.address &&
        values.delivery_plan_date
      ) {
        const response = await deliveryOrderServices.addOrder({
          customer: values.customer,
          order: values.order,
          factory: values.factory,
          delivery_plan_date: format(values.delivery_plan_date, 'MM/dd/yyyy'),
          address: values.address,
        });
        const orderId = response.value.newDelivery?._id;

        if (values?.products.length) {
          const productPromises = values.products?.map((product) => {
            const payload = {
              orderItemId: product.product,
              quantity: product.quantity,
            };

            return deliveryOrderServices.addOrderItem(orderId, payload);
          });

          // console.log(response, 'result create order');

          const responsePromises = await Promise.all(productPromises);

          console.log(responsePromises);
        }

        history.replace('/delivery-order');
      } else {
        toast.error('Data tidak boleh ada yang kosong', {
          position: 'bottom-left',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ReviewSection = (
    <section className={review_container}>
      <Card color="white">
        <Card color="grey">
          <div className={order_number_card}>
            <div className={name_icon}>{state?.customer?.name?.[0]}</div>
            <div className={order_number__data}>
              <h4>{state?.customer?.name}</h4>
              <div className={order_number__text}>
                <span>Order Number:</span>
                <span>
                  {
                    dataOrders?.find((dt) => dt._id === state.order)
                      ?.order_number
                  }
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className={order_number__po}>
          <span>PO Number:</span>
          <span>
            {
              dataOrders?.find((dt) => dt._id === state.order)
                ?.customer_po_number
            }
          </span>
        </div>
      </Card>

      <Card color="white">
        <TitleDescriptionItem
          title="Date Plan"
          description={
            state.delivery_plan_date
              ? format(new Date(state?.delivery_plan_date), 'dd-MM-yyyy')
              : '-'
          }
        />
        <Divider grey />
        <TitleDescriptionItem
          title="Factory"
          description={
            dataFactory?.find((dt) => dt._id === state.factory)?.name
          }
        />
        <Divider grey />
        <TitleDescriptionItem title="Address" description={state.address} />
      </Card>

      <Card color="white">
        <div className={product_list}>
          <header>
            <h5>Product List</h5>
            <div className={product_list__count}>{state?.products.length}</div>
          </header>

          <section>
            {state.products?.map((pd, idx) => {
              const product = selectedOrder?.item.find(
                (item) => item._id === pd.product
              );
              const isLast = idx === state.products?.length - 1;

              return (
                <>
                  <div className={product_list__item}>
                    <p>{product?.product?.name || '-'}</p>
                    <p>
                      {pd?.quantity || '0'} {product?.unit || 'KG'}
                    </p>
                  </div>
                  {isLast ? null : <Divider grey />}
                </>
              );
            })}
          </section>
        </div>
      </Card>
    </section>
  );

  const FormSection = (
    <div className={form_container}>
      <SelectInput
        label="Order Number"
        placeholder="Select order number"
        selections={dataOrders?.map((order) => ({
          label: String(order?.order_number) || '-',
          value: order?._id,
        }))}
        onChange={(v) => {
          const order = dataOrders.find((dt) => dt._id === v);
          setSelectedOrder(order);
          handleStateSchange('order', v);
          handleStateSchange('customer', order.customer);
          handleStateSchange('customer_po_number', order.customer_po_number);
        }}
        value={state.order}
        required
      />
      {state.order ? (
        <>
          <CardGreyInformation
            title={['CUSTOMER', 'PO NUMBER']}
            description={[
              state?.customer?.name || '-',
              state.customer_po_number,
            ]}
            double
          />
          <Input
            type="text"
            label="Customer ID"
            placeholder="Input customer id"
            readonly
            value={state?.customer?._id || '-'}
            required
            rules={{
              validate: () => !state.customer?._id,
              validation: true,
              message: 'Data tidak boleh kosong',
            }}
          />
        </>
      ) : null}

      <DatePickerInput
        label="Date Plan"
        onChange={(v) => {
          console.log(v, 'date');
          handleStateSchange('delivery_plan_date', v);
        }}
        value={state?.delivery_plan_date}
        required
      />

      <SelectInput
        label="Factory"
        placeholder="Select factory"
        selections={dataFactory?.map((factory) => ({
          label: String(factory?.name) || '-',
          value: factory?._id,
        }))}
        onChange={(v) => {
          handleStateSchange('factory', v);
        }}
        value={state.order}
        required
      />

      <Input
        type="textarea"
        label="Address"
        placeholder="Write your address"
        value={state.address}
        onChange={(v) => handleStateSchange('address', v)}
        required
        rules={{
          validate: () => !state.address,
          validation: true,
          message: 'Data tidak boleh kosong',
        }}
      />
      {state.order ? (
        <div className={form_product__container}>
          <p>
            Products <span style={{ color: 'red' }}>*</span>
          </p>
          <div className={form_product__list}>
            {state?.products?.length
              ? state?.products?.map((prd, index) => {
                  const isLastIndex = index === state?.products.length - 1;
                  const items = dataOrders?.find(
                    (order) => order._id === state.order
                  )?.item;

                  return (
                    <Card
                      bordered={!isLastIndex ? '' : 'dash'}
                      color={!isLastIndex ? 'grey' : 'white'}
                    >
                      <div className={product_input}>
                        <SelectInput
                          placeholder="Product"
                          selections={items?.map((item) => {
                            return {
                              label: item.product?.name,
                              value: item?._id,
                            };
                          })}
                          onChange={(v) => _changeProduct('product', v, index)}
                          value={state.products[index]?.product}
                        />
                        <InputNumberButton
                          value={state.products[index]?.quantity || 0}
                          onChange={(v) => _changeProduct('quantity', v, index)}
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
                          value={
                            items?.find(
                              (dt) => dt._id === state.products[index]?.product
                            )?.product?.unit || 'Kg'
                          }
                        />
                        <button
                          className={icon_button}
                          onClick={() => _removeProduct(index)}
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
      ) : null}
    </div>
  );

  return (
    <FormLayout
      title="Create Delivery Order"
      okText="Submit"
      onOk={() => _createDeliveryOrder(state)}
      secondOkText={isPreview ? 'Edit' : 'Preview'}
      onSecondOk={() => setIsPreview((prev) => !prev)}
      secondOkIcon={isPreview ? <EditPencilSVG /> : <EyeOpenSVG />}
      extendedPaddingBottom={!isPreview}
      greyBackground={isPreview}
    >
      <section className={form_root}>
        <header>
          <h3>{isPreview ? 'Review Your Order' : 'Create Delivery Order'}</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </p>
        </header>

        {isPreview ? ReviewSection : FormSection}
      </section>
    </FormLayout>
  );
};

export default CreateDeliveryOrderPage;

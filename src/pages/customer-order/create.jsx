import { useEffect, useState } from 'react';

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

import { useCustomer, useForm, useProducts } from 'helpers/hooks';

import styles from './styles.module.scss';
import { customerOrderServices } from 'services/fetch';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

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

const CreateCustomerOrderPage = () => {
  const { state, handleStateSchange } = useForm({
    products: [
      {
        product: '',
        quantity: 0,
        order: '',
      },
    ],
    customer: '',
    customer_po_number: '',
  });
  const [isPreview, setIsPreview] = useState(false);
  const { data: dataCustomer } = useCustomer();
  const [initData, setInitData] = useState({
    dataProducts: [],
    lastOrder: null,
  });
  const history = useHistory();

  useEffect(() => {
    _initData();
  }, []);

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

  const _initData = async () => {
    try {
      const response = await customerOrderServices.getCreateInit();
      console.log(response);
      setInitData({
        dataProducts: response.value.products,
        lastOrder: Number(response.value.lastOrder?.order_number || 0) + 1,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const _changeProduct = (key, value, index) => {
    const newProducts = state.products.map((pd, i) => {
      if (i === index) {
        pd[key] = value;
        console.log(pd[key], key, value, index, 'this is product');
      }

      return pd;
    });

    handleStateSchange('products', newProducts);
  };

  const _createOrder = async (values) => {
    try {
      if (
        values.customer &&
        values.customer_po_number &&
        values.products?.[0]?.product &&
        values.date
      ) {
        const response = await customerOrderServices.addOrder({
          customer: values.customer,
          customer_po_number: values.customer_po_number,
          date: values.date,
        });
        const orderId = response.value.newOrder?._id;
        const productPromises = values.products?.map((product) => {
          const payload = {
            product: product.product,
            quantity: product.quantity,
            order: orderId,
          };

          return customerOrderServices.addOrderItem(payload);
        });

        // console.log(response, 'result create order');

        const responsePromises = await Promise.all(productPromises);

        history.replace('/customer-order');

        console.log(responsePromises);
      } else {
        toast.error('Data tidak boleh ada yang kosong', {
          position: 'bottom-left',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const FormSection = (
    <div className={form_container}>
      <Input
        label="Customer PO Number"
        placeholder="Input PO Number"
        onChange={(v) => handleStateSchange('customer_po_number', v)}
        value={state.customer_po_number}
        required
        rules={{
          validate: () => !state.customer_po_number,
          validation: true,
          message: 'Data tidak boleh kosong',
        }}
      />
      <CardGreyInformation
        title="ORDER NUMBER"
        description={initData.lastOrder}
      />
      <DatePickerInput
        label="Date Plan"
        onChange={(v) => {
          console.log(v, 'date');
          handleStateSchange('date', v);
        }}
        value={state?.date}
        required
      />
      <SelectInput
        label="Customer"
        placeholder="Select customer"
        selections={dataCustomer?.map((cus) => ({
          label: cus.name,
          value: cus._id,
        }))}
        onChange={(v) => handleStateSchange('customer', v)}
        value={state.customer}
        required
      />
      <div className={form_product__container}>
        <p>
          Products <span style={{ color: 'red' }}>*</span>
        </p>
        <div className={form_product__list}>
          {state?.products?.length
            ? state?.products?.map((prd, index) => {
                const isLastIndex = index === state?.products.length - 1;

                return (
                  <Card
                    bordered={!isLastIndex ? '' : 'dash'}
                    color={!isLastIndex ? 'grey' : 'white'}
                  >
                    <div className={product_input}>
                      <SelectInput
                        placeholder="Product"
                        selections={initData.dataProducts?.map((prod) => ({
                          label: prod.name,
                          value: prod._id,
                        }))}
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
                          initData.dataProducts?.find(
                            (dt) => dt._id === state.products[index]?.product
                          )?.unit || 'Kg'
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
    </div>
  );

  const ReviewSection = (
    <section className={review_container}>
      <Card color="white">
        <Card color="grey">
          <div className={order_number_card}>
            <div className={name_icon}>
              {
                dataCustomer?.find((cus) => cus._id === state.customer)
                  ?.name?.[0]
              }
            </div>
            <div className={order_number__data}>
              <h4>
                {dataCustomer?.find((cus) => cus._id === state.customer)
                  ?.name || '-'}
              </h4>
              <div className={order_number__text}>
                <span>Order Number:</span>
                <span>{initData.lastOrder}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className={order_number__po}>
          <span>PO Number:</span>
          <span>{state?.customer_po_number || '-'}</span>
        </div>
      </Card>

      <Card color="white">
        <div className={product_list}>
          <header>
            <h5>Product List</h5>
            <div className={product_list__count}>{state.products?.length}</div>
          </header>

          <section>
            {state.products?.map((pd, idx) => {
              const product = initData.dataProducts.find(
                (item) => item._id === pd.product
              );
              const isLast = idx === state.products?.length - 1;

              return (
                <>
                  <div className={product_list__item}>
                    <p>{product?.name || '-'}</p>
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

  return (
    <FormLayout
      title="Create Customer Order"
      okText="Submit"
      onOk={() => _createOrder(state)}
      secondOkText={isPreview ? 'Edit' : 'Preview'}
      onSecondOk={() => setIsPreview((prev) => !prev)}
      secondOkIcon={isPreview ? <EditPencilSVG /> : <EyeOpenSVG />}
      greyBackground={isPreview}
    >
      <section className={form_root}>
        <header>
          <h3>{isPreview ? 'Review Your Order' : 'Create Customer Order'}</h3>
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

export default CreateCustomerOrderPage;

import { useEffect, useState } from 'react';
import { Input, ModalBase, SelectInput } from 'components/molecules';
import { Button, Card } from 'components/atoms';
import { ReactComponent as CancelSVG } from 'assets/icons/cancel_black.svg';
import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';

import styles from './styles.module.scss';
import { masterDataServices } from 'services/fetch';
import { useProducts } from 'helpers/hooks';

const { form_container, btn_container, container, machine_input__container } =
  styles;

const AddFactoryModal = (props) => {
  const {
    isOpen = false,
    onClose = () => {},
    revalidate = () => {},
    isEdit = false,
    defaultData = null,
  } = props;
  const { data } = useProducts();
  const productSelection = data?.map((item) => ({
    value: item._id,
    label: item?.name,
  }));

  const [moduleForm, setModuleForm] = useState({
    machine: [
      {
        name: '',
        capacity: '',
      },
    ],
    products: [
      {
        productId: '',
        warehouse_name: '',
      },
    ],
    name: '',
  });

  const [deletedMachines, setDeletedMachines] = useState([]);

  useEffect(() => {
    if (isEdit && defaultData) {
      setModuleForm({
        name: defaultData.name,
        machine: defaultData.machines?.map((mch) => ({
          _id: mch._id,
          name: mch.name,
          capacity: mch.capacity,
        })),
        products: defaultData?.products?.map((prd) => ({
          productId: prd.product?._id,
          warehouse_name: prd.warehouse_name,
          type: 'edit',
          productFactoryId: prd.factory,
        })),
      });
    } else {
      setModuleForm({
        machine: [
          {
            name: '',
            capacity: '',
          },
        ],
        products: [
          {
            productId: '',
            warehouse_name: '',
          },
        ],
        name: '',
      });
    }
  }, [isEdit, defaultData]);

  const handleItemAdd = () => {
    window.scrollTo({
      top: window.screen.height,
      behavior: 'smooth',
    });
    setModuleForm((prevState) => {
      return {
        ...prevState,
        machine: [
          ...prevState.machine,
          {
            name: '',
            capacity: '',
          },
        ],
      };
    });
  };

  const handleItemProductAdd = () => {
    window.scrollTo({
      top: window.screen.height,
      behavior: 'smooth',
    });
    setModuleForm((prevState) => {
      return {
        ...prevState,
        products: [
          ...prevState.products,
          {
            productId: '',
            warehouse_name: '',
          },
        ],
      };
    });
  };

  const handleItemChange = (target, value, itemIndex) => {
    setModuleForm((prevState) => {
      return {
        ...prevState,
        machine: prevState.machine.reduce((acc, curr, idx) => {
          if (idx == itemIndex) {
            acc.push({
              ...curr,
              [target]: value,
            });
          } else {
            acc.push(curr);
          }
          return acc;
        }, []),
      };
    });
  };

  const handleItemProductChange = (target, value, itemIndex) => {
    setModuleForm((prevState) => {
      return {
        ...prevState,
        products: prevState.products.reduce((acc, curr, idx) => {
          if (idx == itemIndex) {
            acc.push({
              ...curr,
              [target]: value,
            });
          } else {
            acc.push(curr);
          }
          return acc;
        }, []),
      };
    });
  };

  const handleItemDelete = (itemIndex, key) => {
    setModuleForm((prevState) => {
      return {
        ...prevState,
        [key]: prevState[key].reduce((acc, curr, idx) => {
          if (idx !== itemIndex) {
            acc.push(curr);
          }

          return acc;
        }, []),
      };
    });
  };

  const _submitAdd = async (values) => {
    try {
      console.log(values);
      const response = await masterDataServices.factory.create(values);
      console.log(response);
      if (response) {
        revalidate();
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const _submitEdit = async (values) => {
    try {
      console.log(values);
      const response = await masterDataServices.factory.edit(
        values,
        defaultData?._id
      );
      console.log(response);
      if (response) {
        revalidate();
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Factory' : 'Add Factory'}
      okText="Submit"
      onOk={() => {
        let payload = null;

        if (!isEdit) {
          payload = {
            name: moduleForm.name,
            machines: moduleForm.machine,
            products: moduleForm.products?.map((prod) => ({
              ...prod,
              type: 'add',
            })),
          };
          console.log(payload);
          _submitAdd(payload);
        } else {
          payload = {
            name: moduleForm.name,
            deletedMachines,
            editedMachines: moduleForm.machine.filter((it) => it._id),
            addedMachines: moduleForm.machine.filter((it) => !it._id),
            products: moduleForm.products,
          };
          console.log(payload);
          _submitEdit(payload);
        }
      }}
    >
      <div className={container}>
        <Input
          type="text"
          label="Name Factory"
          placeholder="Enter name factory"
          onChange={(v) =>
            setModuleForm((prevState) => ({ ...prevState, name: v }))
          }
          value={moduleForm.name}
        />

        <div className={form_container}>
          <p>Machine</p>
          {moduleForm?.machine.map((item, index) => {
            return (
              <Card color="grey">
                <div
                  key={index}
                  className={machine_input__container}
                  data-above-one={moduleForm?.machine.length > 1 || isEdit}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.2rem',
                    }}
                  >
                    <Input
                      type="text"
                      placeholder="Enter machine name"
                      onChange={(value) => {
                        handleItemChange('name', value, index);
                      }}
                      value={item?.name}
                    />
                    <Input
                      type="text"
                      placeholder="Tuliskan kapasitas"
                      onChange={(value) => {
                        handleItemChange('capacity', value, index);
                      }}
                      value={item?.capacity}
                      number
                    />
                  </div>
                  <div>
                    {moduleForm?.machine.length > 1 || isEdit ? (
                      <Button
                        prefixIcon={<CancelSVG />}
                        onClick={() => {
                          handleItemDelete(index, 'machine');
                          if (item._id) {
                            setDeletedMachines((prev) => [...prev, item._id]);
                          }
                        }}
                        size="small"
                      />
                    ) : null}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className={btn_container}>
          <Button
            prefixIcon={<PlusSVG />}
            type="secondary"
            onClick={handleItemAdd}
            size="small"
            bordered
          >
            Add Machine
          </Button>
        </div>

        <div className={form_container}>
          <p>Tempat Penyimpanan</p>
          {moduleForm?.products.map((item, index) => {
            return (
              <Card color="grey">
                <div
                  key={index}
                  className={machine_input__container}
                  data-above-one={moduleForm?.products.length > 1}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.2rem',
                    }}
                  >
                    {/* <Input
                      type="text"
                      placeholder="Enter products name"
                      onChange={(value) => {
                        handleItemProductChange('productId', value, index);
                      }}
                      value={item?.name}
                    /> */}
                    <SelectInput
                      placeholder="Pilih product"
                      selections={productSelection}
                      onChange={(v) =>
                        handleItemProductChange('productId', v, index)
                      }
                      value={item.productId}
                    />
                    <Input
                      type="text"
                      placeholder="Tuliskan nama penyimpanan"
                      onChange={(value) => {
                        handleItemProductChange('warehouse_name', value, index);
                      }}
                      value={item.warehouse_name}
                    />
                  </div>
                  <div>
                    {moduleForm?.products.length > 1 ? (
                      <Button
                        prefixIcon={<CancelSVG />}
                        onClick={() => {
                          handleItemDelete(index, 'products');
                        }}
                        size="small"
                      />
                    ) : null}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className={btn_container}>
          <Button
            prefixIcon={<PlusSVG />}
            type="secondary"
            onClick={handleItemProductAdd}
            size="small"
            bordered
          >
            Tempat Penyimpanan
          </Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default AddFactoryModal;

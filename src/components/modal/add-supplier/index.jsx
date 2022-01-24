import { Input, ModalBase } from 'components/molecules';
import { useForm } from 'helpers/hooks';
import { useEffect } from 'react';
import { masterDataServices } from 'services/fetch';

import styles from './styles.module.scss';

const { form_container } = styles;

const AddSupplierModal = (props) => {
  const {
    isOpen = false,
    onClose = () => {},
    revalidate = () => {},
    isEdit = false,
    defaultData = null,
  } = props;
  const { state, handleStateSchange, resetFields } = useForm({
    name: '',
    address: '',
    pic_name: '',
    pic_phone_number: '',
  });

  useEffect(() => {
    if (isEdit && defaultData) {
      handleStateSchange('name', defaultData.name);
      handleStateSchange('address', defaultData.address);
      handleStateSchange('pic_name', defaultData.pic_name);
      handleStateSchange('pic_phone_number', defaultData.pic_phone_number);
    } else {
      resetFields();
    }
  }, [isEdit, defaultData]);

  const _submitAdd = async (values) => {
    try {
      const response = isEdit
        ? await masterDataServices.suppliers.edit(values, defaultData?._id)
        : await masterDataServices.suppliers.create(values);
      console.log(response);
      if (response) {
        onClose();
        revalidate();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Supplier' : 'Add Supplier'}
      okText="Submit"
      onOk={() => {
        _submitAdd(state);
      }}
    >
      <div className={form_container}>
        <Input
          type="text"
          label="Name Supplier"
          placeholder="Enter name supplier"
          name="name"
          value={state.name}
          onChange={(v) => handleStateSchange('name', v)}
        />
        <Input
          type="text"
          label="Supplier Address"
          placeholder="Enter supplier address"
          name="address"
          value={state.address}
          onChange={(v) => handleStateSchange('address', v)}
        />
        <Input
          type="text"
          label="PIC Name"
          placeholder="Enter PIC name"
          name="pic_name"
          value={state.pic_name}
          onChange={(v) => handleStateSchange('pic_name', v)}
        />
        <Input
          type="number"
          label="PIC Number"
          placeholder="Enter PIC number"
          name="pic_phone_number"
          value={state.pic_phone_number}
          onChange={(v) => handleStateSchange('pic_phone_number', v)}
        />
      </div>
    </ModalBase>
  );
};

export default AddSupplierModal;

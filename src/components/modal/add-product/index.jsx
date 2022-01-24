import { useState } from 'react';
import { Input, ModalBase, RadioButtonGroup } from 'components/molecules';

import styles from './styles.module.scss';

const { form_container, average_price, container } = styles;

const AddProductModal = (props) => {
  const { isOpen = false, onClose = () => {} } = props;
  const [radioSelected, setRadioSelected] = useState(1);

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title="New Product"
      okText="Submit"
    >
      <div className={container}>
        <div className={form_container}>
          <p>Product Type</p>
          <RadioButtonGroup
            selections={[
              {
                label: 'CPO',
                value: 1,
              },
              {
                label: 'Kernel',
                value: 2,
              },
              {
                label: 'Cangkang',
                value: 3,
              },
            ]}
            onChange={setRadioSelected}
            currentValue={radioSelected}
          />
        </div>
        <Input
          type="number"
          label="Current Stock"
          placeholder="Enter current stock"
        />
        <div className={average_price}>
          <p>Average Price Movement</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1.2rem',
            }}
          >
            <Input type="number" placeholder="Enter range quality" />
            <Input type="number" placeholder="Enter price" />
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default AddProductModal;

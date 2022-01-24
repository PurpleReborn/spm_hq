import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Calendar from 'react-calendar';

import styles from './styles.module.scss';

const { root, calendar } = styles;

const DatePickerBase = (props) => {
  const { value, setValue } = props;
  const [selected, setSelected] = useState(new Date());

  return (
    <div className={root}>
      <Calendar
        value={value}
        onChange={(v) => {
          setValue(v);
          console.log(v);
        }}
        className={calendar}
      />
    </div>
  );
};

export default DatePickerBase;

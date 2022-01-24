import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { Input } from 'components/molecules';
import {
  Button,
  DatePickerBase,
  Divider,
  ErrorMessage,
} from 'components/atoms';

import { ReactComponent as CalendarSVG } from 'assets/icons/calendar-icon.svg';

import styles from './styles.module.scss';

const { root, datepicker } = styles;

const InputDateOicker = (props) => {
  const {
    label,
    placeholder,
    value,
    onChange = () => {},
    required,
    rules,
  } = props;
  const [selectedDate, setSelectedDate] = useState('');
  const [dateString, setDateString] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setDateString(format(new Date(value), 'MM/dd/yyyy'));
    }
  }, [value]);

  return (
    <div className={root}>
      <Input
        type="text"
        readonly
        prefixIcon={<CalendarSVG />}
        placeholder={placeholder || 'Select date'}
        onClick={() => setShow((prev) => !prev)}
        value={dateString}
        label={label}
        required={required}
        rules={
          required && {
            validate: () => !dateString,
            validation: true,
            message: 'Data tidak boleh kosong',
          }
        }
      />

      {show && (
        <div className={datepicker}>
          <DatePickerBase
            value={selectedDate}
            setValue={(v) => {
              setSelectedDate(v);
              setDateString(format(v, 'MM/dd/yyyy'));
              setShow(false);
              onChange(v);
            }}
          />
          <footer>
            <Button
              size="full"
              onClick={() => {
                setSelectedDate(new Date());
                setDateString(format(new Date(), 'MM/dd/yyyy'));
                setShow(false);
              }}
            >
              Today
            </Button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default InputDateOicker;

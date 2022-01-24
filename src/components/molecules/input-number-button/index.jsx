import { ReactComponent as PlusSVG } from 'assets/icons/plus-icon.svg';
import { ReactComponent as MinusSVG } from 'assets/icons/minus-icon.svg';

import styles from './styles.module.scss';
import { Input } from '..';
import { useEffect, useRef } from 'react';

const { input_number_btn } = styles;

const InputNumberButton = (props) => {
  const {
    onPlus = () => {},
    onMinus = () => {},
    onChange = () => {},
    value = 0,
  } = props;
  const countRef = useRef({});

  useEffect(() => {
    console.log(countRef.current);
  }, [countRef]);

  return (
    <div className={input_number_btn}>
      <button
        onClick={() => {
          const min = Number(value) - 1;
          onChange(min);
        }}
      >
        <MinusSVG />
      </button>
      {/* <input
        type="number"
        value={Number(value) || null}
        onChange={(e) => {
          console.log(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          width: '8rem',
        }}
        
        min={0}
      /> */}
      <div
        style={{
          minWidth: '12rem',
          width: 'fit-content',
        }}
      >
        <Input
          type="text"
          number
          value={Number(value)}
          ghost
          textAlign="center"
          onChange={(v) => onChange(Number(v))}
        />
      </div>
      <button
        onClick={() => {
          const plus = Number(value) + 1;
          onChange(plus);
        }}
      >
        <PlusSVG />
      </button>
    </div>

    // <Input
    //   type="text"
    //   number
    //   value={value}
    //   onChange={(v) => onChange(v)}
    //   suffixIcon={
    //     <button
    //       onClick={() => {
    //         const plus = value + 1;
    //         onChange(plus);
    //       }}
    //     >
    //       <PlusSVG />
    //     </button>
    //   }
    //   prefixIcon={
    //     <button
    //       onClick={() => {
    //         const min = value - 1;
    //         onChange(min);
    //       }}
    //     >
    //       <MinusSVG />
    //     </button>
    //   }
    // />
  );
};

export default InputNumberButton;

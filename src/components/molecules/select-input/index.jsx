import { useState, useEffect, memo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { Input } from 'components/molecules';

import { ReactComponent as DownSVG } from 'assets/icons/chevron-down-icon.svg';
import { ReactComponent as SearchSVG } from 'assets/icons/search-icon.svg';

import styles from './styles.module.scss';

const { root, content, content_list, content_search } = styles;

const SelectInput = (props) => {
  const {
    selections = [],
    label = '',
    placeholder = '',
    onChange = () => {},
    value = '',
    positionStatic = false,
    withSearch = false,
    disabled = false,
    required,
  } = props; // selections = [{label: "", value: ""}]
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({ label: '', value: '' }); // {label: "", value: ""}
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (value && selections?.length) {
      const onList = selections?.find((item) => item.value === value);
      console.log(onList);
      if (onList) {
        setSelected(onList);
      } else {
        setSelected({ label: '', value: '' });
      }
    }
  }, [selections, value]);

  return (
    <OutsideClickHandler onOutsideClick={() => setShow(false)}>
      <div className={root}>
        <Input
          type="text"
          value={selected?.label || null}
          placeholder={placeholder || 'Select'}
          label={label || ''}
          readonly
          onClick={() => setShow((prev) => !prev)}
          suffixIcon={
            <div
              style={{
                display: 'grid',
                placeContent: 'center',
                transform: show && 'rotate(180deg)',
                transition: 'transform 0.25s ease',
              }}
            >
              <DownSVG />
            </div>
          }
          disabled={disabled}
          required={required}
          rules={
            required && {
              validate: () => !selected,
              validation: true,
              message: 'Data tidak boleh kosong',
            }
          }
        />

        {show && (
          <div
            className={content}
            style={{ position: positionStatic ? 'relative' : 'absolute' }}
          >
            {withSearch && (
              <div className={content_search}>
                <Input
                  type="text"
                  placeholder="Search..."
                  small
                  prefixIcon={<SearchSVG />}
                  onChange={(e) => setSearchValue(e)}
                  value={searchValue}
                />
              </div>
            )}
            <ul className={content_list}>
              {selections
                ?.filter((dt) =>
                  dt?.label?.toLowerCase()?.includes(searchValue.toLowerCase())
                )
                .map((item, key) => {
                  return (
                    <li
                      onClick={() => {
                        onChange(item?.value);
                        setSelected(item);
                        setShow(false);
                      }}
                    >
                      {item?.label}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default memo(SelectInput);

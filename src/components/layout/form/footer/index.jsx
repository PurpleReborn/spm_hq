import { useHistory } from 'react-router';

import { Button } from 'components/atoms';

import styles from './styles.module.scss';

const { root } = styles;

const FormFooter = (props) => {
  const {
    okText,
    onOk,
    secondOkText,
    onSecondOk,
    secondOkIcon,
    onCancel,
    cancelText,
  } = props;
  const history = useHistory();

  return (
    <footer className={root}>
      <div>
        <Button onClick={() => (onCancel ? onCancel() : history.goBack())}>
          {cancelText || 'Cancel'}
        </Button>
      </div>
      <div>
        {secondOkText && onSecondOk ? (
          <Button
            prefixIcon={secondOkIcon}
            variant="secondary"
            onClick={() => onSecondOk()}
          >
            {secondOkText}
          </Button>
        ) : null}
        <Button variant="primary" onClick={() => onOk()}>
          {okText || 'Save'}
        </Button>
      </div>
    </footer>
  );
};

export default FormFooter;

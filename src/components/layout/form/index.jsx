import FormHeader from './header';
import FormFooter from './footer';

import styles from './styles.module.scss';

const { root, content } = styles;

const FormLayout = ({
  children,
  title,
  okText,
  onOk,
  secondOkText,
  onSecondOk,
  secondOkIcon,
  onCancel,
  cancelText,
  extendedPaddingBottom = false,
  greyBackground = false,
}) => {
  return (
    <section className={root}>
      <section>
        <FormHeader title={title} />
        <article
          className={content}
          data-extended-padding-bottom={extendedPaddingBottom}
          data-grey-bg={greyBackground}
        >
          <div>{children}</div>
        </article>
        <FormFooter
          okText={okText}
          onOk={onOk}
          secondOkText={secondOkText}
          onSecondOk={onSecondOk}
          secondOkIcon={secondOkIcon}
          onCancel={onCancel}
          cancelText={cancelText}
        />
      </section>
    </section>
  );
};

export default FormLayout;

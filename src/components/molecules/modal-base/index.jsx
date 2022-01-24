import { ReactNode, useEffect } from 'react';
import OutsideHandler from 'react-outside-click-handler';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, Portal } from 'components/atoms';

import { ReactComponent as CloseSVG } from 'assets/icons/close-icon.svg';

import styles from './styles.module.scss';
import { SelectInput } from '..';

const { overlay, content, close_icon } = styles;

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0, transition: { delay: 0.25 } },
};

const contentVariants = {
  open: { opacity: 1, scale: 1, transition: { type: 'spring' } },
  closed: { opacity: 0, scale: 0.5, transition: { delay: 0.25 } },
};

const Modal = (props) => {
  const {
    isOpen,
    onClose,
    children,
    transparent = false,
    title = '',
    okText = '',
    cancelText = '',
    okButton = true,
    cancelButton = true,
    onOk = () => {},
    footer = null,
  } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Portal className="modal-portal">
          <motion.div
            className={overlay}
            variants={overlayVariants}
            initial="closed"
            exit="closed"
            animate={isOpen ? 'open' : 'closed'}
          >
            <OutsideHandler onOutsideClick={onClose}>
              <motion.div
                className={content}
                variants={contentVariants}
                initial="closed"
                exit="closed"
                animate={isOpen ? 'open' : 'closed'}
                data-transparent={`${transparent}`}
              >
                <header>
                  <h4>{title}</h4>
                  <div className={close_icon} onClick={onClose}>
                    <CloseSVG />
                  </div>
                </header>
                <article>{children}</article>
                {footer || (
                  <footer>
                    <div>
                      {cancelButton && (
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={onClose}
                        >
                          {cancelText || 'Cancel'}
                        </Button>
                      )}
                      {okButton && (
                        <Button variant="primary" size="small" onClick={onOk}>
                          {okText || 'Ok'}
                        </Button>
                      )}
                    </div>
                  </footer>
                )}
              </motion.div>
            </OutsideHandler>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default Modal;

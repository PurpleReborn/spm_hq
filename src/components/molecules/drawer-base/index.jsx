import OutsideHandler from "react-outside-click-handler";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./styles.module.scss";
import { Portal } from "components/atoms";

const { overlay, content } = styles;

const overlayVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0, transition: { delay: 0.25 } },
};

const contentVariantsRight = {
  open: { opacity: 1, right: 0, top: 0, transition: { duration: 0.25 } },
  closed: { opacity: 0, right: "-100%", transition: { delay: 0.25 } },
};
const DekstopDrawerDetail = (props) => {
  const { isOpen, onClose, onBack, children, title, secondAction } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Portal className="modal-portal">
          <motion.div
            className={overlay}
            variants={overlayVariants}
            initial="closed"
            exit="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <OutsideHandler onOutsideClick={onClose}>
              <motion.div
                className={content}
                variants={contentVariantsRight}
                initial="closed"
                exit="closed"
                animate={isOpen ? "open" : "closed"}
              >
                {children}
              </motion.div>
            </OutsideHandler>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

export default DekstopDrawerDetail;

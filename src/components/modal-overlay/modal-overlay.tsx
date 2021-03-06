import { ReactNode, SyntheticEvent, useCallback, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import styles from './modal-overlay.module.scss';

const ModalOverlay = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) => {
  const { closeModal } = useModal();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) {
          onClose();
        }
        closeModal();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal, onClose]);

  const handleOverlayCloseClick = useCallback(
    (e: SyntheticEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        if (onClose) {
          onClose();
        }
        closeModal();
      }
    },
    [closeModal, onClose]
  );

  return (
    <div className={styles.wrapper} onClick={handleOverlayCloseClick}>
      {children}
    </div>
  );
};

export default ModalOverlay;

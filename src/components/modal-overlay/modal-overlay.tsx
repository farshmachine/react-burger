import React, { ReactNode, useCallback, useEffect } from 'react';
import { useModal } from '../../hooks/useModal';
import styles from './modal-overlay.module.scss';

const ModalOverlay = ({ children }: { children: ReactNode }) => {
  const { closeModal } = useModal();

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  const handleOverlayCloseClick = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <div
      className={styles.wrapper}
      onKeyDown={() => console.log('test')}
      onClick={handleOverlayCloseClick}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;

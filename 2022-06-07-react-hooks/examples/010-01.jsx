import { useEffect, useRef, useState } from 'react';

export function Page() {
  const timeoutId = useRef(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (showBanner) {
      clearTimeout(timeoutId);
      timeoutId.current = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
    }
  }, [showBanner]);

  const displayBanner = () => {
    setShowBanner(true);
  };

  const handleClose = () => {
    clearTimeout(timeoutId.current);
    setShowBanner(false);
  };

  return (
    <div>
      <button type="text" onClick={displayBanner}>
        Show Banner
      </button>
      {showBanner && <Banner onClose={handleClose} />}
    </div>
  );
}

function Banner({ onClose }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#9ac',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      Banner!
      <button type="button" onClick={onClose}>
        x
      </button>
    </div>
  );
}

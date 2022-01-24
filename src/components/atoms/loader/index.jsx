import React from 'react';

const Loader = ({ size = 'default', text = 'Loading' }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span style={{ marginTop: '1.25rem' }}>{text}</span>
    </div>
  );
};

export default Loader;

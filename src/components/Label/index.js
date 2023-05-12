import React from 'react';

const label = {
  h1: ({ bold = false, children }) => {
    return (
      <h1 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
        {children}
      </h1>
    );
  },
  h2: ({ bold = false, children }) => {
    return (
      <h2 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
        {children}
      </h2>
    );
  },
  h3: ({ bold = false, children }) => {
    return (
      <h3 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
        {children}
      </h3>
    );
  },
  h4: ({ bold = false, children }) => {
    return (
      <h4 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
        {children}
      </h4>
    );
  },
  h5: ({ bold = false, children }) => {
    return (
      <h5 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : ''}` }}>
        {children}
      </h5>
    );
  },
  h6: ({ bold = false, children }) => {
    return (
      <h6 className="mb-0" style={{ fontWeight: `${bold ? 'bold' : '400'}` }}>
        {children}
      </h6>
    );
  },
  titlexs: ({ children }) => {
    return (
      <span
        style={{ fontSize: '11px', fontWeight: '400', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
  titlesm: ({ children }) => {
    return (
      <span
        style={{ fontSize: '13px', fontWeight: '400', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
  titlemd: ({ children }) => {
    return (
      <span
        style={{ fontSize: '13px', fontWeight: '400', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
  titlelg: ({ children }) => {
    return (
      <span
        style={{ fontSize: '14px', fontWeight: '500', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
  titlexl: ({ children }) => {
    return (
      <span
        style={{ fontSize: '15px', fontWeight: '500', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
  titlexxl: ({ children }) => {
    return (
      <span
        style={{ fontSize: '16px', fontWeight: '500', fontStyle: 'normal', lineHeight: 'normal' }}
      >
        {children}
      </span>
    );
  },
};

export { label };

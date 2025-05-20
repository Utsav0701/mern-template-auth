import React, { forwardRef } from 'react';

const FormInput = forwardRef(({ label, name, type = 'text', value, onChange, error }, ref) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      ref={ref}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={error ? 'error-border' : ''}
      autoComplete="off"
    />
    {error && <div className="error-text">{error}</div>}
  </div>
));

export default FormInput;

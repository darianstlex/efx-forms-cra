import './index.css';

export const Input = ({ label, error, errors, onChange, ...rest }) => (
  <div className="Input-wrapper">
    <div className="Input-label">{label}</div>
    <input
      className="Input-field"
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
    {error && <span className="Input-error">{error}</span>}
  </div>
);
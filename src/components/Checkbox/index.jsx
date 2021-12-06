import './index.css';

export const Checkbox = ({ label, error, errors, value, onChange, ...rest }) => (
  <div className="Checkbox-wrapper">
    <div className="Checkbox-field">
      <div className="Checkbox-label">{label}</div>
      <input
        type="checkbox"
        className="Checkbox-input"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
    </div>
    {error && <span className="Checkbox-error">{error}</span>}
  </div>
);
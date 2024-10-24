import './switch.css';

interface ToggleSwitchProps {
  id: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  optionLabels?: [string, string];
  small?: boolean;
  disabled?: boolean;
}

function ToggleSwitch({ id, name, checked, onChange, optionLabels = ['Yes', 'No'], small, disabled }: Readonly<ToggleSwitchProps>) {
  return (
    <div className={`toggle-switch${small ? ' small-switch' : ''}`}>
      <input
        type="checkbox"
        name={name}
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label className="toggle-switch-label" tabIndex={disabled ? -1 : 1} htmlFor={id}>
          <span
            className={disabled ? 'toggle-switch-inner toggle-switch-disabled' : 'toggle-switch-inner'}
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
            tabIndex={-1}
          />
          <span className={disabled ? 'toggle-switch-switch toggle-switch-disabled' : 'toggle-switch-switch'} tabIndex={-1} />
        </label>
      ) : null}
    </div>
  );
}

// Set optionLabels for rendering.
ToggleSwitch.defaultProps = {
  optionLabels: ['Yes', 'No'],
  name: '',
  small: false,
  disabled: false
};

export default ToggleSwitch;

import { useEffect, useState } from 'react';
import './component.css';

interface CheckboxProps {
  additionalClass?: string;
  checked: boolean;
  disabled?: boolean;
  id: string;
  label: string;
  labelAdditionalClass?: string;
  onChange: (val: boolean) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
}

export default function Checkbox({
  additionalClass = '',
  checked,
  disabled = false,
  id,
  label,
  labelAdditionalClass = '',
  onChange,
  readOnly = false,
  value = '',
  required = false
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // eslint-disable-next-line consistent-return
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !readOnly) {
      setIsChecked(event.target.checked);
      return onChange(event.target.checked);
    }
  };

  return (
    <div className="custom-checkbox flex items-center relative">
      <input
        className={`form-check-input ${additionalClass}`}
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        aria-disabled={disabled}
        aria-readonly={readOnly ? 'true' : undefined}
        aria-required={required}
      />
      <label className={`form-check-label ml-3 ${labelAdditionalClass}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

Checkbox.defaultProps = {
  disabled: false,
  readOnly: false,
  additionalClass: '',
  labelAdditionalClass: '',
  value: '',
  required: false
};

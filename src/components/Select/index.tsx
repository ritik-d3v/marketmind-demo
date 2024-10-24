import { useState, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: JSX.Element;
}

interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
  // eslint-disable-next-line react/require-default-props
  value?: string;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
}

const addIcon = '/assets/icons/add.svg';

function Select({ options, onChange, value, placeholder = 'Add Symbol' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>();

  useEffect(() => {
    if (value) {
      const initialOption = options.find((option) => option.value === value);
      setSelectedOption(initialOption);
    }
  }, [value, options]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    }
  };

  const handleSelect = (option: Option) => {
    if (!option.disabled) {
      setSelectedOption(option);
      onChange(option.value);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative z-20">
      <button
        type="button"
        className="bg-transparent border border-[#89A4B5] text-white font-normal text-md flex items-center justify-between rounded-md py-4 px-4 w-full text-left "
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        // aria-haspopup="listbox"
        aria-expanded={isOpen}>
        <span className="flex items-center pl-5">
          {selectedOption?.icon}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* <ChevronDownIcon className="w-5 h-5" /> */}
      </button>
      {isOpen && (
        <ul className="absolute z-20 w-full bg-[#234D69] text-white rounded-lg mt-3 overflow-auto" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-4 font-normal text-sm flex items-center hover:bg-gray-100 cursor-pointer ${option.disabled ? 'text-gray-400 cursor-not-allowed' : 'hover:text-gray-900'} flex justify-between items-center border-b border-[#4F7187] last:border-none`}
              //   className="flex flex-col items-center py-3.5 text-xs font-semibold leading-6 text-white bg-cyan-900 rounded-xl shadow-lg max-w-[286px]"
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(option)}
              role="option"
              aria-selected={selectedOption?.value === option.value}
              aria-disabled={option.disabled}
              tabIndex={0}>
              {option.label}
              <img loading="lazy" src={addIcon} alt="" className="shrink-0 my-auto" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;

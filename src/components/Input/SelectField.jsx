import { AlertCircle } from "lucide-react";

const SelectField = ({
  id,
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
  options,
  icon: Icon,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="size-5 text-gray-400" />
          </div>
        )}
        <select
          id={id}
          type={type}
          onChange={onChange}
          value={value}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-2 py-2 rounded-lg text-base border border-gray-50 transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-500 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } focus:outline-none focus:ring focus:ring-opacity-20 appearance-none bg-white`}
          disabled={disabled}
        >
          <option value="" className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white rounded-md text-gray-600"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="size-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && (
        <div className="flex items-center mt-2 space-x-2 text-sm text-red-500">
          <AlertCircle className="size-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;

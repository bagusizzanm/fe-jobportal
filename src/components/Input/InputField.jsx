import { AlertCircle } from "lucide-react";

const InputField = ({
  id,
  type,
  label,
  onChange,
  value,
  placeholder,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  helperText,
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="size-5 text-slate-400" />
          </div>
        )}
        <input
          id={id}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-2 py-2 rounded-lg text-base border border-slate-50 transition-colors duration-200 disabled:bg-slate-200 text-slate-500  ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          } focus:outline-none focus:ring focus:ring-opacity-20`}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <AlertCircle className="size-4 text-red-500" />
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;

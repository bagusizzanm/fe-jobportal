import React from "react";

const TextAreaField = ({
  id,
  label,
  onChange,
  value,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  row = 6,
  props,
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="id" className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={`mt-1 p-2 px-3 rounded-lg block min-h-[90px] w-full text-base transition-colors duration-300 resize-y border border-gray-50 disabled:bg-gray-50 disabled:text-gray-500 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        } focus:outline-none focus:ring focus:ring-opacity-20`}
        {...props}
        rows={row}
        disabled={disabled}
      />
      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <AlertCircle className="size-4 text-red-500" />
          <span className="text-sm text-red-500">{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default TextAreaField;

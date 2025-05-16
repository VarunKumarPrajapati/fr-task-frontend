import Radio from "./Radio";

const RadioGroup = ({
  options = [],
  name,
  value,
  onChange,
  error,
  label,
  disabled = false,
  className,
}) => {
  const renderOptions = options.map((option) => (
    <Radio
      key={option.value}
      {...option}
      checked={option.value === value}
      disabled={disabled}
      onChange={onChange}
      name={name}
    />
  ));
  return (
    <div className={className}>
      <label className="flex justify-between w-full mb-1 font-medium text-basic first-letter:uppercase">
        {label}
      </label>
      <div className="grid grid-flow-col gap-x-2">{renderOptions}</div>
      {error && (
        <p className="mt-1 text-xs text-red-500 first-letter:uppercase">
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;

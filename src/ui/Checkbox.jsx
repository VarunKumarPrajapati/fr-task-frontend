import React from "react";

export default function Checkbox({
  checked = false,
  name,
  onChange,
  label,
  className,
}) {
  const [isChecked, setIsChecked] = React.useState(checked);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange({ target: { name, value: !isChecked } });
  };
  return (
    <label
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="mr-1.5"
      />
      {label}
    </label>
  );
}

export default function Radio({
  value,
  checked,
  onChange,
  disabled,
  label,
  name,
}) {
  return (
    <label className="flex flex-row items-center cursor-pointer select-none gap-x-2 grid-span-1">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 transition-colors duration-150 border-2 border-gray-400 rounded-full appearance-none checked:border-blue-600 checked:bg-blue-600 focus:outline-none disabled:opacity-50"
      />
      <span className={`text-gray-800 ${disabled ? "opacity-50" : ""}`}>
        {label}
      </span>
    </label>
  );
}

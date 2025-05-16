import { twMerge } from "tailwind-merge";

export default function Dropdown({
  list = [],
  error,
  label,
  name,
  onChange,
  value,
  className,
  loading,
}) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="flex justify-between w-full mb-1 text-sm font-medium first-letter:uppercase"
        >
          {label}
          {error && (
            <p className="mt-1 text-xs text-red-500 first-letter:uppercase">
              {error}
            </p>
          )}
        </label>
      )}
      <select
        disabled={loading}
        value={value}
        name={name}
        onChange={(e) => {
          const selectedName = e.target.value;
          const selectedItem = list.find((item) => item.name === selectedName);
          const selectedId = selectedItem?._id;
          onChange(e, selectedId);
        }}
        className={twMerge(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700",
          error && "ring-2 ring-red-500"
        )}
      >
        {[{ name: "Select" }, ...list].map((item, key) => (
          <option key={item._id || key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

import { IInputForm } from "../utils/interface/shorten-url";

function InputForm({
  label,
  placeholder,
  icon,
  type,
  name,
  value,
  handleChange,
}: IInputForm) {
  return (
    <div className="w-full text-left">
      <div className="flex flex-row gap-2">
        <span className="text-gray-400">{icon}</span>
        <label
          htmlFor="name"
          className="block text-white text-sm font-semibold mb-2"
        >
          {label}
        </label>
      </div>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md bg-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60"
      />
    </div>
  );
}

export default InputForm;

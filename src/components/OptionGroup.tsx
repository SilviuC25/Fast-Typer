type OptionGroupProps = {
  title: string;
  options: (string | number)[];
  selected: string | number;
  onSelect: (val: any) => void;
};

export default function OptionGroup({ title, options, selected, onSelect }: OptionGroupProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="text-sm font-semibold text-gray-700">{title}:</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => {
          const isActive = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-3 py-1 rounded-full border text-sm font-semibold transition-all duration-200 cursor-pointer
                ${isActive
                  ? "border-indigo-600 text-indigo-600 bg-indigo-50 ring-2 ring-indigo-200"
                  : "border-gray-300 text-gray-700 hover:text-indigo-600 hover:border-indigo-400 hover:ring-1 hover:ring-indigo-100"
                }`}
            >
              {String(opt).toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

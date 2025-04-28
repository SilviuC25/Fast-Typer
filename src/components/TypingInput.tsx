export default function TypingInput({
    value,
    onChange,
    disabled,
  }: {
    value: string;
    onChange: (val: string) => void;
    disabled: boolean;
  }) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="mt-4 p-2 border rounded w-96 text-xl font-mono"
        placeholder="Start typing..."
      />
    );
  }
  
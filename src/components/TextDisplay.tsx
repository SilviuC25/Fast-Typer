export default function TextDisplay({ text, inputValue }: { text: string; inputValue: string }) {
    return (
      <p className="text-xl font-mono bg-white p-4 rounded shadow-md w-96">
        {text.split("").map((char, index) => {
          let className = "";
          if (index < inputValue.length) {
            className = inputValue[index] === char ? "text-green-500" : "text-red-500";
          }
          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </p>
    );
  }
  
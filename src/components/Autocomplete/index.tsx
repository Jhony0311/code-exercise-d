import { useState } from "react";

import "./styles.css";

type AutocompleteProps = {
  label: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

export function Autocomplete({ label, id, name }: AutocompleteProps) {
  const [state, setState] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);

    if (value.length > 2) {
      // search via promise
    }
  };

  return (
    <div>
      <label className="autocomplete-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="autocomplete-input"
        type="text"
        value={state}
        onChange={handleChange}
      />
    </div>
  );
}

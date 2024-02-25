import { useState } from "react";

import { api } from "../../services/api";

import "./styles.css";

type AutocompleteProps = {
  label: string;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id">;

export function Autocomplete({ label, id, name }: AutocompleteProps) {
  const [state, setState] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [results, setResult] = useState([""]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);

    if (value.length > 2) {
      setErr(null);
      try {
        // request could be abstracted as promise to be executed but coming from props
        const res = await api.get<{ results: Array<string> }>(
          `/search?name=${value}`
        );
        setResult(res.results);
      } catch (err) {
        if (err instanceof Error) {
          setErr(err.message);
          return;
        }

        setErr("There was an error on our side, try again");
      }
    } else {
      setResult([]);
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

      {err && (
        <div className="autocomplete-error">
          <small>{err}</small>
        </div>
      )}
      {err === null && (
        <div className="autocomplete-result-board">
          {results.map((r) => (
            <ResultItem query={state}>{r}</ResultItem>
          ))}
        </div>
      )}
    </div>
  );
}

export type ResultItemProps = {
  children: string;
  query: string;
};

function ResultItem({ children, query }: ResultItemProps) {
  const parts = splitStringBySubstring(children, query);

  return (
    <p className="autocomplete-result">
      {parts.map((str) =>
        str.toLowerCase() === query.toLowerCase() ? <strong>{str}</strong> : str
      )}
    </p>
  );
}

function splitStringBySubstring(str: string, substring: string) {
  // Escape special characters in the substring and create a regular expression with capturing groups
  const regex = new RegExp(
    `(${substring.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );

  // Use the split method with the regular expression
  return str.split(regex).filter((part) => part !== ""); // Filter out empty strings
}

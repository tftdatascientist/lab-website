import * as React from "react";

/**
 * Odczyt: liczba albo współrzędne w mono 30–54 px (nigdy słowa), pod spodem etykieta
 * i — gdy podana — źródło. Liczby przychodzą z treści serwisu, liczone przy buildzie
 * (dewiacja #4: liczba bez źródła to obietnica, liczba ze źródłem to dowód).
 */
export default function Odczyt({
  value,
  label,
  source,
}: {
  value: React.ReactNode;
  label: string;
  source?: string;
}) {
  return (
    <div className="readout">
      {value}
      <small>
        {label}
        {source && <> · {source}</>}
      </small>
    </div>
  );
}

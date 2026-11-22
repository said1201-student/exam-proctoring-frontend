import { forwardRef, useId } from "react";
import clsx from "clsx";

export const Input = forwardRef(function Input(
  { label, error, hint, className, id, ...rest },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ink-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full h-11 px-3 rounded-md border bg-white text-ink-900",
          "transition-colors duration-150",
          error
            ? "border-danger focus:border-danger focus:ring-2 focus:ring-red-100"
            : "border-ink-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
          "outline-none",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      {!error && hint && <p className="mt-1 text-sm text-ink-500">{hint}</p>}
    </div>
  );
});
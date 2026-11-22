import clsx from "clsx";

export function Card({ className, children, ...rest }) {
  return (
    <div
      className={clsx("bg-white rounded-lg shadow-sm border border-ink-100 p-6", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
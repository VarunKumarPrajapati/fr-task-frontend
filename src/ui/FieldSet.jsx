import React from "react";

export default function FieldSet({ children, legend, className }) {
  return (
    <fieldset className="p-6 mb-8 border rounded-lg bg-card border-border shadow-form">
      <legend className="px-2 text-lg font-medium text-text-primary">
        {legend}
      </legend>

      <div className={`grid gap-2 ${className}`}>{children}</div>
    </fieldset>
  );
}

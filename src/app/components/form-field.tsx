"use client";

import { useFormContext, Controller } from "react-hook-form";

export function FormField({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required ? "Obrigatório" : false }}
      render={({ field, fieldState }) => (
        <div className="sm:col-span-1">
          <label
            htmlFor={name}
            className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
          >
            {label}
            {required ? " *" : ""}
          </label>
          <input
            {...field}
            id={name}
            type={type}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 dark:border-neutral-600 dark:bg-neutral-900 dark:text-white"
          />
          {fieldState.error ? (
            <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
          ) : null}
        </div>
      )}
    />
  );
}

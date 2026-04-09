"use client";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { FormField } from "./form-field";

const BR_STATES = [
  { uf: "SP", name: "São Paulo" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "PR", name: "Paraná" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "BA", name: "Bahia" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
] as const;

export type AddressFormValues = {
  firstName: string;
  lastName: string;
  address1: string;
  email: string;
  city: string;
  zip: string;
  state: string;
};

export function AddressForm({
  onSubmit,
}: {
  onSubmit: (data: AddressFormValues) => void;
}) {
  const methods = useForm<AddressFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      email: "",
      city: "",
      zip: "",
      state: "SP",
    },
  });

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Endereço de entrega
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField name="firstName" label="Nome" required />
            <FormField name="lastName" label="Sobrenome" required />
            <FormField name="address1" label="Endereço" required />
            <FormField name="email" label="Email" type="email" required />
            <FormField name="city" label="Cidade" required />
            <FormField name="zip" label="CEP" required />
            <div className="sm:col-span-2">
              <label
                htmlFor="state"
                className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Estado
              </label>
              <select
                id="state"
                {...methods.register("state")}
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
              >
                {BR_STATES.map((s) => (
                  <option key={s.uf} value={s.uf}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row">
            <Link
              href="/cart"
              className="rounded-lg border border-neutral-400 px-6 py-3 text-center font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Voltar para o Carrinho
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
            >
              Continuar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

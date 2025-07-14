"use client";
import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const RHFProvider = ({ children }: PropsWithChildren) => {
  const methods = useForm<{ seats: string[] }>({});
  return <FormProvider {...methods}>{children}</FormProvider>;
};

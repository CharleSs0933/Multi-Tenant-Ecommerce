import { parseAsBoolean, useQueryStates } from "nuqs";

export const useCheckoutStates = () => {
  return useQueryStates({
    success: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: false,
    }),
    cancel: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: false,
    }),
  });
};

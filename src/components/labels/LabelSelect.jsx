import { useFormContext } from "react-hook-form";
import {
  FormLabel,
  FormErrorMessage,
  FormControl,
  Select,
} from "@chakra-ui/react";

export default function LabelSelect({
  label,
  name,
  list,
  validationRules,
  ...rest
}) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const hasError = name in errors;
  return (
    <>
      <FormControl isRequired>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <Select
          focusBorderColor="pink.400"
          {...register(name, validationRules)}
          id={name}
          disabled={isSubmitting}
          {...rest}
        >
          <option defaultChecked value="">
            Select an option
          </option>
          {list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        {hasError ? (
          <FormErrorMessage>{errors[name].message}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}

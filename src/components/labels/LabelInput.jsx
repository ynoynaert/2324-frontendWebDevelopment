import { useFormContext } from "react-hook-form";
import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function LabelInput({
  label,
  name,
  type,
  placeholder,
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
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <Input
          focusBorderColor="orange.400"
          placeholder={placeholder}
          {...register(name, validationRules)}
          id={name}
          type={type}
          disabled={isSubmitting}
          {...rest}
          width="400px"
          mb="2"
        />
        {hasError ? (
          <FormErrorMessage>{errors[name].message}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}

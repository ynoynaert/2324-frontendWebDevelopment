import { useCallback, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import LabelInput from "../labels/LabelInput";
import { Button } from "@chakra-ui/react";
import Error from "../Error";

export default function UserForm({ user }) {
  const { trigger: saveUser, error: saveError } = useSWRMutation("users", save);

  const navigate = useNavigate();
  const methods = useForm();
  const { getValues, handleSubmit, reset, setValue, isSubmitting } = methods;

  const validationRules = useMemo(
    () => ({
      userName: {
        required: "Name is required",
      },
      userEmail: {
        required: "Email is required",
      },
      password: {
        required: "Password is required",
      },
      confirmPassword: {
        required: "Password confirmation is required",
        validate: (value) => {
          const password = getValues("password");
          return password === value || "Passwords do not match";
        },
      },
    }),
    [getValues],
  );

  const onSubmit = useCallback(
    async (data) => {
      const { userName, userEmail, userPassword } = data;
      await saveUser({
        naam: userName,
        email: userEmail,
        wachtwoord: userPassword,
        id: user?.userID,
      });
      navigate("/collection");
      reset();
    },
    [saveUser, navigate, reset, user?.userID],
  );

  useEffect(() => {
    if (
      // check on non-empty object
      user &&
      (Object.keys(user).length !== 0 || user.constructor !== Object)
    ) {
      setValue("userName", user.name);
      setValue("userEmail", user.email);
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  return (
    <>
      <FormProvider {...methods}>
        <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
          <LabelInput
            name="userName"
            label="Name"
            validationRules={validationRules.userName}
          />
          <LabelInput
            name="userEmail"
            label="Email"
            validationRules={validationRules.userEmail}
          />
          <LabelInput
            name="password"
            label="New password"
            validationRules={validationRules.userPassword}
          />
          <LabelInput
            name="confirmPassword"
            label="Confirm password"
            validationRules={validationRules.confirmPassword}
          />
          <Button disabled={isSubmitting} type="submit" colorScheme="pink">
            Edit user
          </Button>
          {saveError && <Error error={saveError} />}
        </form>
      </FormProvider>
    </>
  );
}

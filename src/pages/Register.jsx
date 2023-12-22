import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/labels/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Button, Center, Heading } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import { save } from "../api";

export default function Register({ user }) {
  const { trigger: saveUser, error: saveError } = useSWRMutation("users", save);
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset, setValue } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ name, email, password }) => {
      let loggedIn = false;
      if (user?.id) {
        await saveUser({
          id: user?.id,
          name: name,
          email: email,
          password: password,
        });
        loggedIn = true;
      } else {
        await register({
          name: name,
          email: email,
          password: password,
        });
        loggedIn = true;
      }
      if (loggedIn) {
        navigate({
          pathname: "/collection",
          replace: true,
        });
      }
    },
    [user, register, saveUser, navigate],
  );

  useEffect(() => {
    if (
      // check on non-empty object
      user &&
      (Object.keys(user).length !== 0 || user.constructor !== Object)
    ) {
      setValue("name", user.name);
      setValue("email", user.email);
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const validationRules = useMemo(
    () => ({
      name: {
        required: "Name is required",
      },
      email: {
        required: "Email is required",
      },
      password: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must have at least 8 characters",
        },
        maxLength: {
          value: 30,
          message: "Password must have less than 30 characters",
        },
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

  return (
    <>
      <Error error={error || saveError} />
      <Center>
        <Heading>{user ? "Save" : "Register"} user</Heading>
      </Center>
      <Center>
        <FormProvider {...methods}>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(handleRegister)}
          >            
            <div className="mb-3">
              <LabelInput
                name="name"
                label="Name"
                validationRules={validationRules.name}
              />
            </div>
            <div className="mb-3">
              <LabelInput
                name="email"
                label="Email"
                validationRules={validationRules.email}
              />
            </div>
            <div className="mb-3">
              <LabelInput
                name="password"
                label="Password"
                type="password"
                validationRules={validationRules.password}
              />
            </div>
            <div className="mb-3">
              <LabelInput
                name="confirmPassword"
                label="Confirm password"
                type="password"
                validationRules={validationRules.confirmPassword}
              />
            </div>
            <div className="d-flex justify-content-between">
              <Button type="submit" colorScheme="pink" isLoading={loading} mr={2}>
                {user ? "Save" : "Register"}
              </Button>
              <Button type="button" colorScheme="gray" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </FormProvider>
      </Center>
    </>
  );
}

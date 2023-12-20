import { useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/labels/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Button, Center } from "@chakra-ui/react";

const validationRules = {
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm();
  //   {
  //   defaultValues: {
  //     email: "youna.noynaert@telenet.be",
  //     password: "12345678",
  //   },
  // }

  const { handleSubmit, reset } = methods;
  const handleCancel = useCallback(() => reset(), [reset]);
  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect],
  );

  return (
    <Center>
      <FormProvider {...methods}>
        <div>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Error error={error} />

            <LabelInput
              label="EMAIL"
              type="text"
              name="email"
              placeholder="your@email.com"
              data-cy="email_input"
              validationRules={validationRules.email}
            />

            <LabelInput
              label="PASSWORD"
              type="password"
              name="password"
              data-cy="password_input"
              validationRules={validationRules.password}
            />

            <div>
              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  colorScheme="pink"
                  data-cy="submit_btn"
                >
                  Sign in
                </Button>

                <Button
                  onClick={handleCancel}
                  colorScheme="pink"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </Center>
  );
}

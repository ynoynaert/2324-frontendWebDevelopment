import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import LabelInput from "../labels/LabelInput";
import { Button, Heading, Box, Center } from "@chakra-ui/react";
import Error from "../Error";

const validationRules = {
  collectionName: { required: "Name is required" },
};

export default function CollectionForm({ collection }) {
  const { trigger: saveCollection, error: saveError } = useSWRMutation(
    "collections",
    save,
  );

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset, setValue, isSubmitting } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const { collectionName } = data;
      try {
        await saveCollection({
          name: collectionName,
          id: collection?.id,
        });
        navigate("/collection");
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [saveCollection, navigate, reset, collection?.id],
  );

  useEffect(() => {
    if (
      // check on non-empty object
      collection &&
      (Object.keys(collection).length !== 0 ||
        collection.constructor !== Object)
    ) {
      setValue("collectionName", collection.name);
    } else {
      reset();
    }
  }, [collection, setValue, reset]);

  return (
    <>
      <Error error={saveError} />
      <Box padding="30px">
        <Center>
          <Heading>{collection.id ? "Save" : "Add"} a collection</Heading>
        </Center>
        <Center>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* labelinput en button scheiden */}

              <LabelInput
                label="Name"
                name="collectionName"
                type="Input"
                validationRules={validationRules.collectionName}
                data-cy="collection_name_input"
              />
              <Button
                colorScheme="pink"
                type="submit"
                disabled={isSubmitting}
                data-cy="submit_save_collection"
              >
                {collection?.id ? "Save" : "Add"} collection
              </Button>
            </form>
          </FormProvider>
        </Center>
      </Box>
    </>
  );
}

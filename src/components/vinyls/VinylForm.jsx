import { useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import LabelInput from "../labels/LabelInput";
import LabelSelect from "../labels/LabelSelect";
import { Box, Button, Heading, Center } from "@chakra-ui/react";
import Error from "../Error";

const validationRules = {
  vinylArtist: { required: "Artist is required" },
  vinylAlbum: { required: "Album is required" },
  vinylColor: { required: "Color is required" },
  vinylImageUrl: { required: "Image is required" },
};

export default function VinylForm({ filteredCollecties, vinyl }) {
  const { trigger: saveVinyl, error: saveError } = useSWRMutation(
    "vinyls",
    save,
  );

  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, reset, setValue, isSubmitting } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const {
        vinylArtist,
        vinylAlbum,
        vinylColor,
        vinylCollection,
        vinylImageUrl,
      } = data;
      try {
        await saveVinyl({
          artiest: vinylArtist,
          album: vinylAlbum,
          kleur: vinylColor,
          collectieID: parseInt(vinylCollection),
          plaatImageURL: vinylImageUrl,
          id: vinyl?.plaatID,
        });
        navigate("/collection");
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    [saveVinyl, navigate, reset, vinyl?.plaatID],
  );

  useEffect(() => {
    if (
      // check on non-empty object
      vinyl &&
      (Object.keys(vinyl).length !== 0 || vinyl.constructor !== Object)
    ) {
      setValue("vinylArtist", vinyl.artiest);
      setValue("vinylAlbum", vinyl.album);
      setValue("vinylColor", vinyl.kleur);
      setValue("vinylCollection", vinyl.collectieID);
      setValue("vinylImageUrl", vinyl.plaatImageURL);
    } else {
      reset();
    }
  }, [vinyl, setValue, reset]);

  return (
    <>
    <Error error={saveError} />
      <Box padding="30px">
        <Center>
          <Heading>{vinyl?.plaatID ? "Save" : "Add"} a vinyl</Heading>
        </Center>
        <Center>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* labelinput en button scheiden */}

              <LabelInput
                label="Artist"
                name="vinylArtist"
                type="Input"
                validationRules={validationRules.vinylArtist}
                data-cy="vinyl_artist_input"
              />
              <LabelInput
                label="Album"
                name="vinylAlbum"
                type="Input"
                validationRules={validationRules.vinylAlbum}
                data-cy="vinyl_album_input"
              />
              <LabelInput
                label="Color"
                name="vinylColor"
                type="Input"
                validationRules={validationRules.vinylColor}
                data-cy="vinyl_color_input"
              />
              <LabelSelect
                label="Collection"
                name="vinylCollection"
                list={filteredCollecties}
                validationRules={validationRules.vinylCollection}
                data-cy="vinyl_collection_select"
              />
              <LabelInput
                label="PictureUrl "
                name="vinylImageUrl"
                type="url"
                validationRules={validationRules.vinylImageUrl}
                data-cy="vinyl_image_url_input"
              />
              <Button
                colorScheme="pink"
                type="submit"
                disabled={isSubmitting}
                data-cy="submit_save_vinyl"
              >
                {vinyl?.plaatID ? "Save" : "Add"} vinyl
              </Button>
            </form>
          </FormProvider>
        </Center>
      </Box>
    </>
  );
}

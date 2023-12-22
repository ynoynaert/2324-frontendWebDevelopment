import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteById, getAll} from "../../api";
import { SimpleGrid } from "@chakra-ui/react";
import VinylCards from "../../components/vinyls/VinylCards";
import AsyncData from "../../components/AsyncData";

export default function Allvinyls() {
  const {
    data: vinyls = {},
    isLoading,
    error,
  } = useSWR("vinyls", getAll);
  
  const { trigger: deleteVinyl, error: deleteError } = useSWRMutation(
    "vinyls",
    deleteById,
  );

  return (
    <>
      <AsyncData loading={isLoading} error={error || deleteError}>
        <SimpleGrid
          className="vinyl-list"
          columns={{ base: 1, md: 1, lg: 3 }}
          spacing={4}
          justifyContent="center"
          padding="4"
        >
          <VinylCards
            vinyls={vinyls}
            onDelete={deleteVinyl}
          />
        </SimpleGrid>
      </AsyncData>
    </>
  );
}
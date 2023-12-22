import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { deleteById, getAll} from "../../api";
import Vinyl from "../../components/vinyls/Vinyl";
import { SimpleGrid } from "@chakra-ui/react";
import AsyncData from "../../components/AsyncData";

export default function PlaatList({ colID, onEdit }) {
  const { data: vinyls = [], 
    isLoading, 
    error, 
    mutate: mutateVinyls } = useSWR(`vinyls/collection/${colID}`, getAll);
  const { trigger: deleteVinyl, error: deleteError } = useSWRMutation(
    "vinyls",
    deleteById,
    { 
      onSuccess: () => {
        mutateVinyls();
      },
    },
  );

  return (
    <>
      <AsyncData error={error || deleteError} loading={isLoading}>
        {vinyls.length === 0 ? (
          <div className="alert alert-info">
            There are no vinyls in this collection yet.
          </div>
        ) : (
          <SimpleGrid
            spacing={4}
            justifyContent="center"
          >
            {vinyls.map((vinyl) => (
              <Vinyl
                key={vinyl.plaatID}
                {...vinyl}
                onDelete={deleteVinyl}
                onEdit={onEdit}
              />
            ))}
          </SimpleGrid>
        )}
      </AsyncData>
    </>
  );
}

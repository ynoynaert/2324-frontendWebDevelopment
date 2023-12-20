import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import Vinyl from "../../components/vinyls/Vinyl";
import { SimpleGrid } from "@chakra-ui/react";
import AsyncData from "../../components/AsyncData";

export default function PlaatList({ colID, onEdit }) {
  const { data: vinyls = [], isLoading, error } = useSWR("vinyls", getAll);
  const { trigger: deleteVinyl, error: deleteError } = useSWRMutation(
    "vinyls",
    deleteById,
  );
  const filteredVinyls = vinyls.filter((vinyl) => vinyl.collectieID === colID);

  return (
    <>
      <AsyncData error={error || deleteError} loading={isLoading}>
        {filteredVinyls.length === 0 ? (
          <div className="alert alert-info">
            There are no vinyls in this collection yet.
          </div>
        ) : (
          <SimpleGrid
            spacing={4}
            justifyContent="center"
          >
            {filteredVinyls.map((vinyl) => (
              <Vinyl
                key={vinyl.id}
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

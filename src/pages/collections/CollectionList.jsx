import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import { SimpleGrid } from "@chakra-ui/react";
import CollectionCards from "../../components/collections/CollectionCards";
import AsyncData from "../../components/AsyncData";

const CollectionList = () => {
  const currentUser = localStorage.getItem("userID");
  const {
    data: collecties = [],
    isLoading,
    error,
  } = useSWR("collections", getAll);

    const { trigger: deleteCollection, error: deleteError } = useSWRMutation(
    "collections",
    deleteById,
  );

  return (
    <>
      <AsyncData loading={isLoading} error={error || deleteError}>
        {collecties.length === 0 ? (
          <div className="alert alert-info">
            There are no collections yet.
          </div>
        ) : (
          <SimpleGrid
            className="collectie-list"
            columns={{ base: 1, md: 1, lg: 3 }}
            spacing={4}
            justifyContent="center"
            padding="4"
          >
          <CollectionCards
            filteredCollecties={collecties}
            currentUser={currentUser}
            onDelete={deleteCollection}
          />
          </SimpleGrid>
        )}
      </AsyncData>
    </>
  );
};

export default CollectionList;

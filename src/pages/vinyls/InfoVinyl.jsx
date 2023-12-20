import useSWR from "swr";
import { getById } from "../../api";
import { useParams } from "react-router-dom";
import "../../index.css";
import AsyncData from "../../components/AsyncData";
import VinylInfo from "../../components/vinyls/Vinyllnfo";

export default function InfoVinyl() {
  const { id } = useParams();

  const {
    data: vinyl = {},
    error: vinylError,
    isLoading: vinylLoading,
  } = useSWR(`vinyls/${id}`, getById);
  const {
    data: collection = {},
    error: collectionError,
    isLoading: collectionLoading,
  } = useSWR(vinyl.collectieID ? `collections/${vinyl.collectieID}` : null, getById);

  return (
    <>
      <AsyncData
        error={vinylError || collectionError}
        loading={vinylLoading || collectionLoading}
      >
        <VinylInfo vinyl={vinyl} collection={collection} />
      </AsyncData>
    </>
  );
}

import useSWR from "swr";
import { getById } from "../../api";
import { useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
  
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/collection";
  }, [search]);

  return (
    <>
      <AsyncData
        error={vinylError || collectionError}
        loading={vinylLoading || collectionLoading}
      >
        <VinylInfo vinyl={vinyl} collection={collection} redirect={redirect} navigate={navigate}/>
      </AsyncData>
    </>
  );
}

import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById, getAll } from '../../api';
import VinylForm from '../../components/vinyls/VinylForm';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditVinyl() {
  const { id } = useParams();

  const {
    data: vinyl = {},
    error: vinylError,
    isLoading: vinylLoading,
  } = useSWR(id ? `vinyls/${id}` : null, getById);

  const {
    data: collection = {},
    error: collectionError,
    isLoading: collectionLoading,
  } = useSWR('collections', getAll);

  return (
    <>
      <AsyncData
        error={vinylError || collectionError}
        loading={vinylLoading || collectionLoading}
      >
        <VinylForm
          filteredCollecties={collection}
          vinyl={vinyl}
        />
      </AsyncData>
    </>
  );
}
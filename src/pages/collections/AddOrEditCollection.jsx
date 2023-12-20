import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getById } from '../../api';
import CollectionForm from '../../components/collections/CollectionForm';
import AsyncData from '../../components/AsyncData';

export default function AddOrEditcollection() {
  const { id } = useParams();

  const {
    data: collection = {},
    error: collectionError,
    isLoading: collectionLoading,
  } = useSWR(id ? `collections/${id}` : null, getById);

  return (
    <>
      <AsyncData
        error={collectionError || collectionError}
        loading={collectionLoading || collectionLoading}
      >
        <CollectionForm
          collection={collection}
        />
      </AsyncData>
    </>
  );
}
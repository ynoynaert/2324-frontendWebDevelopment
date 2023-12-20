import Loader from './Loader.jsx';
import Error from './Error';

export default function AsyncData({
  loading,
  error,
  children,
}) {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
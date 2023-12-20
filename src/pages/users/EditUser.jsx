import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import Register from '../Register';


export default function EditUser() {
  const userID = localStorage.getItem("userID");

  const {
    data: user = {},
    error: userError,
    isLoading: userLoading,
  } = useSWR(`users/${userID}`, getById);

  return (
    <>
      <AsyncData
        error={userError}
        loading={userLoading}
      >
        <Register
          user={user}
        />
      </AsyncData>
    </>
  );
}

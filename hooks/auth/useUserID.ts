import { useAuth } from "./useAuth";

const useUserID = () => {
  const { userDetails } = useAuth();

  return userDetails ? userDetails.id : null;
};

export default useUserID;

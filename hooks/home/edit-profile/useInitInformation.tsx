import { useAuth } from "@/hooks/auth/useAuth";
import useEditInformationStore from "./useEditInformation";
import { useEffect } from "react";

const useInitInformation = () => {
  const {
    setFirstName,
    setLastName,
    setGender,
    setBio,
    setDob,
    setAcademic,
    setSchool,
    setCountry,
    setJob,
  } = useEditInformationStore();

  const { userDetails } = useAuth();

  useEffect(() => {
    if (userDetails) {
      if (userDetails.first_name) setFirstName(userDetails.first_name);
      if (userDetails.last_name) setLastName(userDetails.last_name);
      if (userDetails.gender) setGender(userDetails.gender);
      if (userDetails.bio) setBio(userDetails.bio);
      if (userDetails.dob) setDob(userDetails.dob);
      if (userDetails.academics) setAcademic(userDetails.academics);
      if (userDetails.school) setSchool(userDetails.school);
      if (userDetails.country) setCountry(userDetails.country);
      if (userDetails.job) setJob(userDetails.job);
    }
  }, [userDetails]);
};

export default useInitInformation;

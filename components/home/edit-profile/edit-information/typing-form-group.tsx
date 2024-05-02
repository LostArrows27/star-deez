import { useAuth } from "@/hooks/auth/useAuth";
import useEditInformationStore from "@/hooks/home/edit-profile/useEditInformation";
import TypingForm from "./typing-form";
import { View } from "react-native";

const TypingFormGroup = () => {
  const { setFirstName, setLastName, setBio } = useEditInformationStore();

  const { userDetails } = useAuth();

  return (
    <>
      <View className="flex-row items-center gap-4">
        <TypingForm
          defaultValue={userDetails?.first_name}
          placeholder="Enter first name..."
          setValue={setFirstName}
          title="First Name"
        />
        <TypingForm
          defaultValue={userDetails?.last_name}
          placeholder="Enter last name"
          setValue={setLastName}
          title="Last Name"
        />
      </View>
      <TypingForm
        defaultValue={userDetails?.bio || ""}
        placeholder="Enter your bio..."
        setValue={setBio}
        title="Bio"
        type="textarea"
      />
    </>
  );
};

export default TypingFormGroup;

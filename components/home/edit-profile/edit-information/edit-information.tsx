import { ScrollView, View } from "react-native";
import InformationForm from "./information-form";
import useInitInformation from "@/hooks/home/edit-profile/useInitInformation";
import SubmitButton from "./submit-button";

const EditInformation = () => {
  return (
    <View className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} className=" w-full">
        <InformationForm />
      </ScrollView>
      <SubmitButton />
    </View>
  );
};

export default EditInformation;

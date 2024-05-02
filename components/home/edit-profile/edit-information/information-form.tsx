import { View, Text } from "react-native";
import TypingFormGroup from "./typing-form-group";
import { SelectTama } from "@/components/ui/select";
import useEditInformationStore from "@/hooks/home/edit-profile/useEditInformation";
import { useAuth } from "@/hooks/auth/useAuth";
import { genderSelect } from "@/constants/Gender";
import DateTimePicker from "@/components/ui/date-picker";
import { Input, XStack } from "tamagui";
import { format } from "date-fns";
import { Calendar } from "@tamagui/lucide-icons";
import SelectCountry from "./select-country";
import { academicStatus } from "@/constants/Academic";
import SelectSchool from "./select-school";
import SelectJob from "./select-job";

const InformationForm = () => {
  const { setGender, setDob, editInformation, setAcademic } =
    useEditInformationStore((state) => {
      return {
        setGender: state.setGender,
        setDob: state.setDob,
        editInformation: state.editInformation,
        setAcademic: state.setAcademic,
      };
    });

  const { userDetails } = useAuth();

  return (
    <View className="rounded-xl gap-5 p-4 py-6 pb-8 mx-4 mt-4 mb-10 border-2 border-green-500">
      <TypingFormGroup />
      <View className="flex-1 gap-3">
        <Text>Gender</Text>

        <SelectTama
          outline
          setVal={setGender as any}
          val={editInformation?.gender || ""}
          items={genderSelect}
        />
      </View>
      <View className="flex-1 gap-3">
        <Text>Date of Birth</Text>
        <DateTimePicker
          type="date"
          accentColor="green"
          textColor="green"
          onConfirm={(date) => {
            setDob(date.toISOString());
          }}
          date={
            new Date(
              editInformation.dob !== ""
                ? editInformation.dob
                : userDetails?.dob!
            )
          }
          buttonTextColorIOS="green"
        >
          <XStack alignItems={"center"} justifyContent="flex-end">
            <Input
              bg="$colorTransparent"
              pointerEvents="none"
              placeholder={"Date of Birth"}
              editable={false}
              flexGrow={1}
            >
              {format(
                new Date(
                  editInformation.dob !== ""
                    ? editInformation.dob
                    : userDetails?.dob!
                ),
                "dd/MM/yyyy"
              )}
            </Input>
            <XStack paddingRight={10} position="absolute">
              <Calendar />
            </XStack>
          </XStack>
        </DateTimePicker>
      </View>
      <SelectCountry />
      <View className="flex-1 gap-3">
        <Text>Academic</Text>

        <SelectTama
          outline
          normal
          placeholder="Select academic status"
          setVal={setAcademic as any}
          val={"University/college"}
          items={academicStatus}
        />
      </View>
      <View className="flex-1 gap-3">
        <Text>School</Text>
        <SelectSchool />
      </View>
      <View className="flex-1 gap-3">
        <Text>Job</Text>
        <SelectJob />
      </View>
    </View>
  );
};

export default InformationForm;

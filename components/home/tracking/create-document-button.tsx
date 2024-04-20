import { Button } from "tamagui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text } from "react-native";

const CreateDocumentButton = () => {
  return (
    <View
      style={{
        marginHorizontal: 40,
        marginVertical: 10,
        marginBottom: 30,
      }}
    >
      <Link asChild href={"/(modal)/tracking/create-document"}>
        <Button
          pressStyle={{
            backgroundColor: "$green2Light",
          }}
          gap="$-0"
          chromeless
        >
          <MaterialCommunityIcons
            name="book-plus-multiple-outline"
            size={24}
            color="rgb(16,185,129)"
          />
          <Text className="text-emerald-500 font-bold">
            Create new document
          </Text>
        </Button>
      </Link>
    </View>
  );
};

export default CreateDocumentButton;

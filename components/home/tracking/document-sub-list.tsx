import { CategorizedDocument } from "@/types/home/tracking-type";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DocumentItem from "./document-item";
import { FlatList } from "react-native";

const DocumentSubList = ({
  data,
  color,
}: {
  data: CategorizedDocument;
  color: string;
}) => {
  return (
    <View className="gap-5 mb-4">
      <View className="flex-row items-center gap-3">
        <MaterialCommunityIcons
          name="bookmark-multiple"
          size={24}
          color={color}
        />
        <Text className=" text-2xl font-semibold">{data.name}</Text>
      </View>
      <FlatList
        horizontal
        initialNumToRender={2}
        removeClippedSubviews={true}
        scrollEnabled={data.documents.length > 2}
        data={data.documents}
        renderItem={(data) => <DocumentItem document={data.item} />}
      />
    </View>
  );
};

export default DocumentSubList;

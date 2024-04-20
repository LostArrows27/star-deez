import { CategorizedDocument } from "@/types/home/tracking-type";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DocumentItem from "./document-item";
import { FlatList } from "react-native";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";

const DocumentSubList = ({
  data,
  color,
  selectable = false,
  onCloseSelections,
}: {
  data: CategorizedDocument;
  color: string;
  selectable?: boolean;
  onCloseSelections?: () => void;
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
        scrollEnabled={data.documents.length > 2}
        data={data.documents}
        renderItem={(data) => (
          <DocumentItem
            document={data.item}
            selectable={selectable}
            onCloseSelections={onCloseSelections}
          />
        )}
      />
    </View>
  );
};

export default DocumentSubList;

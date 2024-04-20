import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { SelectStatus } from "@/components/home/tracking/select-status";

import DocumentList from "@/components/home/tracking/document-list";
import CreateDocumentButton from "@/components/home/tracking/create-document-button";

const Page = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-col flex-1 h-full p-4 pt-2"
    >
      <Stack.Screen />
      <SelectStatus />
      <CreateDocumentButton />
      <DocumentList />
    </ScrollView>
  );
};

export default Page;

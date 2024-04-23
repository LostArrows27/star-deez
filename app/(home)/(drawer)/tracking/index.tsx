import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SelectStatus } from "@/components/home/tracking/select-status";

import DocumentList from "@/components/home/tracking/document-list";
import CreateDocumentButton from "@/components/home/tracking/create-document-button";

import CreateStudyRecordBtn from "@/components/home/tracking/create-study-record-btn";

const Page = () => {
  return (
    <View className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative flex-col flex-1 h-screen p-4 pt-2"
      >
        <Stack.Screen />
        <SelectStatus />
        <CreateDocumentButton />
        <DocumentList />
      </ScrollView>
      <CreateStudyRecordBtn />
    </View>
  );
};

export default Page;

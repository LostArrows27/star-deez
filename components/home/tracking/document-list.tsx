import useUserID from "@/hooks/auth/useUserID";
import { useFilterStatus } from "@/hooks/home/tracking/useFilterStatus";
import { supabase } from "@/lib/supabase";
import { CategorizedDocument } from "@/types/home/tracking-type";
import { StudyingStatus } from "@/types/supabase-util-types";
import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { H3, ScrollView, Spinner } from "tamagui";
import DocumentSubList from "./document-sub-list";

import randomColor from "randomcolor";
import { useCategorizedDocuments } from "@/hooks/useCategorizedDocuments";
import { Image } from "expo-image";
import StyledText from "@/components/styled-text";

const DocumentList = () => {
  const id = useUserID();

  const [loading, setLoading] = useState(true);

  const { categorizedDocument, setCategorizeDocument, colors, setColors } =
    useCategorizedDocuments();

  const { status } = useFilterStatus();

  const getDocumentByStatus = async (status: StudyingStatus | "all") => {
    if (!id) return;

    setLoading(true);

    const getDocumentData =
      status === "all"
        ? supabase
            .from("category")
            .select("*, documents:document(*, unit(*), category(*))")
            .eq("user_id", id)
        : supabase
            .from("category")
            .select("*, documents:document(*, unit(*), category(*))")
            .eq("user_id", id)
            .eq("document.status", status);

    const { data, error } = await getDocumentData.returns<
      CategorizedDocument[]
    >();

    if (!error && data) {
      const randColor = data.map(() =>
        randomColor({
          luminosity: "dark",
        })
      );
      setColors(randColor);
      setCategorizeDocument(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    // initial load
    if (id && !status) getDocumentByStatus("learning");

    if (id && status) getDocumentByStatus(status);
  }, [status, id]);

  return (
    <View className="w-full pb-[40px]">
      {loading ? (
        <View className=" center h-full">
          <Spinner scale={1.2} mb={80} size="large" color="$green10" />
        </View>
      ) : categorizedDocument.length > 0 ? (
        <View className="gap-y-5">
          {categorizedDocument.map((item, index) => {
            if (!item.documents || item.documents.length === 0) return;
            return (
              <DocumentSubList
                color={colors[index]}
                key={item.id}
                data={item}
              />
            );
          })}
        </View>
      ) : (
        <View className="items-center h-full">
          <Image
            autoplay
            style={{
              width: 261 / 1.5,
              height: 190 / 1.5,
              marginTop: 50,
            }}
            contentFit="cover"
            source={require("@/assets/images/tracking/cat_book.png")}
          />
          <H3 mt="$4" textTransform="uppercase" color={"$color8"}>
            No document yet
          </H3>
          <StyledText
            lineHeight={"$5"}
            color={"$gray10Light"}
            textAlign="center"
            mt="$3"
          >
            Try creating new document to record your learning progress
          </StyledText>
        </View>
      )}
    </View>
  );
};

export default DocumentList;

import useUserID from "@/hooks/auth/useUserID";
import { useFilterStatus } from "@/hooks/home/tracking/useFilterStatus";
import { supabase } from "@/lib/supabase";
import { CategorizedDocument } from "@/types/home/tracking-type";
import { StudyingStatus } from "@/types/supabase-util-types";
import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ScrollView, Spinner } from "tamagui";
import DocumentSubList from "./document-sub-list";

import randomColor from "randomcolor";

const DocumentList = () => {
  const id = useUserID();

  const [loading, setLoading] = useState(true);

  const [categorizedDocument, setCategorizeDocument] = useState<
    CategorizedDocument[]
  >([]);

  const [colors, setColors] = useState<string[]>([]);

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
      ) : (
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
      )}
    </View>
  );
};

export default DocumentList;

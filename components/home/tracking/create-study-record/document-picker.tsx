import { View, Text } from "react-native";
import React, { useState } from "react";

export default function DocumentPicker() {
  const [document, setDocument] = useState(null);
  const [allDocuments, setAllDocuments] = useState([]);
  return (
    <View>
      <Text>DocumentPicker</Text>
    </View>
  );
}

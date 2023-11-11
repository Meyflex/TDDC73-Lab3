import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

interface Item {
  label: string;
  value: string;
}

interface LanguagePickerProps {
  setLanguage: any;
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({ setLanguage }) => {
  const [listVisible, setListVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("Top Overall");

  const data: Item[] = [
    { label: "Top Overall", value: "" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Go", value: "go" },
    { label: "Rust", value: "rust" },
    { label: "Swift", value: "swift" },
    { label: "Web", value: "web" },
    { label: "PHP", value: "php" },
    { label: "CSS", value: "css" },
    { label: "C", value: "c" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
    { label: "Python", value: "python" },
    { label: "Ruby", value: "ruby" },
    { label: "Java", value: "java" },
  ];

  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressedItem]}
      onPress={() => {
        setSelectedValue(item.label);
        setLanguage(item.value);
        setListVisible(false);
      }}
    >
      <Text>
        {item.label === selectedValue
          ? `✔ ${item.label}`
          : `     ${item.label}`}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setListVisible(true)}
      >
        <Text style={styles.buttonText}>Language</Text>
        <Text style={styles.buttonSelected}>{selectedValue}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={listVisible}
        onRequestClose={() => setListVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.value}
            style={styles.list}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8497a3",
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 5,
  },
  buttonSelected: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
  modalContainer: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  list: {
    maxHeight: 150,
    width: "90%",
  },
  item: {
    padding: 4,
    backgroundColor: "white",
  },
  pressedItem: {
    backgroundColor: "#eee",
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default LanguagePicker;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { formatDate } from "../util";

type DetailsRouteProp = RouteProp<RootStackParamList, "Details">;

type Props = {
  route: DetailsRouteProp;
  navigation: any;
};

const Details: React.FC<Props> = ({ route, navigation }) => {
  const { repository } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.repoInfos}>
        <Text style={styles.title}>{repository.name}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <View style={styles.propContainer}>
          <Text style={styles.prop}>License</Text>
          <Text style={styles.prop}>
            {repository.license ? repository.license.name : "None"}
          </Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.prop}>Watchers Count</Text>
          <Text style={styles.prop}>{repository.watchers_count}</Text>
        </View>
        <View style={styles.propContainer}>
          <Text style={styles.prop}>Created At</Text>
          <Text style={styles.prop}>{formatDate(repository.created_at)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backButton}>BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  repoInfos: {
    width: "100%",
    justifyContent: "flex-start",
    paddingTop: 64,
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#737373",
  },
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "#737373",
    marginVertical: 32,
  },
  propContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  prop: {
    textAlign: "center",
    flex: 1,
    color: "#737373",
    fontSize: 16,
  },
  backButton: {
    width: "20%",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#d7d7d7",
    fontWeight: "600",
    color: "#171717",
  },
  // Additional styles here
});

export default Details;

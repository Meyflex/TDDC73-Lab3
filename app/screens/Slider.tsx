import React, { useEffect, useState } from "react";
import {
    FlatList,
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import axios from "axios";
import { Repository, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import LanguagePicker from "../components/languagePicker";

export default function Slider() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [page, setPage] = useState<number>(1);
    const [language, setLanguage] = useState<string>("");
    const navigation =
        useNavigation<StackNavigationProp<RootStackParamList, "Home">>();

    const getPostsData = (perPage: string, page: string, language: string) => {
        let languageStr = language === "" ? "" : `+language:${language}`;
        axios
            .get(
                `https://api.github.com/search/repositories?q=stars:>1${languageStr}&sort=stars&order=desc&per_page=${perPage}&page=${page}`
            )
            .then((response) => {
                setRepositories((prevRepositories) => [
                    ...prevRepositories,
                    ...response.data.items,
                ]);
            })
            .catch((error) => console.log(error));
    };

    const navigateToDetailPage = (item: Repository) => {
        navigation.navigate("Details", { repository: item });
    };

    useEffect(() => {
        setPage(1);
        setRepositories([]);
        getPostsData("30", page.toString(), language);
    }, [language]);

    useEffect(() => {
        getPostsData("30", page.toString(), language);
    }, [page]);

    const handleEndReached = () => {
        setPage((oldPage) => oldPage + 1);
    };

    const renderItem = ({ item }: { item: Repository }) => (
        <TouchableOpacity onPress={() => navigateToDetailPage(item)}>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.fullName}>{item.full_name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.forksAndStars}>
                    <Text style={styles.forks}>Forks {item.forks_count}</Text>
                    <Text style={styles.stars}>Stars {item.stargazers_count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    let i = 0;
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={() => (i++).toString()}
                data={repositories}
                renderItem={renderItem}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
            />
            <View style={styles.selectArea}>
                <LanguagePicker setLanguage={setLanguage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#303030",
        flex: 1,
    },
    itemContainer: {
        backgroundColor: "#424242",
        paddingLeft: 10,
        paddingTop: 10,
        marginVertical: 6,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: "hidden",
    },
    title: {
        color: "#cfcfcf",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    fullName: {
        color: "#a9a9a9",
        marginVertical: 4,
    },
    description: {
        fontSize: 15,
        color: "#cfcfcf",
        marginVertical: 8,
    },
    forksAndStars: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    forks: {
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#3f3f3f",
        color: "#bdbdbd",
    },
    stars: {
        fontSize: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        backgroundColor: "#fbf695",
        color: "#0b0b0b",
    },
    selectArea: {
        backgroundColor: "#657d8c",
        width: "100%",
        height: "10%",
    },
    // Additional styles can be added here
});

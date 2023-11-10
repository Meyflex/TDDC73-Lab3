import React, { useEffect, useState } from 'react'
import { FlatList, View,StyleSheet, TouchableOpacity ,Text} from 'react-native'
import axios from 'axios';
import { Repository, RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default function Slider() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
    const [perPage, setPerPage] = useState<number>(30);
    const [page, setPage] = useState<number>(1);
    let i = 0;
    const getPostsData = (perPage: string,page : string) => {
        axios.get(`https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&per_page=${perPage}&page=${page}`)
        .then(response => {
            setRepositories(prevRepositories => [...prevRepositories, ...response.data.items]);
        })        .catch(error => console.log(error));
        };
    const navigateToDetailPage = (item: Repository) => {
        navigation.navigate('Details', { repository: item });
        };
    useEffect(() => {

        getPostsData(perPage.toString(),page.toString());
        },[perPage,page]);
   
    const handleEndReached = () => {
            setPage(page+1);
    }
        // Implement logic for further pagination if needed
   
          const renderItem = ({ item }: { item: Repository }) => (
            <TouchableOpacity onPress={()=>navigateToDetailPage(item)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>Forks: {item.forks_count}</Text>
                    <Text>Stars: {item.stargazers_count}</Text>
                </View>
            </TouchableOpacity>
        );
    
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={item => (i++).toString()}
                    data={repositories}
                    renderItem={renderItem}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5} // Adjust this as needed
                />
            </View>
        );
    }
    
    const styles = StyleSheet.create({
        itemContainer: {
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 16,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        // Additional styles can be added here
    });
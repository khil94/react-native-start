import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollText,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://itunes.apple.com/',
  timeout: 1000,
});

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [movieList, setMovieList] = useState([]);

  const getMovieList = async () => {
    setLoading(true);
    try {
      const response  = await axiosInstance.get('search?term=윤하&country=kr&limit=1');

      const data = response.data.results[0];
      console.log(data.artistName, data.trackCensoredName);

      setDescription(data.artistName);
      setTitle(data.trackName);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   axiosInstance
  //     .get('/movies.json')
  //     .then((response) => {
  //       const data = response.data;
  //       setTitle(data.title);
  //       setDescription(data.description);
  //       setMovieList(data.movies);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            <FlatList
              data={movieList}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>
                  {item.title}, {item.releaseYear}
                </Text>
              )}
            />
          </>
        )}
      </View>
      <Button onPress={getMovieList} title="불러오기" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    marginBottom: 24,
  },
  descriptionText: {
    marginBottom: 24,
  },
});

export default App;

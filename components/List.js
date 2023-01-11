import {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';

const List = () => {
  const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setMediaArray(json);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  console.log('List, mediaArray', mediaArray);

  return (
    <FlatList
      data={mediaArray}
      style={styles.list}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default List;

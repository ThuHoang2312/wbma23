import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';

const ListItem = ({singleMedia, navigation}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Single', item);
      }}
    >
      <Image
        style={styles.image}
        source={{uri: uploadUrl + item.thumbnails?.w160}}
      ></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    marginBottom: 4,
    padding: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: 100,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ListItem;

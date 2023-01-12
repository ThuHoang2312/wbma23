import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({singleMedia}) => {
  const item = singleMedia;
  return (
    <TouchableOpacity style={styles.item}>
      <Image style={styles.image} source={{uri: item.thumbnails.w160}}></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
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
    backgroundColor: '#0d1b2a',
    flexDirection: 'row',
    marginBottom: 4,
    padding: 10,
    justifyContent: 'space-around',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: 100,
    height: '100%',
    borderBottomLeftRadius: 70,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    color: '#6c757d',
  },
});

export default ListItem;

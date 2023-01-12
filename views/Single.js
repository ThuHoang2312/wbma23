import React from 'react';
import {Image, StyleSheet, SafeAreaView, Text} from 'react-native';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';

const Single = ({route}) => {
  console.log(route.params);
  const {title, description, filename, time_added: timeAdded} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{title}</Text>
      <Image source={{uri: uploadUrl + filename}} style={styles.image} />
      <Text>{timeAdded}</Text>
      <Text>{description}</Text>
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Single;

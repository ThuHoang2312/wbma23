import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {uploadUrl} from '../utils/variables';
import {Card, Icon, ListItem, Text} from '@rneui/themed';
import {ScrollView, StyleSheet} from 'react-native';
import {Video} from 'expo-av';
import {useFavourite, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    media_type: type,
    user_id: userId,
    file_id: fileId,
  } = route.params;
  const ref = React.useRef(null);
  const [owner, setOwner] = useState({});
  const [likes, setLikes] = useState([]);
  const [likeStatus, setLikeStatus] = useState(true);
  const {getUserById} = useUser();
  const {getFavourtiesByFileId, postFavourtie, deleteFavourtie} =
    useFavourite();

  const getOwner = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const owner = await getUserById(userId, token);
    setOwner(owner);
  };

  const getLikes = async () => {
    try {
      const likes = await getFavourtiesByFileId(fileId);
      console.log('likes', likes);
      setLikes(likes);
      // TODO: check if the current user id is included in likes array
      // and set the 'setLikeStatus' state
    } catch (error) {
      console.error('getLikes', error);
    }
  };

  const likeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavourtie(fileId, token);
      getLikes();
    } catch (error) {
      console.error('likeFile', error);
    }
  };

  const dislikeFile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavourtie(fileId, token);
      getLikes();
    } catch (error) {
      console.error('likeFile', error);
    }
  };

  useEffect(() => {
    getOwner();
    getLikes();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title h4>{title}</Card.Title>
        <Card.Divider />
        {type === 'image' ? (
          <Card.Image
            source={{uri: uploadUrl + filename}}
            style={styles.image}
          />
        ) : (
          <Video
            ref={ref}
            style={styles.video}
            source={{uri: uploadUrl + filename}}
            useNativeControls
            resizeMode="contain"
            onError={(error) => {
              console.log(error);
            }}
            isLooping
          />
        )}

        <Card.Divider />
        {description && (
          <ListItem>
            <Text>{description}</Text>
          </ListItem>
        )}
        <ListItem>
          <Icon name="schedule" />
          <Text>{new Date(timeAdded).toLocaleString('fi-FI')}</Text>
        </ListItem>
        <ListItem>
          <Icon name="person" />
          <Text>{owner.username}</Text>
        </ListItem>
        <ListItem>
          {likeStatus ? (
            <Icon name="favorite" color={'red'} onPress={dislikeFile} />
          ) : (
            <Icon name="favorite-border" onPress={likeFile} />
          )}

          <Text>{likes.length}</Text>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  timeAdded: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  video: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

export default Single;

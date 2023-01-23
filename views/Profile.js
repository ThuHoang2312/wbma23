import React from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks/ApiHooks';
import {uploadUrl} from '../utils/variables';

const Profile = () => {
  const {setIsLoggedIn, user, setUser} = React.useContext(MainContext);
  const {getFilesByTag} = useTag();

  const [avatar, setAvatar] = React.useState('http://placekitten.com/640'); // placekitten... is default if user has no avatar

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray.pop().filename);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  React.useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Image source={{uri: uploadUrl + avatar}} style={styles.image} />
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Fullname: {user.full_name}</Text>
      <Button
        title="Logout!"
        onPress={async () => {
          console.log('Loggin out');
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.warn('clearing AsyncStorage failed', error);
          }
        }}
      />
    </SafeAreaView>
  );
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

export default Profile;

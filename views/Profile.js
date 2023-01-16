import React from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Profile = () => {
  const {setIsLoggedIn} = React.useContext(MainContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Logout!"
        onPress={async () => {
          console.log('Loggin out');
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
});

export default Profile;

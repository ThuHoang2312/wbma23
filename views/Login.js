import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn} = React.useContext(MainContext);
  const logIn = async () => {
    console.log('Button pressed');
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('userToken', 'abc123');
    } catch (error) {
      console.warn('error in storing token', error);
    }
  };

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === 'abc123') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('no valid token available');
    }
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;

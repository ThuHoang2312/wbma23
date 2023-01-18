import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {useAuthentication, useUser} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn} = React.useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const logIn = async () => {
    console.log('Button pressed');
    const data = {username: 'thuhoang', password: '123456789'};
    try {
      const loginResult = await postLogin(data);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
    }
  };

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setIsLoggedIn(true);
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

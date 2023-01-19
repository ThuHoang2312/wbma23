import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import {View, Button, Text, TextInput} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

function LoginForm(props) {
  const {setIsLoggedIn, setUser} = React.useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {username: '', password: ''}});

  const logIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    // const data = {username: 'thuhoang', password: '123456789'};
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn', error);
      // TODO: notify user about failed login attempt
    }
  };

  return (
    <View>
      <Text>Login Form</Text>
      <Controller
        control={control}
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
          />
        )}
        name="username"
      />
      {errors.username?.type === 'required' && (
        <Text>Username is required!</Text>
      )}
      {errors.username?.type === 'minLength' && (
        <Text>Username min length is 3 characters!</Text>
      )}

      <Controller
        control={control}
        rules={{required: true, minLength: 5}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry={true}
          />
        )}
        name="password"
      />
      {errors.password && <Text>Password (min. 5 chars) is required!</Text>}
      <Button title="Sign in!" onPress={handleSubmit(logIn)} />
    </View>
  );
}

export default LoginForm;

import {Button, Card, Input} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Controller, useForm} from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Upload = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});
  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({defaultValues: {title: '', description: ''}, mode: 'onBlur'});

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediafile(result.assets[0]);
    }
  };

  const upload = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;

    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });

    console.log('form data', formData);

    try {
      const result = await postMedia(
        formData,
        await AsyncStorage.getItem('userToken')
      );
      console.log('upload result', result);
      Alert.alert('Upload OK', 'File id: ' + result.file_id, [
        {
          text: 'OK',
          onPress: () => {
            console.log('Ok pressed');
            // update the 'update' state in main context
            setUpdate(!update);
            // TODO: navigate to home
          },
        },
      ]);
    } catch (error) {
      console.log('upload failed: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        activeOpacity={1}
      >
        <Card>
          <Card.Image
            source={{uri: mediafile.uri || 'http://placekitten.com/200/300'}}
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'This is required.'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Title"
                errorMessage={errors.title && errors.title.message}
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Description"
              />
            )}
            name="description"
          />
          <Button
            title="Pick a file"
            onPress={pickFile}
            style={{paddingBottom: 10}}
          />
          <Button
            title="Upload!"
            onPress={handleSubmit(upload)}
            disabled={!mediafile.uri}
          />
          {loading && <ActivityIndicator size="large" />}
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};
export default Upload;

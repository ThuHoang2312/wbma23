import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Settings} from 'react-native-feather';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';

const App = () => {
  const image = {uri: 'http://placekitten.com/2048/1920'};
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
            imageStyle={{borderBottomRightRadius: 50}}
          >
            <Settings
              width={40}
              height={40}
              stroke="white"
              style={styles.icon}
            />
            <Text style={styles.text}>Homeless kittens</Text>
          </ImageBackground>
        </View>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    margin: 5,
  },
  header: {
    height: 300,
    width: '100%',
    marginBottom: 30,
  },
  text: {
    backgroundColor: '#00b4d8',
    color: 'white',
    fontSize: 20,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
});

export default App;

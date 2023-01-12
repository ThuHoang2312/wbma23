import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';

const App = () => {
  const image = {uri: 'http://placekitten.com/100/300'};
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
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
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    margin: 5,
  },
  header: {
    height: 400,
    width: '100%',
    marginBottom: 30,
  },
  text: {
    backgroundColor: '#0000FF',
    color: 'white',
    fontSize: 20,
    padding: 20,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
});

export default App;

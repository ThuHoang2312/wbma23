import {StatusBar} from 'expo-status-bar';
import Navigation from './navigators/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
};

export default App;

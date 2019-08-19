/**
 * @format
 */

if(__DEV__) {
    import('./ReactotronConfig.js').then(() => console.log('Reactotron Configured'))
}

import {AppRegistry} from 'react-native';
import App from './App';
// import Location from '././src/app/containers/onboarding/Location/LocationScreen';
import {name as appName} from './app.json';


// or just startNetworkDebugging();
AppRegistry.registerComponent(appName, () => App);

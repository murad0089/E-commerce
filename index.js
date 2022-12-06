import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import QuickActions from 'react-native-quick-actions';
import {navigationRef} from './app/hooks/useNavigation';

QuickActions.setShortcutItems([
  {
    type: 'Wishlist', // Required
    title: 'See your wishlist', // Optional, if empty, `type` will be used instead
    icon: 'Compose', // Icons instructions below
    userInfo: {
      url: 'app://orders', // Provide any custom data like deep linking URL
    },
  },
  {
    type: 'Card', // Required
    title: 'See your card', // Optional, if empty, `type` will be used instead
    icon: 'Compose', // Icons instructions below
    userInfo: {
      url: 'app://orders', // Provide any custom data like deep linking URL
    },
  },
]);

const tryNavigate = async item => {
  if (!item) return;
  try {
    setTimeout(() => {
      navigationRef.current?.navigate(item.type);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

QuickActions.popInitialAction().then(tryNavigate);

AppRegistry.registerComponent(appName, () => App);

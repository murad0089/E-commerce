import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import StackComponent from './stack/Stack';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {navigationRef} from './hooks/useNavigation';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  `[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!`,
  `[mobx] Out of bounds read`,
  'Non-serializable values were found in the navigation state',
  'Task orphaned',
]);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StackComponent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

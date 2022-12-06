import {createRef} from 'react';

export const navigationRef = createRef();

function useNavigation() {
  return navigationRef.current;
}

export default useNavigation;

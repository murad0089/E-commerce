import {View,Text} from 'react-native';
import React from 'react';
import Register from '../components/Registration/Register';
import Verification from '../components/Registration/Verification';
import ResetPassword from '../components/Login/ResetPassword';
import UpdatePassword from '../components/Login/UpdatePassword';
import ProfilePassword from '../components/Registration/ProfilePassword';
import NewsDetail from '../components/HomePage/NewsDetail/NewsDetail';
import AllNews from '../components/AllNews/AllNews';
import AllCategories from '../components/HomePage/Categories/AllCategories';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabsenComponent from './BottomTabsenComponent';
import ReviewProduct from '../components/Reviews/ReviewProduct';
import FilterTopTabs from './FilterTopTabs';
import px from '../assets/utility/dimension';
import CategorySpecificProducts from '../components/CategoriesProducts/CategorySpecificProducts';
import AddToCart from '../components/AddToCart/AddToCart';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import AllProducts from '../components/HomePage/Products/AllProducts';
import colors from '../config/colors';
import StoreDetails from '../components/Store/StoreDetails';
import AddToCartScreen from '../components/AddToCart/AddToCartScreen';
import Toast from 'react-native-toast-message';
import PaymentWidget from '../components/Widget/PaymentWidget';
import Checkout from '../components/Order/Checkout';
import ChangePassword from '../components/Login/ChangePassword';
import ChangeEmail from '../components/Login/ChangeEmail';
import ChangeUsername from '../components/Login/ChangeUsername';

const Stack = createNativeStackNavigator();

export function DeletedWish() {
  Toast.show({
    type: 'success',
    text1: 'This item deleted from wishlist',
    topOffset: px(50),
  });
}
export function Addedwish() {
  Toast.show({
    type: 'success',
    text1: 'This item added to wishlist',
    topOffset: px(50),
  });
}
export function successLogin() {
  Toast.show({
    type: 'success',
    text1: 'You logged in successfully',
    topOffset: px(50),
  });
}
export function notLogged() {
  Toast.show({
    type: 'error',
    text1: 'You must login first',
    topOffset: px(50),
  });
}
export function successRegister() {
  Toast.show({
    type: 'success',
    text1: 'You Registered successfully',
    topOffset: px(50),
  });
}
export function successChangePassword() {
  Toast.show({
    type: 'success',
    text1: 'Password changed successfully',
    topOffset: px(50),
  });
}
export function successChangeEmail() {
  Toast.show({
    type: 'success',
    text1: 'Email changed successfully',
    topOffset: px(50),
  });
}
export function successChangeUsername() {
  Toast.show({
    type: 'success',
    text1: 'Username changed successfully',
    topOffset: px(50),
  });
}
export function ErrorRegister() {
  Toast.show({
    type: 'error',
    text1: 'Your Credentials are incorrect',
    topOffset: px(50),
  });
}
export function successLogout() {
  Toast.show({
    type: 'success',
    text1: 'You logged out successfully',
    topOffset: px(50),
  });
}
export function ErrorLogin() {
  Toast.show({
    type: 'error',
    text1: 'Login failed',
    text2: 'Email or password is incorrect',
    topOffset: px(50),
  });
}
export function AddToCartMessage() {
  Toast.show({
    type: 'success',
    text1: 'Item was added to card',
    topOffset: px(50),
  });
}
export function RemoveFromCartMessage() {
  Toast.show({
    type: 'success',
    text1: 'Item removed from card',
    topOffset: px(50),
  });
}
const StackComponent = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="main"
          options={{
            headerShown: false,
            contentStyle: {backgroundColor: 'white'},
          }}
          component={BottomTabsenComponent}
        />
        <Stack.Screen name="ReviewProduct" component={ReviewProduct} />
        <Stack.Screen name="ChangePassword" options={{headerTitle:''}} component={ChangePassword} />
        <Stack.Screen name="ChangeEmail" options={{headerTitle:''}} component={ChangeEmail} />
        <Stack.Screen name="ChangeUsername" options={{headerTitle:''}} component={ChangeUsername} />
        <Stack.Group
          screenOptions={{
            headerTitle: '',
            contentStyle: {backgroundColor: 'white'},
          }}>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="verification"
            component={Verification}
            options={{
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Profile Password"
            component={ProfilePassword}
            options={{
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="MyOrders"
            component={Checkout}
            options={{
              animation:'slide_from_bottom',
              headerStyle:{backgroundColor:colors.blue},
              headerTintColor:colors.white,
              headerShadowVisible: false,
              headerTitle:'My Orders',
              headerTitleAlign:'center',
              }}
          />

          <Stack.Screen
            name="allcategories"
            component={AllCategories}
            options={{
              headerRight: () => (
                <Text
                  style={{
                    fontFamily: 'DMSans-Bold',
                    fontSize: 32,
                    color: colors.fontColor,
                  }}>
                  All Categories
                </Text>
              ),
              animation: 'fade_from_bottom',
            }}
          />

          <Stack.Screen name="updatepassword" component={UpdatePassword} />
          <Stack.Screen
            name="allnews"
            component={AllNews}
            options={{
              headerRight: () => (
                <Text
                  style={{
                    marginRight: px(138),
                    fontFamily: 'DMSans-Bold',
                    fontSize: 24,
                    color: colors.fontColor,
                  }}>
                  News
                </Text>
              ),
              backgroundColor: 'white',
            }}
          />
          <Stack.Screen name="resetpassword" component={ResetPassword} />
        </Stack.Group>

        <Stack.Screen
          name="newsdetail"
          component={NewsDetail}
          options={{
            headerTitle: 'Detail News',
            headerTitleAlign: 'center',

            backgroundColor: 'white',
          }}
        />

        <Stack.Screen name="ProductDetail" component={ProductDetail} />

        <Stack.Screen
          name="categoryproducts"
          component={CategorySpecificProducts}
          options={{
            animation: 'fade_from_bottom',
            title: 'Catalog',
            headerTitleAlign: 'center',
            backgroundColor: 'white',
          }}
        />

        <Stack.Screen
          name="addtocart"
          component={AddToCart}
          options={{
            presentation: 'modal',
            animation: 'fade',
            backgroundColor: 'white',
          }}
        />
        <Stack.Screen name="All Products" component={AllProducts} />
        <Stack.Screen name="Store" component={StoreDetails} />

        <Stack.Screen
          name="payment"
          component={PaymentWidget}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Group
          screenOptions={{
            headerShown: false,
            // contentStyle: { backgroundColor: "white" }
          }}>
          <Stack.Screen
            name="Filter&Sorting"
            component={FilterTopTabs}
            options={{
              presentation: 'transparentModal',
              animation: 'fade_from_bottom',
              backgroundColor: 'white',
            }}
          />
          <Stack.Screen
            name="addtocartscreen"
            component={AddToCartScreen}
            options={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
      <Toast
        onShow={() => {
          setTimeout(() => {
            Toast.hide();
          }, 1700);
        }}
      />
    </>
  );
};

export default StackComponent;

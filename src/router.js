import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BottomTab from './components/BottomTab';
import Competition from './pages/competition/Competition';
import Friend from './pages/friend/Friend';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/mypage/MyPage';
import SignUpPage from './pages/signup/SignUpPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderBottomTabBar = (props) => <BottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderBottomTabBar}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={SignUpPage} />
      <Tab.Screen name="Competition" component={Competition} />
      <Tab.Screen name="Friend" component={Friend} />
      <Tab.Screen name="Mypage" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  ); // 라우팅
};

export default Router;

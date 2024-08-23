import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BottomTab from './components/BottomTab';
import Competition from './pages/competition/Competition';
import StartWorkout from './pages/diary/workoutDiary/StartWorkout';
import WorkoutDatePick from './pages/diary/workoutDiary/WorkoutDatePick';
import WorkoutDiary from './pages/diary/workoutDiary/WorkoutDiary';
import Friend from './pages/friend/Friend';
import HomePage from './pages/home/HomePage';
import MyPage from './pages/mypage/MyPage';

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
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Competition" component={Competition} />
      <Tab.Screen name="Friend" component={Friend} />
      <Tab.Screen name="Mypage" component={MyPage} />
    </Tab.Navigator>
  );
};

const DiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutDiaryScreen" component={WorkoutDiary} />
      <Stack.Screen name="StartWorkoutScreen" component={StartWorkout} />
      <Stack.Screen name="WorkoutDatePickScreen" component={WorkoutDatePick} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="WorkoutDiary" component={DiaryStack} />
    </Stack.Navigator>
  ); // 라우팅
};

export default Router;

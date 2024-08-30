import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BottomTab from './components/BottomTab';
import Competition from './pages/competition/Competition';
import CompetitionCreation from './pages/competition/CompetitionCreation/CompetitionCreation';
import CompetitionRoom1VS1 from './pages/competition/CompetitionRoom1VS1';
import CompetitionRoomRanking from './pages/competition/CompetitionRoomRanking';
import SearchCompetition from './pages/competition/SearchCompetition';
import DietDetail from './pages/diary/dietDiary/DietDetail';
import DietDiary from './pages/diary/dietDiary/DietDiary';
import FoodRecord from './pages/diary/dietDiary/FoodRecord';
import StartWorkout from './pages/diary/workoutDiary/StartWorkout';
import WorkoutDatePick from './pages/diary/workoutDiary/WorkoutDatePick';
import WorkoutDiary from './pages/diary/workoutDiary/WorkoutDiary';
import Friend from './pages/friend/Friend';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/mypage/MyPage';
import ProfilePrivacy from './pages/mypage/ProfilePrivacy';
import SignUpPage from './pages/signup/SignUpPage';
import SocialLogin from './pages/socialLogin/SocialLogin';

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
      <Tab.Screen name="Competition" component={CompetitionStack} />
      <Tab.Screen name="Friend" component={Friend} />
      <Tab.Screen name="Mypage" component={MyPage} />
    </Tab.Navigator>
  );
};
const SignStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="SocialLogin" component={SocialLogin} />
    </Stack.Navigator>
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

const DietDiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DietDiaryScreen" component={DietDiary} />
      <Stack.Screen name="DietDetailScreen" component={DietDetail} />
      <Stack.Screen name="FoodRecordScreen" component={FoodRecord} />
    </Stack.Navigator>
  );
};

const CompetitionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCompetition" component={Competition} />
      <Stack.Screen name="SearchCompetition" component={SearchCompetition} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Sign" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="Sign" component={SignStack} />
      <Stack.Screen name="WorkoutDiary" component={DiaryStack} />
      <Stack.Screen name="DietDiary" component={DietDiaryStack} />
      <Stack.Screen name="ProfilePrivacy" component={ProfilePrivacy} />
      <Stack.Screen name="CompetitionCreation" component={CompetitionCreation} />
      <Stack.Screen name="CompetitionRoom1VS1" component={CompetitionRoom1VS1} />
      <Stack.Screen name="CompetitionRoomRanking" component={CompetitionRoomRanking} />
    </Stack.Navigator>
  ); // 라우팅
};

export default Router;

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';

import { setupFirebaseMessaging } from '../firebaseConfig';
import BottomTab from './components/BottomTab';
import Competition from './pages/competition/Competition';
import CompetitionCreation from './pages/competition/CompetitionCreation/CompetitionCreation';
import CompetitionRecordDetail from './pages/competition/CompetitionRecordDetail';
import CompetitionRoom1VS1 from './pages/competition/CompetitionRoom1VS1';
import CompetitionRoomRanking from './pages/competition/CompetitionRoomRanking';
import SearchCompetition from './pages/competition/SearchCompetition';
import DiaryMain from './pages/diary/DiaryMain';
import FoodDiary from './pages/diary/foodDiary/FoodDiary';
import FoodInfo from './pages/diary/foodDiary/FoodInfo';
import FoodRecord from './pages/diary/foodDiary/FoodRecord';
import FoodRecordDetail from './pages/diary/foodDiary/FoodRecordDetail';
import FoodSearch from './pages/diary/foodDiary/FoodSearch';
import StartWorkout from './pages/diary/workoutDiary/StartWorkout';
import WorkoutDatePick from './pages/diary/workoutDiary/WorkoutDatePick';
import WorkoutDiary from './pages/diary/workoutDiary/WorkoutDiary';
import Friend from './pages/friend/Friend';
import FriendSearch from './pages/friend/FriendSearch';
import Home from './pages/home/Home';
import LoginPage from './pages/login/LoginPage';
import FAQ from './pages/mypage/FAQ';
import MyPage from './pages/mypage/MyPage';
import ProfileEdit from './pages/mypage/ProfileEdit';
import ProfilePrivacy from './pages/mypage/ProfilePrivacy';
import Setting from './pages/mypage/Setting';
import Notification from './pages/notification/Notification';
import SignUpPage from './pages/signup/SignUpPage';
import SocialLogin from './pages/socialLogin/SocialLogin';
import Splash from './pages/splash/Splash';
import { useToastMessageStore } from './store/toastMessage/toastMessage';

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
      <Tab.Screen name="Home" component={Home} />
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

const WorkoutDiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutDiaryScreen" component={WorkoutDiary} />
      <Stack.Screen name="StartWorkoutScreen" component={StartWorkout} />
      <Stack.Screen name="WorkoutDatePickScreen" component={WorkoutDatePick} />
    </Stack.Navigator>
  );
};

const FoodDiaryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FoodDiaryScreen" component={FoodDiary} />
      <Stack.Screen name="FoodDetailScreen" component={FoodRecordDetail} />
      <Stack.Screen name="FoodRecordScreen" component={FoodRecord} />
      <Stack.Screen name="FoodSearchScreen" component={FoodSearch} />
      <Stack.Screen name="FoodInfoScreen" component={FoodInfo} />
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
  const navigation = useNavigation();
  const { showToast } = useToastMessageStore();

  useEffect(() => {
    // Firebase 메시징 설정 및 구독
    const { unsubscribeOnMessage, unsubscribeOnNotificationOpenedApp, unsubscribeOnTokenRefresh } =
      setupFirebaseMessaging(navigation, showToast);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (unsubscribeOnMessage) {
        unsubscribeOnMessage();
      }
      if (unsubscribeOnNotificationOpenedApp) {
        unsubscribeOnNotificationOpenedApp();
      }
      if (unsubscribeOnTokenRefresh) {
        unsubscribeOnTokenRefresh();
      }
    };
  }, [navigation, showToast]);

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Sign" component={SignStack} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="DiaryMain" component={DiaryMain} />
      <Stack.Screen name="WorkoutDiary" component={WorkoutDiaryStack} />
      <Stack.Screen name="FoodDiary" component={FoodDiaryStack} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="ProfilePrivacy" component={ProfilePrivacy} />
      <Stack.Screen name="CompetitionCreation" component={CompetitionCreation} />
      <Stack.Screen name="CompetitionRoom1VS1" component={CompetitionRoom1VS1} />
      <Stack.Screen name="CompetitionRoomRanking" component={CompetitionRoomRanking} />
      <Stack.Screen name="CompetitionRecordDetail" component={CompetitionRecordDetail} />
      <Stack.Screen name="FriendSearch" component={FriendSearch} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  ); // 라우팅
};

export default Router;

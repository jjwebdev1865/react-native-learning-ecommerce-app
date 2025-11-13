import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserData } from "../store/reducers/userSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector(
    (state: RootState) => state.userSlice
  );

  const isUserLoggedIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      console.log("Stored user data:", storedUserData);
      if (storedUserData) {
        dispatch(setUserData(JSON.parse(storedUserData)));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error retrieving user data from AsyncStorage:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={AppColors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "MainAppBottomTabs" : "AuthStack"}
    >
      {/* Add your main app screens here */}
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

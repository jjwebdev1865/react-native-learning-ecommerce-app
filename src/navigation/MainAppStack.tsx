import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const useFirebase = false;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<object | null>(null);

  useEffect(() => {
    if (!useFirebase) {
      setIsLoading(false);
      return;
    }

    // This is better then the commented code above. This will handle a auth state changes in real-time.
    // an example will be a user logging out or being disabled by admins
    // TODO: need to set up local storage for logging
    onAuthStateChanged(auth, (userDataFromFirebase) => {
      if (userData) {
        // User is signed in.
        console.log("Firebase user data:", userData);
        setIsLoading(false);
        setUserData(userDataFromFirebase);
      } else {
        // User is signed out.
        console.log("No user is signed in.");
        setIsLoading(false);
      }
    });
  });

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

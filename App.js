import { StatusBar } from "expo-status-bar";
import { Button, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./screen/registerscreen";
import LoginScreen from "./screen/loginscreen.js";
import Toast from "react-native-toast-message";
import ProfileScreen from "./screen/profilescreen.js";
import { getToken, setToken } from "./utils/tokenStorage.js";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(true);

  useEffect(() => {
    getToken().then((storedToken) => {
      setIsLoggedIn(storedToken);
      setIsLoginLoading(false);
    });
  }, []);

  if (isLoginLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen name="Profile">
              {() => <ProfileScreen setIsLoggingIn={setIsLoggedIn} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerBackVisible: false,
            }}
          >
            <Stack.Screen name="Login">
              {() => (
                <LoginScreen
                  setIsLoggedIn={setIsLoggedIn}
                  isLoginLoading={isLoginLoading}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <Toast />
    </View>
  );
}

export default App;

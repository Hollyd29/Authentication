import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./unprotected/loginscreen";
import RegisterScreen from "./unprotected/registerscreen";

const Stack = createNativeStackNavigator();

function UnprotectedRoutes({ setIsLoggedIn, isLoginLoading }) {
  return (
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
  );
}

export default UnprotectedRoutes;

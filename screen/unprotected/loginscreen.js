import { NavigationContainer, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { url } from "../../utils/config";
import Entypo from "@expo/vector-icons/Entypo";
import { getToken, setToken } from "../../utils/tokenStorage";

function LoginScreen({ setIsLoggedIn, isLoginLoading }) {
  const loginData = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(loginData);
  const [isloading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);

  const navigation = useNavigation();
  const { email, password } = login;

  function handleChange(value, name) {
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleSubmit() {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No filed should be empty",
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${url}/auth/login`, login);
      setIsLoading(false);
      setLogin(loginData); // Clear input fields

      // Set token to handle screen to display
      setIsLoggedIn(res.data.token);
      isLoginLoading(false);

      setToken(res.data.token);
      navigation.navigate("Profile");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
        visibilityTime: 3000,
        text2Style: { fontSize: 18 },
      });
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.loginContainer}>
      <TextInput
        keyboardType="email-address"
        style={styles.inputField}
        placeholder="Email address"
        value={email}
        onChangeText={(value) => handleChange(value, "email")}
      />
      <View style={{ position: "relative" }}>
        <TextInput
          secureTextEntry={isShow}
          style={styles.inputField}
          placeholder="Password"
          value={password}
          onChangeText={(value) => handleChange(value, "password")}
        />
        <Pressable
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: [{ translateY: "-50%" }],
            opacity: 0.5,
          }}
          onPress={() => setIsShow(!isShow)}
        >
          {!isShow && <Entypo name="eye" size={24} color="black" />}
          {isShow && <Entypo name="eye-with-line" size={24} color="black" />}
        </Pressable>
      </View>

      <Button
        title={isloading ? "Loading..." : "Submit"}
        onPress={handleSubmit}
        disabled={isloading}
      />

      <View style={styles.confirmationContainer}>
        <Text style={{ fontSize: 12 }}>You do not have an account?</Text>

        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={[{ fontSize: 12 }, styles.registerBtn]}>
            Register here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 24,
    paddingInline: 12,
    display: "flex",
    gap: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "gray",
    height: 40,
    borderRadius: 8,
    paddingInline: 10,
  },
  confirmationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  registerBtn: {
    color: "#9e99fa",
  },
});

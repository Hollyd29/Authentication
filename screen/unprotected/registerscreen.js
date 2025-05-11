import { useNavigation } from "@react-navigation/native";
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

function RegisterScreen() {
  const registerData = {
    username: "",
    email: "",
    password: "",
  };
  const [register, setRegister] = useState(registerData);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(true);

  const navigation = useNavigation();

  function handleChange(value, name) {
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const { username, email, password } = register;
    if (!username || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No field should be empty",
        visibilityTime: 5000,
      });
      return;
    }

    // console.log(register);
    try {
      setIsLoading(true);
      const res = await axios.post(`${url}/auth/register`, register);
      console.log(res.data);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You have registered successfully",
        text2Style: { fontSize: 14 },
        visibilityTime: 5000,
      });
      setRegister(registerData);
      setIsLoading(false);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.message,
        visibilityTime: 10000,
        text2Style: { fontSize: 16 },
      });
    }
  }

  return (
    <View style={styles.loginContainer}>
      <TextInput
        style={styles.inputField}
        placeholder="Username"
        onChangeText={(value) => handleChange(value, "username")}
        value={register.username}
      />
      <TextInput
        keyboardType="email-address"
        style={styles.inputField}
        placeholder="Email address"
        onChangeText={(value) => handleChange(value, "email")}
        value={register.email}
      />

      <View style={{ position: "relative" }}>
        <TextInput
          secureTextEntry={isShow}
          style={styles.inputField}
          placeholder="Password"
          onChangeText={(value) => handleChange(value, "password")}
          value={register.password}
        />
        {!isShow && (
          <Pressable
            onPress={() => setIsShow(true)}
            style={styles.passwordIcon}
          >
            <Entypo name="eye" size={24} color="black" />
          </Pressable>
        )}
        {isShow && (
          <Pressable
            onPress={() => setIsShow(false)}
            style={styles.passwordIcon}
          >
            <Entypo name="eye-with-line" size={24} color="black" />
          </Pressable>
        )}
      </View>

      <Button
        title={isLoading ? "Loading..." : "Submit"}
        disabled={isLoading}
        onPress={handleSubmit}
      />

      <View style={styles.confirmationContainer}>
        <Text style={{ fontSize: 12 }}>You already have an account?</Text>

        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={[{ fontSize: 12 }, styles.registerBtn]}>Login here</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default RegisterScreen;

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
  passwordIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    opacity: 0.5,
  },
});

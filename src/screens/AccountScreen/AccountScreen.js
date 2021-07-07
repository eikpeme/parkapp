import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "./styles";
import { firebase } from "../../firebase/config";

const Stack = createStackNavigator();

export function AccountScreen(props) {
  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      // .then(() => {
      //   props.navigation.navigate("Login");
      // })
      //if check if user is valid if not navigate
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("User Profile")}
        >
          <Text style={styles.buttonTitle}>Profile -&gt; </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("Vehicle Information")}
        >
          <Text style={styles.buttonTitle}>Vehicle -&gt; </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
          <Text style={styles.buttonTitle}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
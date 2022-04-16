//import { StatusBar } from 'expo-status-bar';
import React, { useState, createContext, useContext, useEffect } from "react";
import { View, ActivitIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
//import { StyleSheet, View, Text, Image, Button } from 'react-native';
//import * as Google from 'expo-auth-session/providers/google';
//import * as WebBrowser from 'expo-web-browser';

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Home from "./screens/Home";
//import { RootTagContext } from 'react-native/Libraries/ReactNative/RootTag';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack () {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function AuthStack () {
  return (
    <Stack.Navigator defaultScreenOptions={Login}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  )
}

function RootNavigator () {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}

export default function App() {
  return <RootNavigator />
}

/* WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "697402007992-o03utb9q8ctl0l25vaddgkgprc1beshm.apps.googleusercontent.com",
    expoClientId: "697402007992-gkpcnofb8gt25mj17ecio9gbkt67rll9.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button 
        title={accessToken ? "Get User Data" : "Login"}
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents: true}) }}
      />
      <StatusBar style="auto" />
    </View>
  );
} */

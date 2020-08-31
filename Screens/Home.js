import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from "react-native";

import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function Home({ navigation }) {
  let [state, setState] = useState([]);

  // const didMountRef = useRef(false)
  // useEffect(() => {
  //   if (didMountRef.current) {
  //     doStuff()
  //   } else didMountRef.current = true
  // });

  let getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then((keys) => {
        return AsyncStorage.multiGet(keys).then((result) => {
          setState(
            result.sort((a, b) => {
              if (JSON.parse(a[1]).firstName < JSON.parse(b[1]).firstName) {
                return -1;
              }
              if (JSON.parse(a[1]).firstName > JSON.parse(b[1]).firstName) {
                return 1;
              }
              return 0;
            })
          );
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllContact();
    });
    return unsubscribe;
  }, [navigation]);
  console.log("hello danish", state);

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        renderItem={({ item }) => {
          contact = JSON.parse(item[1]);
          return (
            <TouchableOpacity>
              <Text>Suhel</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => item[0].toString()}
      />

      <TouchableOpacity
        style={styles.floatButton}
        onPress={() => navigation.navigate("AddContactScreen")}
      >
        <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100,
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff",
  },
  infoContainer: {
    flexDirection: "column",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2,
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100,
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage,
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function ViewContactScreen({ navigation, route }) {
  let [viewContact, setViewContact] = useState({
    firstName: "demoData",
    lastName: "demoData",
    phone: "demoData",
    email: "demoData",
    address: "demoData",
    key: "demoD",
  });
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () => {
      const { key } = route.params;
      getContact(key);
    });
    return unsubscribe;
  }, [navigation]);

  let getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then((eachContact) => {
        var contact = JSON.parse(eachContact);
        contact.key = key;
        setViewContact(contact);
      })
      .catch((err) => console.log(err));
  };
  let callAction = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telpromt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  let smsAction = (phone) => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  let editContact = (key) => {
    navigation.navigate("EditContactScreen", { key: key });
  };
  let deleteContact = (key) => {
    Alert.alert(
      "Delete Contact ?",
      `${viewContact.firstName} ${viewContact.lastName}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Tapped"),
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem(key)
              .then(() => {
                navigation.goBack();
              })
              .catch((err) => console.log(err));
          },
        },
      ]
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contactIconContainer}>
        <Text style={styles.contactIcon}>
          {viewContact.firstName[0].toUpperCase()}
        </Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {viewContact.firstName} {viewContact.lastName}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Phone</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{viewContact.phone}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Email</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{viewContact.email}</Text>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered>
            <Text style={styles.infoText}>Address</Text>
          </CardItem>
          <CardItem bordered>
            <Text style={styles.infoText}>{viewContact.address}</Text>
          </CardItem>
        </Card>
      </View>

      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity onPress={() => smsAction(viewContact.phone)}>
            <Entypo name="message" size={50} color="#B83227" />
          </TouchableOpacity>
        </CardItem>

        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity onPress={() => callAction(viewContact.phone)}>
            <Entypo name="phone" size={50} color="#B83227" />
          </TouchableOpacity>
        </CardItem>
      </Card>

      <Card style={styles.actionContainer}>
        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity onPress={() => editContact(viewContact.key)}>
            <Entypo name="edit" size={50} color="#B83227" />
            {/* <Text style={styles.actionText}></Text> */}
          </TouchableOpacity>
        </CardItem>

        <CardItem style={styles.actionButton} bordered>
          <TouchableOpacity onPress={() => deleteContact(viewContact.key)}>
            <Entypo name="trash" size={50} color="#B83227" />
          </TouchableOpacity>
        </CardItem>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center",
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff",
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300",
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900",
  },
  infoContainer: {
    flexDirection: "column",
  },
});

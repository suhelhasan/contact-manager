import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { Form, Item, Input, Label, Button } from "native-base";

export default function AddContactScreen({ navigation }) {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");

  let saveContact = async () => {
    if (
      firstName === "" &&
      lastName === "" &&
      phone === "" &&
      email === "" &&
      address === ""
    ) {
      Alert.alert("PLease enter a value");
    } else {
      var contact = {
        firstName,
        lastName,
        phone,
        email,
        address,
      };
      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
        .then(() => navigation.goBack())
        .catch((error) => console.log(error));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <Label>First Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(e) => setFirstName(e)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(e) => setLastName(e)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Phone</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="phone-pad"
              onChangeText={(e) => setPhone(e)}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(e) => setAddress(e)}
            />
          </Item>
        </Form>
        <Button style={styles.button} full onPress={() => saveContact()}>
          <Text style={styles.buttonText}>Save Contact</Text>
        </Button>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500,
  },
  inputItem: {
    margin: 10,
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF",
  },
});

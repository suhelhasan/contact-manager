import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
} from "react-native";

import { Form, Item, Input, Label, Button } from "native-base";

export default function EditContactScreen({ navigation, route }) {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [key, setKey] = useState("");

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
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddress(contact.address);
        setKey(key);
      })
      .catch((err) => console.log(err));
  };

  let updateContact = async (key) => {
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
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => navigation.goBack())
        .catch((err) => console.log(err));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <Form>
          <Item style={styles.inputItem}>
            <Label>First Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(fname) => setFirstName(fname)}
              value={firstName}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Last Name</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(lname) => setLastName(lname)}
              value={lastName}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Phone</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="phone-pad"
              onChangeText={(ph) => setPhone(ph)}
              value={phone}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(em) => setEmail(em)}
              value={email}
            />
          </Item>
          <Item style={styles.inputItem}>
            <Label>Address</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={(add) => setAddress(add)}
              value={address}
            />
          </Item>
        </Form>
        <Button
          full
          rounded
          style={styles.button}
          onPress={() => updateContact(key)}
        >
          <Text style={styles.buttonText}>Update Contact</Text>
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
});

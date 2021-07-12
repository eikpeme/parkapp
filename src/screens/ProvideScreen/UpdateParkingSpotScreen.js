import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { decode, encode } from "base-64";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import styles from "./styles";
//import SelectTime from './SelectTime'
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import * as Location from "expo-location";

export const UpdateParkingSpotScreen = (props) => {
  // values in form initialized to current info of parking spot
  const spotToUpdate = props.route.params.spot;
  const [description, setdescription] = useState(spotToUpdate.description);
  const [street, setStreet] = useState(spotToUpdate.street);
  const [city, setCity] = useState(spotToUpdate.city);
  const [state, setState] = useState(spotToUpdate.state);
  const [postalCode, setpostalCode] = useState(spotToUpdate.postalCode);
  const [rate, setRate] = useState(spotToUpdate.rate);
  const [spotCheck, setSpotCheck] = useState(false);
  const [coords, setCoords] = useState({});
  const [startTime, setStartTime] = useState(spotToUpdate.startTime);
  const [endTime, setEndTime] = useState(spotToUpdate.endTime);

  //const [imageUrl, setImageUrl] = useState("");  Stretch goal to upload picture from user phone


  //Geocoding- retrieve lat & long from user entered address
  const onRegisterPress = async () => {
    const address = `${street}, ${city}, ${state}`;
    const returnedCoords = await Location.geocodeAsync(address);
    setCoords(returnedCoords[0]);
    setSpotCheck(true);
  };

  //API call to firebase to add user confirmed parking spot
  const updateParkingSpot = async () => {
    const db = firebase.firestore();
    const parkingRef = db.collection("parkingSpots");

    //Retreive registered map API address of user confirmed coordinates
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      //Update parking spot info in firebase
      await parkingRef.doc(spotToUpdate.id).update({
        description: description,
        street: `${address.name} ${address.street}`,
        city: address.city,
        country: address.country,
        postalCode: address.postalCode,
        state: address.region,
        imageUrl:
          "https://www.bigjoessealcoating.com/wp-content/uploads/2018/08/residential-sealcoating-495x337.jpg",
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.log(error);
    }

    props.navigation.navigate("ParkingSpotList");
  };

  const returnToForm = () => {
    setSpotCheck(false);
  };

  return (
    <>
      {spotCheck ? (
        <SafeAreaView style={styles.AndroidSafeArea}>
          <MapView
            style={{ flex: 4 }}
            loadingEnabled={true}
            //provider={PROVIDER_GOOGLE}
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
            ></Marker>
          </MapView>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 100,
            }}
          >
            Is this the correct location?
          </Text>

          <View style={{ flex: 1, flexDirection: "column" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => updateParkingSpot()}
            >
              <Text style={styles.buttonTitle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => returnToForm()}
            >
              <Text style={styles.buttonTitle}>No</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="always"
          >
            <Image
              style={styles.logo}
              source={require("../../../assets/icon.png")}
            />
            <TextInput
              style={styles.input}
              placeholder={description}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setdescription(text)}
              value={description}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={street}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setStreet(text)}
              value={street}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={city}
              onChangeText={(text) => setCity(text)}
              value={city}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={state}
              onChangeText={(text) => setState(text)}
              value={state}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={postalCode}
              onChangeText={(text) => setpostalCode(text)}
              value={postalCode}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={rate}
              onChangeText={(text) => setRate(text)}
              value={rate}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder={startTime}
              onChangeText={(text) => setStartTime(text)}
              value={startTime}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              placeholder= {endTime}
              onChangeText={(text) => setEndTime(text)}
              value={endTime}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />

            {/* <SelectTime/> */}

            {/* Upload image */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => onRegisterPress()}
            >
              <Text style={styles.buttonTitle}>Update Parking Spot</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      )}
    </>
  );
};
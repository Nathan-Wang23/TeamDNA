import React from 'react';
import { View, Text, Dimensions, Pressable, StyleSheet } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigationState } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { AntDesign } from '@expo/vector-icons';

import { GRADIENT_COLORS } from '../constants/colors';
import routes from '../constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRecordVinyl, faNewspaper, faBrush, faMusic} from "@fortawesome/free-solid-svg-icons";

const { width, height } = Dimensions.get('window')


const styles = StyleSheet.create({
    nav: {
        color: 'white',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: height*0.085,
        paddingBottom:0,
        width: width/4,
        left: 0,

    },
    current: {
        color: '#E37042',
        flexDirection: 'row',
        fontSize: 50,
        paddingLeft: 15,
        paddingRight:15,
        width:width/4,
        marginBottom: height*0.085,
        zoom: 1.4
    },
    navName: {
        color: 'white',
        paddingLeft: 7,
        paddingRight:7,
        position: 'absolute',
        top: height*0.025,
        width:width,
        left: -width*0.04
    },
    currentName: {
        color: '#E37042',
        paddingLeft: 7,
        paddingRight:7,
        position:'absolute',
        top:height*0.025,
        width:width,
        left: -width*0.04
    }
})


let scren = "Home"
const Footer = ({ navigation, title }) => {
  const currentScreen = useNavigationState(
    (state) => state.routeNames[state.index]
  );

  return (
    <View style={[t.shadowMd, { height: height*0.15, position: 'absolute', top: height*0.92, left:0, right:0, bottom:0 }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={GRADIENT_COLORS}
        style={[
          t.flex1,
          t.flexRow,
          t.justifyBetween,
          t.pT8,
          { alignItems: 'center' }
        ]}
      >

        {scren == "Home" &&
        <View style = {styles.nav}>
            <Pressable id="record" style={styles.current}
                onPress={() => {
                    scren = "Home"
                    navigation.navigate(routes.Home)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.current} icon={faRecordVinyl} />
                    <Text style={styles.currentName}>Playlists</Text>
                </View>

            </Pressable>
            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Covers"
                    navigation.navigate(routes.Covers)
                }}
                rippleColor="white">
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "news" style={styles.nav} icon={faMusic} />
                    <Text style={styles.navName}>Covers</Text>
                </View>
            </Pressable>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "News"
                    navigation.navigate(routes.News)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faNewspaper} />
                    <Text style={styles.navName}>News</Text>
                </View>
            </Pressable>

            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Create"
                    navigation.navigate(routes.Create)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = 'brush' style={styles.nav} icon={faBrush} />
                    <Text style={styles.navName}>Your Art</Text>
                </View>
            </Pressable>
        </View>}

        {scren == "Covers" &&
        <View style = {styles.nav}>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "Home"
                    navigation.navigate(routes.Home)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faRecordVinyl} />
                    <Text style={styles.navName}>Playlists</Text>
                </View>

            </Pressable>
            <Pressable style={styles.current}
                onPress={() => {
                    scren = "Covers"
                    navigation.navigate(routes.Covers)
                }}
                rippleColor="white">
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "news" style={styles.current} icon={faMusic} />
                    <Text style={styles.currentName}>Covers</Text>
                </View>
            </Pressable>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "News"
                    navigation.navigate(routes.News)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faNewspaper} />
                    <Text style={styles.navName}>News</Text>
                </View>
            </Pressable>

            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Create"
                    navigation.navigate(routes.Create)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = 'brush' style={styles.nav} icon={faBrush} />
                    <Text style={styles.navName}>Your Art</Text>
                </View>
            </Pressable>
        </View>}

        {scren == "News" &&
        <View style = {styles.nav}>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "Home"
                    navigation.navigate(routes.Home)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faRecordVinyl} />
                    <Text style={styles.navName}>Playlists</Text>
                </View>

            </Pressable>
            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Covers"
                    navigation.navigate(routes.Covers)
                }}
                rippleColor="white">
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "news" style={styles.nav} icon={faMusic} />
                    <Text style={styles.navName}>Covers</Text>
                </View>
            </Pressable>
            <Pressable id="record" style={styles.current}
                onPress={() => {
                    scren = "News"
                    navigation.navigate(routes.News)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.current} icon={faNewspaper} />
                    <Text style={styles.currentName}>News</Text>
                </View>
            </Pressable>

            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Create"
                    navigation.navigate(routes.Create)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = 'brush' style={styles.nav} icon={faBrush} />
                    <Text style={styles.navName}>Your Art</Text>
                </View>
            </Pressable>
        </View>}

        {scren == "Create" &&
        <View style = {styles.nav}>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "Home"
                    navigation.navigate(routes.Home)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faRecordVinyl} />
                    <Text style={styles.navName}>Playlists</Text>
                </View>

            </Pressable>
            <Pressable style={styles.nav}
                onPress={() => {
                    scren = "Covers"
                    navigation.navigate(routes.Covers)
                }}
                rippleColor="white">
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "news" style={styles.nav} icon={faMusic} />
                    <Text style={styles.navName}>Covers</Text>
                </View>
            </Pressable>
            <Pressable id="record" style={styles.nav}
                onPress={() => {
                    scren = "News"
                    navigation.navigate(routes.News)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = "record" style={styles.nav} icon={faNewspaper} />
                    <Text style={styles.navName}>News</Text>
                </View>
            </Pressable>

            <Pressable style={styles.current}
                onPress={() => {
                    scren = "Create"
                    navigation.navigate(routes.Create)
                }}
                rippleColor="white"
            >
                <View style={{flexDirection: 'column'}}>
                    <FontAwesomeIcon id = 'brush' style={styles.current} icon={faBrush} />
                    <Text style={styles.currentName}>Your Art</Text>
                </View>
            </Pressable>
        </View>}

      </LinearGradient>
    </View>
  );
};

export default Footer;
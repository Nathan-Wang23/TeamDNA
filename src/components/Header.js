import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigationState } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { AntDesign } from '@expo/vector-icons';

import { GRADIENT_COLORS } from '../constants/colors';
import routes from '../constants/routes';
import authHandler from '../screens/Authorization';
import * as AuthSession from 'expo-auth-session';
import axios, * as others from 'axios';
import {encode, decode} from 'base-64';
import base64 from 'react-native-base64';

const { width, height } = Dimensions.get('window')



import { Buffer } from 'buffer';
global.btoa = global.btoa || encode;
global.atob = global.atob || decode;
const qs = require('qs');

const Header = ({ navigation, title, onDeletePost }) => {
  const [loggedIn, setLogin] = useState(false);
  const [authCode, setAuthCode] = useState(false);
  const currentScreen = useNavigationState(
    (state) => state.routeNames[state.index]
  );

  const config = require("../constants/config");



    const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                      'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                      'playlist-modify-private','user-read-recently-played','user-top-read'];
    const scopes = scopesArr.join(' ');

    const getAuthorizationCode = async () => {
      try {
        const clientId = '883c5df051dd4379ad76ef0bda35ba3c';
        const clientSecret = '363b947271dc476c809134aa06b94fa7';
        const redirectUrl = 'exp://10.180.243.93:19000/'
        const result = await AuthSession.startAsync({
          authUrl:
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirectUrl),
        })

        setLogin(!loggedIn)
        setAuthCode(result.params.code)
        config.loggedIn = true;
        config.authCode = result.params.code
        return result.params.code
      } catch (err) {
        console.error(err)
      }
   }

   const getToken = async (code) => {
      try {
        const clientId = '883c5df051dd4379ad76ef0bda35ba3c';
        const clientSecret = '363b947271dc476c809134aa06b94fa7';
        const token_url='https://accounts.spotify.com/api/token';
        const redirectUrl = 'exp://10.180.243.93:19000/';

        //const data = { grant_type: "authorization_code" };
        //const options = {
        //  method: "POST",
        //  headers: {
        //    Authorization:
        //      "Basic " +
        //      Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        //    "content-type": "application/x-www-form-urlencoded",
        //  },
        //  data: qs.stringify(data),
        //  url: "https://accounts.spotify.com/api/token",
        //};

        const data = {
            code: code,
            redirect_uri: redirectUrl,
            grant_type: 'authorization_code'
        }

        var authOptions = {
          method: 'POST',
          url: 'https://accounts.spotify.com/api/token',
          data: qs.stringify(data),
          headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            "content-type": "application/x-www-form-urlencoded"
          }
        };
        const response = await axios(authOptions);

        const {access_token} = response.data;
        config.token = access_token;
        return Promise.resolve(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    //const getPlaylists = async (token) => {
    //  try{
    //    console.log(token);
    //    const data = await axios.get('https://api.spotify.com/v1/me/playlists', {
    //      headers: {
    //        'Authorization': 'Bearer ' + token.access_token
    //      }
    //  })
    //  console.log(data);
    //  } catch (err) {
    //    console.error(err);
    //  }
    //}


    const spotifyLogin = async () => {
      const code = await getAuthorizationCode();
      const token = await getToken(code);
      //const playlists = await getPlaylists(token);
    }




    return (
    <View style={[t.shadowMd, { height: 200 }]}>
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
        <View style={[t.flexRow, {height: height/4, bottom:height*0.02, alignItems: 'center' }]}>
          <Text style={[t.textWhite, t.fontBold, t.textXl, t.mL3]}>
            {title}
          </Text>
        </View>
        {!loggedIn && currentScreen === routes.Home && <View style={[t.flexRow]}>
          <Ripple onPress={() => spotifyLogin()} rippleColor="white" style={[t.p4, t.mR2, {bottom: height*0.02}]}>
            <Text style={[t.textWhite, t.textS, t.mL3, {borderRadius:width*0.04, borderColor: 'green', borderWidth:0.5, padding:width*0.02}]}>Login Spotify</Text>
          </Ripple>
        </View>}

        {loggedIn && <View style={[t.flexRow]}>
          <Ripple rippleColor="white" style={[t.p4, t.mR2]}>
            <Text style={[t.textWhite, t.textS, t.mL3, {bottom: height*0.02}]}>Logged In</Text>
          </Ripple>
        </View>}


      </LinearGradient>
    </View>
  );
};



export default Header;
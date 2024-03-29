import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import Button from '../components/Button';

import routes from '../constants/routes';
import { useNavigation } from '@react-navigation/native';


import { GRADIENT_COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window')


const LoginScreen = ({navigation}) => {
  const [showLogin, setShowLogin] = useState(true);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    // clear formState when switching between login an d signup
    setFormState({});
  }, [showLogin]);


  const handleSubmit = () => {
    navigation.navigate(routes.Home);
    if (showLogin) {
      // call login API
    } else {
      // call sign in API
    }
  };

  const textInputStyle = [
    t.border,
    t.rounded,
    t.borderIndigo800,
    t.p3,
    t.textLg,
    t.textBlue900,
    t.mB4
  ];

  return (
    <View style={{backgroundColor: '#222222'}}>
      <LinearGradient colors={GRADIENT_COLORS} >
        <AntDesign
          name="filetext1"

          size={height/4}
          color="rgba(57,53,53, 0.3)"
        />
        <View >
          <Text
            style={[
              t.textWhite,
              t.text2xl,
              t.fontBold,
              { alignSelf:'center', lineHeight: 50 }
            ]}
          >
            {showLogin ? 'LOGIN' : 'SIGNUP'}
          </Text>
          <AntDesign style={{alignSelf:'center'}} name="addusergroup" size={height/40} color="white" />
        </View>

        <View style={[t.bgGray100, t.roundedLg, t.p8, t.shadow2xl]}>
          {!showLogin && (
            <TextInput
              value={formState.email}
              onChangeText={(text) =>
                setFormState({ ...formState, email: text })
              }
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              style={textInputStyle}
            />
          )}
          <TextInput
            value={formState.username}
            onChangeText={(text) =>
              setFormState({ ...formState, username: text })
            }
            placeholder="Username"
            style={textInputStyle}
          />
          <TextInput
            value={formState.password}
            onChangeText={(text) =>
              setFormState({ ...formState, password: text })
            }
            placeholder="Password"
            secureTextEntry
            style={textInputStyle}
          />

          <Button onPress={handleSubmit}>
            <Text
              style={[
                t.textWhite,
                t.textXl,
                t.fontBold,
                t.textCenter,
                t.mR3,
                { lineHeight: 23 }
              ]}
            >
              {showLogin ? 'Login' : 'Create'}
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Button>
          <View style={[t.flexRow, t.mT3, t.justifyCenter]}>
            <Text style={[t.textGray900, t.textBase, t.mR2]}>
              {showLogin
                ? 'Do not have an account?'
                : 'Already have an account?'}
            </Text>
            <Text
              onPress={() => setShowLogin((prev) => !prev)}
              style={[t.textBlue900, t.textBase]}
            >
              {showLogin ? 'Sign Up' : 'Login'}
            </Text>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient colors={GRADIENT_COLORS} >
        <AntDesign
          name="filetext1"

          size={height}
          color="rgba(57,53,53, 0.3)"
        />
        </LinearGradient>
    </View>
  );
};

export default LoginScreen;

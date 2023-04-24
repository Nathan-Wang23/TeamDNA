import React, { useState } from 'react';
import { t } from 'react-native-tailwindcss';
import { AntDesign } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  StyleSheet,
  UIManager,
  Dimensions,
  ScrollView,
  Modal,
  Pressable
} from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import Footer from '../components/Footer';
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(40, 39, 38, 0.8)'
  },
  container: {
    paddingTop: 10,
    flexDirection: 'column',
    alignContent: "center",
    alignItems: "center",
    justifyContent:'space-evenly',
    backgroundColor: '#222222',
    position: 'absolute',
    width:width,
    top:height*0.15,
    height: height*0.80
  },
  thumbnail: {
    width: width * 0.75,
    height: width * 0.75,
    marginLeft:12,
    marginRight:12,
    marginTop: 15
  },
  ptitle: {
    position: 'absolute',
    marginLeft: 150

  },
  button: {
    alignContent: 'center',
    fontSize: 15,
    marginLeft: '90%',
    color: 'rgba(130, 123, 117, 0.8)'

  },
  modal: {
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'rgba(130, 123, 117, 0.8)'

  },
   art: {
    backgroundColor: 'rgba(130, 123, 117, 0.8)',
    shadowColor: 'rgba(106, 90, 205,1)',
    padding: 20,
    borderRadius: 10

   },
   thumbnail_modal: {
    width: width * 0.5,
    height: width * 0.5,
    marginLeft:12,
    marginRight:12,
    marginTop: 15,
    marginBottom: 15
   },
   name: {
    left:width*0.26,
    color: 'white',
    padding:5,
    fontFamily: 'Verdana'
   }
});

const ART = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    description: 'Indie Playlist',
    image: 'ImpressionalistDance.png'
  },
  {
    id: 'bd7ac23a-caba-4212-a34d-38d53a8b28ba',
    description: 'Sad Playlist',
    image: 'modernInstrumental.png'
  },
  {
    id: 'bd7ac23a-ca6a-2212-a74d-38927848b28ba',
    description: 'Dance Playlist',
    image: 'dance.png'
  },
  {
    id: 'bd7ac23a-ca6a-2212-a74d-38927848b28ba',
    description: 'Instrumental Playlist',
    image: 'Instrumental.png'
  }
];


//const Item = ({ description, image }) => {
//  const [fullView, setFullView] = useState(false);
//  const [modalVisible, setModalVisible] = useState(false);
//  let title_select = ""

//  let value = image

//  return (


//    <TouchableOpacity
//      onPress={(e) => {
//        //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//        //setFullView((prev) => !prev);
//        setModalVisible(!modalVisible)
//        console.log({description})
//      }}
//      activeOpacity={0.8}
//    >
//      <View >
//        <Modal
//          animationType="slide"
//          visible={modalVisible}
//          onRequestClose={() => {
//            Alert.alert('Modal has been closed.');
//          setModalVisible(!modalVisible);
//        }}>
//          <View style={styles.container}>
//          <View style={styles.modal}>
//            <Pressable
//              style={[styles.button, styles.buttonClose]}
//              onPress={() => setModalVisible(!modalVisible)}>
//              <Text>✖</Text>
//            </Pressable>
//            <Text style={styles.textStyle}>{title_select}</Text>
//            <Pressable style={styles.textStyle}
//              onPress={() => {
//                setModalVisible(!modalVisible)
//              }}>
//               <Image
//                style={styles.thumbnail_modal}
//                source={{uri: image}} />
//                <Text style={styles.ptitle}>
//                    {description}
//                </Text>
//              <Text style = {styles.art}> Generate art for this playlist</Text>
//            </Pressable>

//          </View>
//          </View>

//        </Modal>

//        <Image
//          style={styles.thumbnail}
//          source={require(`./${value}`)} />

//      </View>
//      <Text
//        numberOfLines={fullView ? 0 : 2}
//      >
//        {description}
//      </Text>
//    </TouchableOpacity>
//  );
//};


const CreateScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({});

  return (
    <View style={[t.flex1]}>
      <Header navigation={navigation} title="Your Generated Art"/>

      <View style={styles.container}>
        <ScrollView>
          <View>
            <Image
              style={styles.thumbnail}
              source={require('./ImpressionalistDance.png')} />

              <Text style={styles.name}>
              Indie Playlist
              </Text>
          </View>

          <View>
            <Image
              style={styles.thumbnail}
              source={require('./modernInstrumental.png')} />

              <Text style={styles.name}>
              Sad Playlist
              </Text>
          </View>

          <View>
            <Image
              style={styles.thumbnail}
              source={require('./dance.png')} />

              <Text style={styles.name}>
              Dance Playlist
              </Text>
          </View>

          <View>
            <Image
              style={styles.thumbnail}
              source={require('./Instrumental.png')} />

              <Text style={styles.name}>
              Instrumental Playlist
              </Text>
          </View>

          </ScrollView>
      </View>

      <Footer navigation={navigation} ></Footer>
    </View>

  );
};

export default CreateScreen;
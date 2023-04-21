import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Dimensions, FlatList, StyleSheet } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { AntDesign } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';


import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const { width, height } = Dimensions.get('window')
const config = require('../constants/config')


const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(40, 39, 38, 0.8)'
  },
  container: {
    paddingTop: height*0.01,
    flexDirection: 'column',
    alignContent: "center",
    alignItems: "center",
    justifyContent:'space-evenly',
    backgroundColor: '#222222',
    position: 'absolute',
    width:width,
    top:height*0.15,
    height: height*0.76

  },
  thumbnail: {
    width: width * 0.42,
    height: width * 0.42,
    marginLeft:width*0.016,
    marginRight:width*0.016,
    marginTop: height*.011
  },
  ptitle: {
    position: 'absolute',
    marginLeft: width*.2

  },
  button: {
    alignContent: 'center',
    fontSize: 15,
    marginLeft: '90%',
    color: 'rgba(130, 123, 117, 0.8)'

  },
  modal: {
    padding: width*0.013,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'rgba(130, 123, 117, 0.8)'

  },
   art: {
    backgroundColor: 'rgba(130, 123, 117, 0.8)',
    shadowColor: 'rgba(106, 90, 205,1)',
    padding: width*0.026,
    borderRadius: width*0.013

   },
   thumbnail_modal: {
    width: width * 0.5,
    height: width * 0.5,
    marginLeft:width*0.016,
    marginRight:width*0.016,
    marginTop: height*0.011,
    marginBottom: height*0.011
   },
   titles: {
    padding: width*0.013,
    color:'white',
    fontFamily: 'Verdana'
   }
});

const CoversScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({});
  const [playing, setPlaying] = useState(false);

  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
      }
    if (state !== 'playing') {
      setPlaying(false);
    }
    };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  let pl = [
    {
      id: '122',
      name: 'temp'
    }
  ];

  const getArtists = async () => {
    try{
      const data = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          'Authorization': 'Bearer ' + config.token
        }
    })

    let p = data.data.items;
    let pp = [];
    for (let i = 0; i < p.length; i++) {
      let id_uri = p[i].uri;
      let name = p[i].name;
      let ext_url = p[i].external_urls;
      let images = p[i].images;
      let entry = {
        id: id_uri,
        name: name,
        ex_urls: ext_url,
        images: images
      };
      pp.push(entry);
    }
    pl = pp;
    //console.log(playlists);
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <View style={[t.flex1]}>
      <Header navigation={navigation} title="Amateur Covers"/>

      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.titles}>Collie Buddz - Take It Easy (Official Music Video)</Text>
          <YoutubePlayer
            height={height*0.19}
            width={width}
            play={false}
            videoId={'Y3wl6Yjr6Ns'}
          />
          <Text style={styles.titles}>One Man Band - Phish Covers with Live Looping Improvisation</Text>
          <YoutubePlayer
            height={height*0.19}
            play={false}
            videoId={'UAFUEkL2_2M'}
          />
          <Text style={styles.titles}>TOP 30 songs for ACOUSTIC guitar!</Text>
          <YoutubePlayer
            height={height*0.19}
            play={false}
            videoId={'T-U3c1nU3eM'}
          />
        </ScrollView>



      </View>


      <Footer navigation={navigation} ></Footer>
    </View>

  );
};

export default CoversScreen;
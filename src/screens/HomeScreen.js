import React, { useCallback, useState, useEffect } from 'react';
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
  Modal,
  Pressable
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import authHandler from "./Authorization.js";
import { GRADIENT_COLORS } from '../constants/colors';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios, * as others from 'axios';
//import PlaylistsGrid from '../components/Playlists';

const { width, height } = Dimensions.get('window')

const config = require('../constants/config')

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(40, 39, 38, 0.8)'
  },
  container: {
    paddingTop: 0.01*height,
    flexDirection: 'column',
    alignContent: "center",
    alignItems: "center",
    justifyContent:'space-evenly',
    backgroundColor: '#222222',
    position: 'absolute',
    top:height*0.15,
    height:height*0.76,
    width: width

  },
  thumbnail: {
    width: width * 0.42,
    height: width * 0.42,
    marginLeft:width*0.016,
    marginRight:width*0.016,
    marginTop: height*0.011
  },
  ptitle: {
    position: 'absolute',
    marginLeft: width*0.2

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
   albums: {
    left: width*0.01,
    color: 'white',
    fontFamily: 'Verdana',

   }
});


const Item = ({ title, description, image }) => {
  const [fullView, setFullView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [playlists, setPlaylists] = useState(false);
  let title_select = ""

  return (
    <TouchableOpacity
      onPress={(e) => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        //setFullView((prev) => !prev);
        setModalVisible(!modalVisible)
        console.log({title})
      }}
      activeOpacity={0.8}
    >
      <View >
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.container}>
          <View style={styles.modal}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>✖</Text>
            </Pressable>
            <Text style={styles.textStyle}>{title_select}</Text>
            <Pressable style={styles.textStyle}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}>
               <Image
                style={styles.thumbnail_modal}
                source={{uri: image}} />
                <Text style={styles.ptitle}>
                    {title}
                </Text>
              <Text style = {styles.art}> Generate art for this playlist</Text>
            </Pressable>

          </View>
          </View>

        </Modal>
        <Image
          style={styles.thumbnail}
          source={{uri: image}} />
        <Text style={styles.ptitle}>
          {title}
        </Text>

      </View>
      <Text
        numberOfLines={fullView ? 0 : 2} style={styles.albums}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);

  //useEffect(() => {
  //  const fetchData = async () => {
  //    const { data } = await getPlaylists();
  //    setPlaylistsData(data);
  //  };

  //  try {
  //    fetchData();
  //  } catch (err) {
  //    console.error(err);
  //  }
  //}, []);

  //useEffect(() => {
  //  if (!playlistsData) {
  //    return;
  //  }

  //  // Playlist endpoint only returns 20 playlists at a time, so we need to
  //  // make sure we get ALL playlists by fetching the next set of playlists
  //  const fetchMoreData = async () => {
  //    if (playlistsData.next) {
  //      const { data } = await axios.get(playlistsData.next);
  //      setPlaylistsData(data);
  //    }
  //  };

  //  // Use functional update to update playlists state variable
  //  // to avoid including playlists as a dependency for this hook
  //  // and creating an infinite loop
  //  setPlaylists(playlists => ([
  //    ...playlists ? playlists : [],
  //    ...playlistsData.items
  //  ]));

  //  // Fetch next set of playlists as needed
  //  try {
  //    fetchMoreData();
  //  } catch (err) {
  //    console.error(err);
  //  }

  //}, [playlistsData]);

  let pl = [
    {
      id: '122',
      name: 'temp'
    }
  ];
  const getPlaylists = async () => {
    try{
      const data = await axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': 'Bearer ' + config.token
        }
    })

    let p = data.data.items;
    let pp = [];
    for (let i = 0; i < p.length; i++) {
      let id = p[i].id;
      let name = p[i].name;
      let link = p[i].href;
      let images = p[i].images;
      let entry = {
        id: id,
        name: name,
        link: link,
        images: images
      };
      pp.push(entry);
    }
    setPlaylists(pp);
    pl = pp;
    //console.log(playlists);
    } catch (err) {
      console.error(err);
    }
  }
  //window.onload = () => {
  //  let reloading = sessionStorage.getItem("reloading");
  //  if (reloading) {
  //      sessionStorage.removeItem("reloading");
  //      getPlaylists();
  //  }
  //}


  return (
    <View >
      <Header navigation={navigation} title="Your Playlists">

      </Header>
      <View style={styles.container}>
        <FlatList

          numColumns={2}
          data={playlists}
          renderItem={({ item }) => (

            //<Item description={item.title} image={item.image}/>
            //<Text>{item.name}</Text>
            <View>
              <Image
                style={styles.thumbnail}
                source={{uri: item.images[0].url}} />
              <Text style={styles.albums}>
              {item.name}
              </Text>
            </View>


          )}
          keyExtractor={(item) => item.id}
        />


      </View>
      <View style={{color:'white', marginLeft:width*0.2}}>
        <Ripple onPress={() => getPlaylists()}>
          <Text style={{color:'white'}}>Gather Playlists</Text>
        </Ripple>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

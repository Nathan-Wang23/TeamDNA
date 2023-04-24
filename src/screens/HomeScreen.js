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
    paddingTop: 10,
    flexDirection: 'column',
    alignContent: "center",
    alignItems: "center",
    justifyContent:'space-evenly',
    backgroundColor: '#222222',
    position: 'absolute',
    top:height*0.155,
    height:height*0.8,
    width: width

  },
  thumbnail: {
    width: width * 0.42,
    height: width * 0.42,
    marginLeft:12,
    marginRight:12,
    marginTop: height*0.05
  },
  ptitle: {
    position: 'absolute',
    marginLeft: 150

  },
  button: {
    alignContent: 'center',
    marginLeft: width*0.8,
    marginTop: height*0.05,
    color: 'rgba(130, 123, 117, 0.8)',

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
   albums: {
    left: 5,
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
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);
  const [artists, setArtists] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


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

    //console.log(playlists);
    } catch (err) {
      console.error(err);
    }
  }

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
        link: ext_url,
        images: images
      };
      pp.push(entry);
    }
    setArtists(pp);
    return pp
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
            <View>
            <TouchableOpacity
              style={{flex:1}}
              onPress={(e) => {
                setModalVisible(!modalVisible)
              }}
              activeOpacity={0.8}
            >
              <View>
              <Modal
                style={{flex:1}}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={{fontSize:width*0.1}}>✖</Text>
                </Pressable>
                <Text style={{borderRadius:width*0.02, borderWidth:width*0.005, padding:width*0.04, borderColor:'black', alignSelf:'center'}}>Generate Art!</Text>
              </Modal>
            </View>
              <View>
                <Image
                style={styles.thumbnail}
                source={{uri: item.images[0].url}} />
              <Text style={styles.albums}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>

          </View>



          )}
          keyExtractor={(item) => item.id}
        />


      </View>
      <View style={{color:'white', alignSelf:'center', bottom:height*0.075, borderRadius:width*0.05, borderColor: 'white', borderWidth:0.5, padding:width*0.02, backgroundColor:'gray'}}>
        <Ripple onPress={() => getPlaylists()}>
          <Text style={{color:'black'}}>Gather Playlists</Text>
        </Ripple>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

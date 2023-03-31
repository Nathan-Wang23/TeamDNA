import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  UIManager,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Pressable
} from 'react-native';
import Ripple from 'react-native-material-ripple';

import { GRADIENT_COLORS } from '../constants/colors';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width, height } = Dimensions.get('window')

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
    alignContent: "center",
    alignItems: "center",
    justifyContent:'space-evenly',
    backgroundColor: '#222222',
    flex:1,
    position: 'absolute',
    bottom:height*0.09,
    height:height*0.76,
    width: width
  },
  thumbnail: {

    marginLeft:12,
    marginRight:12,
    marginTop: 5,
    marginBottom:5,
    height:100,
    width:100,
    borderRadius:50,
    borderColor: 'white',
    borderWidth:0.5
  },
  ptitle: {
    position: 'absolute',
    marginLeft: 150,
    flexDirection: 'column',
    flex:1

  },
  button: {
    alignContent: 'center',
    fontSize: 15,
    marginLeft: '90%',
    color: 'rgba(130, 123, 117, 0.8)',

  },
  modal: {
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'rgba(130, 123, 117, 0.8)',

  },
   art: {
    backgroundColor: 'rgba(130, 123, 117, 0.8)',
    shadowColor: 'rgba(106, 90, 205,1)',
    padding: 20,
    borderRadius: 10,

   },
   thumbnail_modal: {
    width: width * 0.5,
    height: width * 0.5,
    marginLeft:12,
    marginRight:12,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: width * 0.5 * 0.5,
   },
   segment: {
    flexDirection: 'row',
    width: width -10,
    padding:1,
    borderWidth: 2,
    marginBottom: 2,
    borderColor: 'white'
   },
   blurb: {
    flex:1,
    marginTop: 37,
    color: 'white',
    fontFamily: 'Verdana',
    padding:5
   }
});


let data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    endDate: '2023-03-10',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/301301/huge_avatar',
    description: 'Collie Buddz at Terminal West'
  },
  {
    id: 'bd7ac23a-ca6a-2592-a74d-38927848b28ba',
    endDate: '2023-03-10',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/59663/huge_avatar',
    description: 'Eric Benét at City Winery Atlanta'
  },
  {
    id: 'bd7ac23a-ca6a-1112-a74d-38927848b28ba',
    endDate: '2023-03-11',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/9562659/huge_avatar',
    description: 'Haru Nemuri at The Masquerade - Hell'
  },
  {
    id: 'bd7ac23a-caba-4212-a34d-38d53a8b28ba',
    endDate: '2023-04-18',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/10252916/huge_avatar',
    description: 'DRAMAGIRLS at Hollywood Bowl'
  },

  {
    id: 'bd7ac23a-ca6a-2212-a74d-38927848b28ba',
    endDate: '2023-04-23',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/46745/huge_avatar',
    description: 'Phish at Hollywood Bowl'
  },
  {
    id: 'bd7ac23a-ca6a-2212-a74d-38921848b28ba',
    endDate: '2023-05-25',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FhAeb7jBZeXGp7vd_q2dfe7t4lmzk-o93HTySjyQ5-nW&s=10',
    description: 'Paramore at State Farm Arena'
  }
];




const Item = ({ endDate, description, image }) => {
  const [fullView, setFullView] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let title_select = ""

  return (
    <TouchableOpacity
      style={{flex:1}}
      onPress={(e) => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        //setFullView((prev) => !prev);
        setModalVisible(!modalVisible)
        console.log({description})
      }}
      activeOpacity={0.8}
    >
      <View style={{flex:1}} >
        <Modal
          style={{flex:1}}
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
                    {endDate}
                </Text>
              <Text style = {styles.art}> More News</Text>
            </Pressable>

          </View>
          </View>

        </Modal>
      </View>

      <View style={styles.segment}>
        <Image
          style={styles.thumbnail}
          source={{uri: image}} />
        <Text style={styles.blurb} >{endDate}: {description}</Text>
      </View>

    </TouchableOpacity>
  );
};

const NewsScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd2cf29e1d9mshccb147eb03fb868p1fb9cbjsn591aaaa13fb3',
      'X-RapidAPI-Host': 'concerts-artists-events-tracker.p.rapidapi.com'
    }
  };


  function refresh() {
    fetch('https://concerts-artists-events-tracker.p.rapidapi.com/venue?name=Hollywood%20bowl&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .then((json) => setNews(json))
    .then((json) => data = JSON.stringify(json))
    .catch(err => console.error(err));
  }

  function seeData() {
    console.log(data)
  }

  return (
    <View style={{flex:1}}>
      <Header navigation={navigation} title="Music News" />
      <View style={styles.container}>
        {/*<View>
          {false && <Ripple onPress={() => refresh()} rippleColor="white" >
            <Text>Refresh</Text>
          </Ripple>}
        </View>
        <View >
          <Ripple onPress={() => seeData()} rippleColor="white" >
            <Text>Refresh</Text>
          </Ripple>
        </View>*/}
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({ item }) => (

                <Item description={item.description} endDate = {item.endDate} image={item.image}/>
            )}
            keyExtractor={(item) => item.id}
          />

        {/*<ScrollView>
            {
            data.map((item) => (
              <View key = {item.id} style = {styles.thumbnail}>
                 <Image
                  style={styles.thumbnail}
                  source={{uri: item.image}} />
                <Text>{item.endDate}: {item.description}</Text>
              </View>
            ))
          }
        </ScrollView>*/}

      </View>

      <Footer navigation={navigation} />
    </View>
  );
};

export default NewsScreen;

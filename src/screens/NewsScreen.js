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
    paddingTop: height*0.01,
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

    marginLeft:width*0.016,
    marginRight:width*0.016,
    marginTop: height*0.003,
    marginBottom:height*0.003,
    height:height*0.07,
    width:width*.13,
    borderRadius:width*0.067,
    borderColor: 'white',
    borderWidth:0.5
  },
  ptitle: {
    position: 'absolute',
    marginLeft: width*.2,
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
    padding: width*0.013,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'rgba(130, 123, 117, 0.8)',

  },
   art: {
    backgroundColor: 'rgba(130, 123, 117, 0.8)',
    shadowColor: 'rgba(106, 90, 205,1)',
    padding: width*0.026,
    borderRadius: width*0.013,

   },
   thumbnail_modal: {
    width: width * 0.5,
    height: width * 0.5,
    marginLeft:width*0.016,
    marginRight:width*0.016,
    marginTop: height*0.011,
    marginBottom: height*0.011,
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
    marginTop: 0.028*height,
    color: 'white',
    fontFamily: 'Verdana',
    padding:width*0.01
   }
});


let data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    endDate: '2023-07-02',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/8801214/huge_avatar',
    description: '21 Savage and Drake at State Farm Arena',
    extra: 'DRAKE ANNOUNCES 2023 IT’S ALL A BLUR TOUR WITH 21 SAVAGE, WHICH FEATURES TWO STOPS AT STATE FARM ARENA IN ATLANTA ON SATURDAY, JULY 1 AND SUNDAY, JULY 2\n\nTickets Available Starting Wednesday, March 15\n\nToday, four time Grammy-award winning and multi-platinum selling artist Drake announced his long awaited return to the stage with the 2023 ‘It’s All A Blur’ Tour presented by Cash App, Visa and Sprite. Produced by Live Nation, Drake and 21 Savage will be going on a 29-date arena run with stops including Atlanta, Chicago, Boston, New York, Miami, Los Angeles, and more before wrapping up in Glendale, AZ at Desert Diamond Arena on Tuesday, September 5.\n\nIt’s All A Blur’ marks Drake’s return to touring since headlining Aubrey & the Three Migos Tour in 2018. The title, a celebration of the last decade,  sums up Drake’s sentiment of the unprecedented run as he gets ready to hit the road. In the last five years, Drake has released four albums, including his most recent studio album Her Loss in collaboration with 21 Savage, which reached number one on the Billboard’s 200 chart and had all 16 songs debuted on Billboard’s Hot 100 list. \n\nGet tickets at https://www.statefarmarena.com/events/detail/drake-and-21-savage'},
  {
    id: 'bd7ac23a-ca6a-2592-a74d-38927848b28ba',
    endDate: '2023-07-10',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/59663/huge_avatar',
    description: 'Eric Benét at City Winery Atlanta',
    extra: 'City Winery Atlanta presents Eric Benét in a two-night, four-show residency on July 10 and July 11. The R&B and adult contemporary icon known for hits like “Spend My Life with You” and collaborations with Faith Evans, Tamia, and more, brings his Grammy-nominated talent to the City Winery stage with multiple opportunities to see the star.'
  },
  {
    id: 'bd7ac23a-ca6a-1112-a74d-38927848b28ba',
    endDate: '2023-03-11',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/269472/huge_avatar',
    description: 'Raja at The Masquerade - Purgatory',
    extra: 'Doors open: 19:00\n\nThe Masquerade presents...\n\nSunday, July 9th, 2023\n\nHeaven at The Masquerade\n\nRAJA\n\n7:00 PM Doors\n\n$25 Balcony GA / $30 Seated GA / $95 VIP / $249 Ultimate VIP / 16+\n\nThis event is 16+. Anyone under 16+ is allowed if accompanied by a guardian.\n\nTickets available @ The Masquerade Box Office or online: https://masq.in/RAJA-7-9\n\nFor More Info Please Visit: MASQ.com'
  },
  {
    id: 'bd7ac23a-caba-4212-a34d-38d53a8b28ba',
    endDate: '2023-07-09',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/9536159/huge_avatar',
    description: 'Anana Kaye and Kristen Englenz at Eddie`s Attic',
    extra: 'Kristen Englenz & Anana Kaye\n\nKristen Englenz is a Nashville-based indie singer-songwriter, multi-instrumentalist, and 2009 international bird call imitation champion. Kristen blends her melodies and lyrics to paint musical stories from the findings of her lifelong field research on love. She`s also the host of Caterwauling With Kristen, a quirky, informative show on birds, the sounds they make, and the people who love them. She frequently incorporates a bit of this "bird music" in her live shows.\n\nBuy Tickets at https://www.eventbrite.com/e/kristen-englenz-anana-kaye-tickets-558844307367'
  },

  {
    id: 'bd7ac23a-ca6a-2212-a74d-38927848b28ba',
    endDate: '2023-07-13',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/2905251/huge_avatar',
    description: 'Young the Giant, Milky Chance, and Rosa Linn at Cadence Bank Amphitheatre at Chastain Park',
    extra: 'SoCal outfit Young The Giant will be embarking on a massive 2023 tour across North America to support their newest album `American Bollywood`. The 49-date outing kicks off May 30th in Montreal and continues through August making notable stops in Toronto, New York, Philadelphia, Chicago, Atlanta, Miami, Houston, Vancouver and Berkeley. Joining the tour on select dates will be special guest Milky Chance, TALK and Rosa Linn.\n\nBuy Tickets at https://concerts.livenation.com/young-the-giant-with-milky-chance-atlanta-georgia-07-13-2023/event/0E005E38C82993BA?irgwc=1&clickid=wvS2EbV0IxyNUt0w98VZM3mRUkAWfl15wXOxx80&camefrom=CFC_BUYAT_1234554&impradid=1234554&REFERRAL_ID=tmfeedbuyat1234554&wt.mc_id=aff_BUYAT_1234554&utm_source=1234554-Songkick&impradname=Songkick&utm_medium=affiliate&ircid=4272'
  },
  {
    id: 'bd7ac23a-ca6a-2212-a74d-38921848b28ba',
    endDate: '2023-05-25',
    image: 'https://images.sk-static.com/images/media/profile_images/artists/467224/huge_avatar',
    description: 'Yellowcard, ¡Mayday!, Story of the Year, This Wild Life, and Mayday Parade at Cadence Bank Amphitheatre at Chastain Park',
    extra: 'This summer, pop punk legend Yellowcard is celebrating the 20th Anniversary of their breakthrough album, Ocean Avenue! The 2003 effort was the band’s landmark record, belting out hits like “Ocean Avenue,” “Only One,” and “Way Away.” The outing, titled Ocean Avenue Tour, will cover 22 major cities, including a stop in Atlanta, Georgia! On Thursday, 20th July 2023, Yellowcard, along with special guests Mayday Parade, Story of the Year, and This Wild Life, is set to light up the Cadence Bank Amphitheatre! The Ocean Avenue Tour is Yellowcard’s first outing in over six years! Grab this opportunity to see the sensational band take over the stage at the Cadence Bank Amphitheatre!'
  }
];



const Item = ({ endDate, description, image, extra }) => {
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
              <Text style = {styles.art}>{extra}</Text>
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

                <Item extra={item.extra} description={item.description} endDate = {item.endDate} image={item.image}/>
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

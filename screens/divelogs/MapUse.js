import React, {useMemo, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Platform, ScrollView, useColorScheme  } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { TouchableOpacity as TouchableOpacit} from 'react-native';
import FAB from 'react-native-fab'
import { COLORS } from '../../assets/colors/theme';
import {Feather, AntDesign, Entypo} from '@expo/vector-icons';
import diveSitesDat from '../../assets/data/diveSitesDate';
import { FlatList, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { Rating } from 'react-native-ratings';

import Carousel from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
//import * as Location from 'expo-location';
import TestSearch from '../../components/divelogs/testSearch'


const MapViews = ({navigation, route}) => {

   const [selectedValue, setSelectedValue] = React.useState({});
  const callback = useCallback((selectedValue) => {
     setSelectedValue(selectedValue);
 }, []);

  let mapView = React.useRef(null);
  const [location, setLocation] = React.useState({});
 function goBack(){
    navigation.goBack();
    if(location){
      let newval = {LocationRating: rating}
      let fin = {...location, ...newval}
    route.params.onSelect({ location: fin });
    }
  }
  const [showoverlay, setshowoverlay] = React.useState(false);
  const [showcarousel2, setShowCarousel2] = React.useState(false);
  const diveSitesData =diveSitesDat;
  const [markers, setMarkers] = React.useState([]);  
  const [position, setPosition] = React.useState({
        latitude: 3.235983333,
        longitude: 73.03243333,
        latitudeDelta: 5,
        longitudeDelta: 5,
   });
   const [rating, setRating] = React.useState(2.5);
   const [colorsch, setcolorsch] = React.useState(true)
   const colorScheme = useColorScheme();

   const MyComponent= ()=> {
    if (colorScheme === 'dark') {
      setcolorsch(false)
    } else {
      setcolorsch(true)
    }
    console.log(colorScheme)
  }
   

    const OnMarkerPressed = (items) => {
      let locations = diveSitesData.indexOf(items);
 
      let positions = ({
        latitude: items.Latitude,
        longitude: items.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      });
      
      if( positions.latitude !== position.latitude){
        setPosition(positions)
        if (mapView) {
          mapView.current.animateToRegion(positions, 1000)
        }
      } 
      setLocation(items) 
 if (markers !== null && markers !== undefined) {
     setMarkers[locations].showCallout();
  
 }
    setShowCarousel2(true)
    }


    const onRegionChangeComplete = () => {
      if (markers && markers.current && markers.current.showCallout) {
        markers.current.showCallout();
      }
    };


 

    React.useEffect(() =>{ 
      
    }, [showcarousel2])
  
    React.useEffect(() =>{ 

    }, [markers])

    React.useEffect(() => {
      if(location){
      let newval = {LocationRating: rating}
      let fin = {...location, ...newval}
    // /  setLocation(fin)
    }
    }, [location, rating])

    
    React.useEffect(() => {
      if(selectedValue){
        let itemindex = selectedValue.OBJECTID -1
         if(selectedValue.OBJECTID){
          OnMarkerPressed(selectedValue)

          setSelectedValue({})
         }
      }
    }, [selectedValue])

    React.useEffect(() => {

    }, [colorsch])
    React.useEffect(() => {
      MyComponent();
    }, [])


    return (
        <View style={styles.container}>
           <MapView style={{flex:1}} 
                ref={mapView}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={position}
                region={position}                
                showsCompass= {true}
                onRegionChangeComplete={onRegionChangeComplete}
              >   
                {diveSitesData.map((item, index) => {
                return (
                    <Marker 
                        key={`marker-${item.OBJECTID}`}
                        ref={ref => setMarkers[index] = ref }
                        onPress = {() =>{   
                          OnMarkerPressed(item)
                        }}
                        pinColor='maroon'
                        initialNumtoRender= {10}
                        calloutVisible={true}
                        title = {item.Name}
                        description ={item.Atoll}
                        descriptionText={{textTransform: 'capitalize'}}
                        coordinate = {{
                        latitude : item.Latitude,
                        longitude : item.longitude,
                        }}
                    >
                         {/* <Image source={require('../assets/images/marker.png')} 
                        style={{height: 50, width:50 }} /> */}
                        <Callout 
                        tooltip={true} style= {{...styles.bubble,}}>
                            <Text style = {{fontSize: 14}}>{item.Name}</Text>
                        </Callout> 
                    </Marker>
                );
                })}
            </MapView>
            
            <TestSearch parentCallback={callback}/> 

            {showcarousel2 &&
            <View style={{flex: 1,
                bottom: 60,
                width: Dimensions.get('window').width -25,
                position: 'absolute',
                elevation: 13,
                alignSelf: 'center', 
                }}>
                <View style = {styles.cardContainer}>
                    <Text style = {styles.titleStyles}>{location.Name}</Text>
                    <View style = {styles.cardItemWrapper}>
                        <Entypo name ="location-pin"  size = {20} color={COLORS.darkGray}/>
                        <Text style = {styles.descriptionText}>{location.Atoll}</Text>
                    </View>
                    <TouchableOpacity style= {styles.selectButton}
                      onPress = {() => {setshowoverlay(true)}}>
                        <Text style = {styles.selectButtonText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            {showoverlay && 
            <View>
            <Overlay
              onBackdropPress={() => {setshowoverlay(false)}}
              overlayStyle = {{borderRadius: 10}}>
              <View>
                <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style = {styles.titleStyles}>{location.Name}</Text>
                    <TouchableOpacit  
                      onPress= {() => setshowoverlay(false)}>
                      <Entypo name='cross' size={26} color={COLORS.black} />
                    </TouchableOpacit>     
                    </View>
                      <View style = {styles.cardItemWrapper}>
                        <Entypo name ="location-pin"  size = {20} color={COLORS.darkGray}/>
                        <Text style = {styles.descriptionText}>{location.Atoll}</Text>
                      </View>
                    <View style={{marginTop: 20, marginBottom: 20,}}>
                      <Text style={{fontFamily: 'LatoBold', fontSize: 16, paddingVertical: 10,}}>Rate dive location: </Text>
                      <Rating 
                        type='custom'
                        //  readonly={true}
                        ratingBackgroundColor={COLORS.darkGray1}
                        ratingCount={5}                        
                        startingValue={rating}
                        fractions={2}
                        tintColor={colorsch ? COLORS.white : "#1C1D1F"}
                        imageSize={45}
                        jumpValue={0.5} 
                        //ratingColor={COLORS.lightblue3}
                        onFinishRating={(value => setRating(value))}
                        style={{paddingHorizontal: 40,}}
                        starContainerStyle={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 8,},
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 6,}}
                      />
                    </View>
                      <TouchableOpacit style= {styles.selectButton}
                        onPress = {() => {setshowoverlay(false)
                            goBack();}}>
                          <Text style = {styles.selectButtonText}>OK</Text>
                      </TouchableOpacit>
                  </View>
                </Overlay>
              </View>
            }
            <View style={{flex: 1,
                 flex: 1,
                 flexDirection:'row',
                 position:'absolute',
                 top:40,left:8,
                 justifyContent: "space-between",
                 backgroundColor: "transparent",
                //  borderWidth: 0.5,
                 borderRadius: 20
                }}>
              <TouchableOpacity  onPress= {() => navigation.goBack()}>
                <Entypo name='chevron-left' size={32} color={COLORS.black} />
              </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill
    },
    map: {
        ...StyleSheet.absoluteFill
    },
    bubble : {
       flexDirection: 'column',
       alignItems: 'center',
       alignSelf: 'flex-start',
       backgroundColor: null,
       borderColor: COLORS.black,
       borderRadius: 10,
       borderWidth: 0.5,
    },
    customView: {

    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: COLORS.white,
        borderWidth: 8,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: COLORS.black,
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 25, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

      cardDescription: {
        fontSize: 12,
        color: COLORS.black,
      },
      carousel2: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 15,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
      carousel: {
          position: 'absolute',
          bottom: 0,
          marginBottom: 15,
          alignSelf: 'center',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
      },
      cardContainer: {
        backgroundColor: COLORS.white,
        paddingVertical : 15,
        borderRadius: 14,
        paddingHorizontal: 10,
        alignItems: 'stretch',
      },
      cardItemWrapper: {
        flexDirection: 'row',

      }, 
      titleStyles : {
        fontSize: 18,
        textTransform: 'capitalize',
        color: COLORS.black,
        fontWeight: 'bold',
      },
      descriptionText: {
        fontSize: 14,
        textTransform: 'capitalize',
        color: COLORS.darkGray
      },
      selectButton: {
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        paddingHorizontal: 80,
        paddingVertical: 12,
        borderRadius: 14,
    },
    selectButtonText: {
        fontSize: 20,
        color: COLORS.white,
    },
})

export default MapViews;

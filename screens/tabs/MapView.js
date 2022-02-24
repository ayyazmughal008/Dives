import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, Dimensions, Platform,} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { COLORS } from '../../assets/colors/theme';
import {Feather, AntDesign, Entypo} from '@expo/vector-icons';
import diveSitesDat from '../../assets/data/diveSitesDate';
import { FlatList, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TestSearch from '../../components/divelogs/testSearch'


const MapViews = ({navigation, route}) => {
    const {item} = route.params

   const [selectedValue, setSelectedValue] = React.useState({});
  const callback = useCallback((selectedValue) => {
     setSelectedValue(selectedValue);
 }, []);
  let mapView = React.useRef(null);
  const [location, setLocation] = React.useState({});
  const [showcarousel2, setShowCarousel2] = React.useState(false);
  const [first, setfirst] = React.useState(true)
  const diveSitesData =diveSitesDat;
  const [markers, setMarkers] = React.useState([]);  
  const [position, setPosition] = React.useState({
        latitude: 3.235983333,
        longitude: 73.03243333,
        latitudeDelta: 5,
        longitudeDelta: 5,
   });
   const [locationd, setLocationd] = React.useState(null);

 


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
    const OnMarkerPressed2 = (items) => {

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
        if (locationd !== null) {
            setMarkers[locationd].showCallout();
        }
      setShowCarousel2(true)
  
  
  
      }

    const onRegionChangeComplete = () => {
        if(!first) {
            if (markers && markers.current && markers.current.showCallout) {
              markers.current.showCallout();
            }
        }
        else{
            if (locationd !== null) {
                setMarkers[locationd].showCallout(); 
            }
            setfirst(false)
        }    
    };


  
    React,useEffect(() => {
        
        if (item) {
            let pos = diveSitesData.find(x => x.Name === item.title);
            let posIndex = diveSitesData.findIndex(x => x.Name === item.title);
        setLocationd(pos)
            if (pos) {
                if(pos.OBJECTID){
                    setLocationd(posIndex)
                OnMarkerPressed2(pos)
        
                }
            }

        }
    }, [item])

    React.useEffect(() =>{ 
      
    }, [showcarousel2])
  
    React.useEffect(() =>{ 

    }, [markers])
    React.useEffect(() => {

    }, [locationd, location])

    
    React.useEffect(() => {
      if(selectedValue){
        let itemindex = selectedValue.OBJECTID -1
         if(selectedValue.OBJECTID){
          OnMarkerPressed(selectedValue)

          setSelectedValue({})
         }
      }
    }, [selectedValue, markers])





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
                </View>
            </View>}

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
    backIcon: {
      position: 'absolute',
      elevation: 15,
      marginTop:55,
      marginLeft: 15,
      top: 100,
      padding: 50,alignItems: 'stretch',
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

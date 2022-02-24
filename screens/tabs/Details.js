import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Entypo from 'react-native-vector-icons/Entypo';

import {COLORS, colour} from '../../assets/colors/theme';
Entypo.loadFont();

const height= Dimensions.get('window').height;

const Details = ({route, navigation}) => {
    const [favourite, setfavourite] = React.useState(false)

    const {item} = route.params;

    return (
        <View style={styles.detailsContainer}>
            <ImageBackground source= {item.imageBig}
            style={styles.backgroundImage}>
                <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                    <Entypo name='chevron-left' size={32} color={colour.white} />
                </TouchableOpacity>
                <View style={styles.titlesWrapper}>
                    <Text style= {styles.itemTitle}>{item.title}</Text>
                    <View style= {styles.locationWrapper}>
                        <Entypo name='location-pin' size = {24} color={colour.white} />
                        <Text style = {styles.locationText}>{item.location}</Text>
                    </View>
                </View>
            </ImageBackground>
                <View style ={styles.descritptionWrapper}>
                    <View style = {styles.heartWrapper}>
                        <TouchableOpacity onPress= {() => setfavourite(prevState => !prevState)}>

                        <Entypo name = 'heart' size = {32} color ={favourite ? COLORS.primary : colour.gray} />
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.descritptionTextWrapper}>
                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text style = {styles.descriptionText}>{item.description}</Text>
                    </View>
                    <View style = {styles.InfoWrapper}>
                        <View style = {styles.InfoItem}>
                            <Text style = {styles.InfoTitle}>RATING</Text>
                            <View style = {styles.InfoTExtWrapper}>
                                <Text style = {styles.infoText}>{item.rating}</Text>
                                <Text style = {styles.infoSubText}>/5</Text>
                            </View>
                        </View>
                        <View style = {styles.InfoItem}>
                            <Text style = {styles.InfoTitle}>Depth</Text>
                            <View style = {styles.InfoTExtWrapper}>
                                <Text style = {styles.infoText}>{item.depth}</Text>
                                <Text style = {styles.infoSubText}>hours</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style = {styles.buttonWrapper} onPress={() => navigation.navigate('MapView', {item: item})}>
                        <Text style = {styles.buttonTExt}>Explore</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        backgroundColor: colour.white,
    },
    backgroundImage: {
        height:height *0.6,
        justifyContent: 'space-between',
    },
    descritptionWrapper: {
        flex:1,
        backgroundColor: colour.white,
        marginTop: -20,
        borderRadius:25,
    },
    backIcon: {
        marginTop:55,
        marginLeft: 15,
    },
    titlesWrapper: {
        marginHorizontal:20,
        marginBottom: 40,
    },
    itemTitle: {
        fontFamily: 'LatoBold',
        fontSize: 32,
        color: colour.white,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: colour.white,
    },
    heartWrapper: {
        position: 'absolute',
        right:40,
        top: -30,
        width: 64,
        height: 64,
        backgroundColor: colour.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    descritptionTextWrapper: {
        marginTop: 30,
        marginHorizontal: 20,  
    },
    descriptionTitle: {
        fontFamily: 'LatoBold',
        fontSize: 24,
        color: colour.black,
    },
    descriptionText: {
        marginTop: 20,
        fontFamily: 'LatoRegular',
        fontSize: 16,
        color: colour.darkGray,
        height:85,
    },
    InfoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    InfoItem: {

    },
    InfoTitle: {
        fontFamily: 'LatoBold',
        fontSize: 12,
        color: colour.gray,
    },
    InfoTExtWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    infoText: {
        fontFamily: 'LatoBold',
        fontSize: 24,
        color: colour.orange,
    },
    infoSubText: {
        fontFamily: 'LatoBold',
        fontSize: 14,
        color: colour.gray,
    },
    buttonWrapper: {
        marginHorizontal:20, 
        marginTop:40,
        backgroundColor: colour.pink,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 6,
    },
    buttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.white,
    },
})


export default Details;

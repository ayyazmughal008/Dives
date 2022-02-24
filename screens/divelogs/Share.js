import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme, Image, ImageBackground, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo, Feather } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Rating } from 'react-native-ratings';
import FAB from 'react-native-fab';
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, colour } from '../../assets/colors/theme';
import sharemaps from '../../assets/images/divershare.png';
import mapshare from '../../assets/images/mapshare.png';
import logoshare from '../../assets/images/logoshare.png';
import qrcode from '../../assets/images/qrcode.png';
import profile from '../../assets/images/profile.png';
import flag from '../../assets/images/flagmaldives.png';

const height = Dimensions.get('window').height;

const Share = ({ route, navigation }) => {
    const { item } = route.params;
    const viewShot = React.useRef();
    const [colorsch, setcolorsch] = React.useState(true)
    const colorScheme = useColorScheme();
    const [userData, setUserData] = React.useState('');
    React.useEffect(() => {
        bootstrapAsync()
    }, [])
    const bootstrapAsync = async () => {
        let userTokens;
        try {
            userTokens = await AsyncStorage.getItem('signedIn')
            if (userTokens !== null) {
                var obj = JSON.parse(userTokens);
                //console.log(obj)
                setUserData(obj)
            } else {
                console.log('no data found')
            }
        }
        catch {
            console.log('Couldnt get token')
        }
    }


    const MyComponent = () => {
        if (colorScheme === 'dark') {
            setcolorsch(false)
        } else {
            setcolorsch(true)
        }
        console.log(colorScheme)
    }


    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
            console.log("do something with ", uri);
            Sharing.shareAsync("file://" + uri);
        }),
            (error) => console.error("Oops, snapshot failed", error);
    };

    React.useEffect(() => {
        console.log(item)
    }, [item])

    React.useEffect(() => {
        MyComponent();
    }, [])



    return (
        <View style={{ flex: 1, }}>

            <ViewShot
                ref={viewShot}
                options={{ format: "jpg", quality: 0.9 }}
                style={{ flex: 1, borderRadius: 10, }}
            >
                <ImageBackground
                    style={{ flex: 1, backgroundColor: "#1F2037", }} source={require('../../assets/images/share.jpg')} >
                    <View style={{ position: 'absolute', left: 15, top: 15, }}>
                        <Text style={{ color: COLORS.black }}>My Dive Log</Text>

                    </View >
                    {/* <View style={{height: 120}}></View> */}
                    <Image source={mapshare} style={{ height: 120, width: Dimensions.get("window").width, resizeMode: 'contain' }} />
                    <View style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center', top: 100, }}>
                        <Text style={{ fontFamily: 'LatoBold', fontSize: 19, color: COLORS.black, textAlign: 'center', textTransform: 'capitalize' }}>{item.Location.Name}</Text>
                        <Rating
                            type='custom'
                            readonly={true}
                            ratingBackgroundColor={COLORS.darkGray2}
                            ratingCount={5}
                            startingValue={item.Location.LocationRating}
                            fractions={2}
                            tintColor={'#99C1E4'}
                            imageSize={30}
                            jumpValue={0.5}
                            starContainerStyle={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 8,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 6,
                            }}

                        />
                    </View>
                    <View style={{ position: 'absolute', alignSelf: 'center', justifyContent: 'center', top: 145 }}>
                        <Entypo name='location-pin' size={53} color={COLORS.red} />
                        <Text style={{ fontFamily: 'LatoBold', fontSize: 11, color: COLORS.black, textAlign: 'center', marginTop: -8 }}>Maldives</Text>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30, marginTop: 110, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
                            <Entypo name='location-pin' size={20} color={COLORS.black} />
                            <Text style={{ fontFamily: 'LatoRegular', fontSize: 15, color: COLORS.black, width: 200, textTransform: 'capitalize', }} ellipsizeMode='tail' numberOfLines={1}>{item.Location.Atoll}</Text>
                            <Text style={{ fontFamily: 'LatoRegular', fontSize: 17, color: COLORS.black }}> | </Text>
                            <Text style={{ fontFamily: 'LatoRegular', fontSize: 15, color: COLORS.black }}>{item.Date}</Text>
                            {/* <View>
                            <Image source={flag} style={{width: 30, height: 17, resizeMode: 'contain'}}/>
                        </View> */}
                        </View>
                    </View>
                    <View style={styles.descritptionWrapper}>
                        <View style={styles.heartWrapper}>
                            <View style={{ paddingTop: 5 }}>
                                {!userData ?
                                    <Image
                                        source={profile}
                                        style={{
                                            height: 49,
                                            width: 53,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    : !userData.data.image ?
                                        <Image
                                            source={profile}
                                            style={{
                                                height: 49,
                                                width: 53,
                                                resizeMode: 'contain'
                                            }}
                                        />
                                        : <Image
                                            source={{ uri: 'http://157.245.56.243/dives/public/' + userData.data.image }}
                                            style={{
                                                height: 49,
                                                width: 49,
                                                borderRadius:49 / 2,
                                                resizeMode: 'cover'
                                            }}
                                        />
                                }
                                {/* <Image source={profile} style={{ height: 49, width: 53, resizeMode: 'contain' }} /> */}
                            </View>
                        </View>
                        <View style={{ paddingLeft: 90, paddingTop: 25, }}>
                            <Text style={{ fontFamily: 'LatoBold', fontSize: 17, color: COLORS.black }}>John Smith</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, paddingHorizontal: 20, paddingVertical: 10, paddingBottom: 30 }}>
                            <View >
                                <Text style={{ fontFamily: 'LatoBold', fontSize: 17, color: COLORS.black, textAlign: 'center' }}>{item.StartTime}</Text>
                                <View style={{ paddingTop: 10, }}>
                                    <Text style={{ fontFamily: 'LatoRegular', fontSize: 15, color: COLORS.darkpink, textAlign: 'center' }}>Start Time</Text>
                                </View>
                            </View>
                            <View style={{ borderRightWidth: 0.5, borderRightColor: COLORS.darkGray2, height: 55 }}>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'LatoBold', fontSize: 17, color: COLORS.black, textAlign: 'center' }}>{item.EndTime}</Text>
                                <View style={{ paddingTop: 10, }}>
                                    <Text style={{ fontFamily: 'LatoRegular', fontSize: 15, color: COLORS.darkpink, textAlign: 'center' }}>End Time</Text>
                                </View>
                            </View>
                            <View style={{ borderRightWidth: 0.5, borderRightColor: COLORS.darkGray2, height: 55 }}>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'LatoBold', fontSize: 17, color: COLORS.black, textAlign: 'center' }}>{item.Duration}</Text>
                                <View style={{ paddingTop: 10, }}>
                                    <Text style={{ fontFamily: 'LatoRegular', fontSize: 15, color: COLORS.darkpink, textAlign: 'center' }}>Duration</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 0, paddingHorizontal: 20, paddingVertical: 30,
                            borderTopWidth: 0.3, borderColor: COLORS.darkGray2,
                        }}>
                            {(item.Depth.MaxDepth !== null) &&
                                <View >
                                    <Text style={{ fontFamily: 'LatoBold', fontSize: 15, color: COLORS.black, textAlign: 'center' }}>{item.Depth.MaxDepth}</Text>
                                    <View style={{ paddingTop: 10, }}>
                                        <Text style={{ fontFamily: 'LatoRegular', fontSize: 14, color: COLORS.darkpink, textAlign: 'center', }}>Max {"\n"}Depth</Text>
                                    </View>
                                </View>}
                            {(item.WeatherCondition.Visibility !== null) &&
                                <View>
                                    <Text style={{ fontFamily: 'LatoBold', fontSize: 15, color: COLORS.black, textAlign: 'center' }}>{item.WeatherCondition.Visibility}</Text>
                                    <View style={{ paddingTop: 10, }}>
                                        <Text style={{ fontFamily: 'LatoRegular', fontSize: 14, color: COLORS.darkpink, textAlign: 'center' }}>Visibility</Text>
                                    </View>
                                </View>}
                            {(item.Temperature.SurfaceTemperature !== null) &&
                                <View style={{}}>
                                    <Text style={{ fontFamily: 'LatoBold', fontSize: 15, color: COLORS.black, textAlign: 'center' }}>{item.Temperature.SurfaceTemperature}</Text>
                                    <View style={{ paddingTop: 10, }}>
                                        <Text style={{ fontFamily: 'LatoRegular', fontSize: 14, color: COLORS.darkpink, textAlign: 'center', }} numberOfLines={2}>Surface {"\n"}Temperature</Text>
                                    </View>
                                </View>}


                            {(item.WeatherCondition.Weather !== null) &&
                                <View>
                                    <Text style={{ fontFamily: 'LatoBold', fontSize: 15, color: COLORS.black, textAlign: 'center', textTransform: 'capitalize' }}>{item.WeatherCondition.Weather}</Text>
                                    <View style={{ paddingTop: 10, }}>
                                        <Text style={{ fontFamily: 'LatoRegular', fontSize: 14, color: COLORS.darkpink, textAlign: 'center' }}>Weather</Text>
                                    </View>
                                </View>}
                        </View>
                    </View>
                </ImageBackground>

            </ViewShot>
            <Pressable
                style={({ pressed }) => [
                    { ...styles.backIcon, borderRadius: 20, padding: 3 },
                    { backgroundColor: pressed ? COLORS.lightGray1 : null },

                ]}
                onPress={() => navigation.goBack()}
            >
                <Entypo name='cross' size={32} color={COLORS.black} />
            </Pressable>
            <View style={{
                position: 'absolute',
                bottom: 15,
                right: 1
            }}>
                <FAB
                    buttonColor={COLORS.green}
                    onClickAction={() => captureAndShareScreenshot()}
                    visible={true}
                    iconTextComponent={<Entypo name="share" color={COLORS.white} size={40} />}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        // backgroundColor: '#65D4E3',
    },
    backgroundImage: {
        //flex:1,
        height: height * 0.4,
        width: Dimensions.get('window').width,
        justifyContent: 'space-between',
        //marginBottom: -30,
        alignSelf: 'baseline',
        paddingBottom: 45,
        justifyContent: 'flex-end'
    },
    descritptionWrapper: {
        position: 'absolute',
        top: 255,
        alignSelf: 'center',
        width: Dimensions.get("window").width - 30,

        //   backgroundColor: '#69D1E5', 
        // backgroundColor: COLORS.lightGray,
        backgroundColor: 'rgba(105, 209, 229, 0.5)',
        //  opacity: 0.4,
        //     borderColor: COLORS.darkGray3,
        //         shadowColor: "#000",
        // shadowOffset: {
        // 	width: 0,
        // 	height: 4,
        // },
        // shadowOpacity: 0.32,
        // shadowRadius: 5.46,

        // elevation: 9,

        //  borderWidth: 1.5,
        borderRadius: 20,
        marginHorizontal: 10,
        zIndex: 1
        //elevation: 2,   
    },
    backIcon: {
        position: 'absolute',
        top: 35,
        right: 15,
        elevation: 2,
    },
    titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
    },
    itemTitle: {
        fontFamily: 'LatoBold',
        fontSize: 30,
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
        left: 25,
        top: 10,
        width: 50,
        height: 50,
        backgroundColor: colour.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 6,
    },
    shareWrapper: {
        position: 'absolute',
        right: 25,
        top: -30,
        width: 54,
        height: 54,
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
        marginBottom: 30,
        marginHorizontal: 20,
    },
    descriptionTitle: {
        fontFamily: 'LatoBold',
        fontSize: 24,
        color: colour.black,
    },
    descriptionText: {
        marginTop: 5,
        textAlign: 'justify',
        paddingVertical: 5,
        fontFamily: 'PoppinsRegular',
        fontSize: 15,
        marginRight: 5,
        color: COLORS.darkGray,
        //height:85,
    },

    buttonWrapper: {
        marginHorizontal: 20,
        marginTop: 40,
        backgroundColor: colour.pink,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.white,
    },
})


export default Share;

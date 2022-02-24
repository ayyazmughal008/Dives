import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Turtle from '../../assets/icons/turtleicon.png';
import Dolphin from '../../assets/icons/dolphin.png';
import Fish from '../../assets/icons/fish.png';
import Coral from '../../assets/icons/coral.png';
import { COLORS, colour } from '../../assets/colors/theme';
import activitiesData from '../../assets/data/activitiesData';
import discoverData from '../../assets/data/discoverData';
import learnMoreData from '../../assets/data/learnMoreData';
import profile from '../../assets/images/profile.png';
import menu from '../../assets/icons/menu.png';
//import ProfileImage from '../../components/profileImage'

Feather.loadFont();
Entypo.loadFont();

const Home = ({ navigation }) => {

    const [selectedDiscover, setSelectedDiscover] = React.useState('All')
    const [orderDiscover, setOrderDiscover] = React.useState(discoverData)
    const [userData, setUserData] = React.useState('');

    const sortDiscover = (selected) => {
        if (selected == 'All') {
            let sortedAscending = discoverData.sort((a, b) => a.title.localeCompare(b.title))
            setOrderDiscover(sortedAscending)
        } else if (selected == 'Popular') {
            let sortedRating = discoverData.sort((a, b) => a.title.localeCompare(b.title)).reverse()
            setOrderDiscover(sortedRating)
        } else if (selected == 'HighRated') {
            let sortedRating = discoverData.sort((a, b) => parseInt(b.rating) - parseInt(a.rating))
            setOrderDiscover(sortedRating)
        } else if (selected == 'Depth') {
            let sortedDepth = discoverData.sort((a, b) => parseInt(b.depth) - parseInt(a.depth))
            setOrderDiscover(sortedDepth)
        }
        else {
            console.log('hello')
        }
        setSelectedDiscover(selected)
    }

    React.useEffect(() => {
        console.log('effect')
    }, [selectedDiscover])

    const renderDiscoverItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { item: item, })} >
                <ImageBackground
                    source={item.image}
                    style={[styles.discoverItem, { marginLeft: index == 0 ? 15 : 0 },]}
                    imageStyle={styles.discoverItemImage}
                >
                    <View style={{
                        flex: 1, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                        overflow: 'hidden',
                        //marginRight:15,
                        borderRadius: 20,
                    }}>

                        <Text style={styles.discoverItemTitles}>{item.title}</Text>
                        <View style={styles.discoverItemLocationWrapper}>
                            <Entypo name="location-pin" size={18} color={colour.white} />
                            <Text style={styles.discoverItemLocationText}>{item.location}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    };

    const renderLearnMoreItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('LearnMore', { item: item, })}>

                <ImageBackground
                    source={item.image}
                    style={[styles.learnMoreItem, {
                        marginLeft: item.id == 'learnMore-1' ? 20 : 0,
                    },]}
                    imageStyle={styles.learnMoreItemImage}
                >
                    <Text style={styles.learnMoreItemText}>{item.title}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    };

    const renderActivityItem = ({ item }) => {
        return (
            <View style={[styles.activityItemWrapper, {
                marginLeft: item.id == 'activities-1' ? 20 : 0,
            }]}
            >
                <View style={{ flexDirection: 'row', paddingBottom: 10, paddingTop: 15 }}>
                    <View >
                        <TouchableOpacity style={{ ...styles.activitiesCircle, backgroundColor: item.color }}
                            onPress={() => navigation.navigate('Explore', { item: item, })}
                        >
                            <Image source={item.image} style={{
                                height: 40, width: 50, resizeMode: 'contain'
                            }} />
                        </TouchableOpacity>
                        <Text style={styles.circleText}>{item.title}</Text>
                    </View>
                </View>
            </View>
        )
    };
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
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            bootstrapAsync()
        });
        return unsubscribe;
    }, []);



    return (
        <View style={styles.homeContainer}>
            <ScrollView>
                {/*Header */}
                <SafeAreaView>
                    <View style={styles.menuWrapper}>
                        <TouchableOpacity
                            style={{ paddingHorizontal: 15, paddingBottom: 15, paddingTop: 3 }}
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                            <Image source={menu}
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 2,
                                    resizeMode: 'contain'
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileScreen')}>
                            {!userData ?
                                <Image
                                    source={profile}
                                    style={{
                                        width: 65,
                                        height: 65,
                                        borderRadius: 14,
                                        overflow: 'hidden',
                                        borderRadius: 999
                                    }}
                                />
                                : !userData.data.image ?
                                    <Image
                                        source={profile}
                                        style={{
                                            width: 65,
                                            height: 65,
                                            borderRadius: 14,
                                            overflow: 'hidden',
                                            borderRadius: 999
                                        }}
                                    />
                                    : <Image
                                        source={{ uri: 'http://157.245.56.243/dives/public/' + userData.data.image }}
                                        style={{
                                            width: 65,
                                            height: 65,
                                            borderRadius: 14,
                                            overflow: 'hidden',
                                            borderRadius: 999
                                        }}
                                    />
                            }
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                {/* Discover */}
                <View style={styles.discoverWrapper}>
                    <Text style={styles.discoverTitle}>Discover</Text>
                    <View style={styles.discoverCatagoriesWrapper}>
                        <TouchableOpacity onPress={() => sortDiscover('All')}>
                            <Text style={{
                                ...styles.discoverCatagoryText,
                                color: (selectedDiscover == 'All') ? colour.orange : colour.gray
                            }}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sortDiscover('Popular')}>
                            <Text style={{
                                ...styles.discoverCatagoryText,
                                color: (selectedDiscover == 'Popular') ? colour.orange : colour.gray
                            }}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sortDiscover('HighRated')}>
                            <Text style={{
                                ...styles.discoverCatagoryText,
                                color: (selectedDiscover == 'HighRated') ? colour.orange : colour.gray
                            }}>High-Rated</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sortDiscover('Depth')}>
                            <Text style={{
                                ...styles.discoverCatagoryText,
                                color: (selectedDiscover == 'Depth') ? colour.orange : colour.gray
                            }}>Depth</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.discoverItemsWrapper}>
                        <FlatList
                            data={orderDiscover}
                            renderItem={renderDiscoverItem}
                            keyExtractor={(item, index) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                {/* Explore */}
                <View style={styles.activitiesWrapper}>
                    <Text style={styles.activitiesTitle}>Explore</Text>

                </View>


                <FlatList
                    data={activitiesData}
                    renderItem={renderActivityItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 20, marginLeft: -20 }}
                />

                {/* Learn More */}
                <View style={styles.learnMoreWrapper}>
                    <Text style={styles.learnMoreTitle}>Learn More</Text>
                    <View style={styles.learnMoreItemsWrapper}>
                        <FlatList
                            data={learnMoreData}
                            renderItem={renderLearnMoreItem}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        color: colour.white,
        marginBottom: 20,
    },
    menuWrapper: {
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuIcon: {

    },
    profileImage: {
        width: 20,
        height: 52,
        borderRadius: 20,
    },
    discoverWrapper: {
        marginTop: 15,
    },
    discoverTitle: {
        marginHorizontal: 20,
        fontFamily: 'LatoBold',
        fontSize: 32,
    },
    discoverCatagoriesWrapper: {
        marginLeft: 0,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingTop: 10,
    },
    discoverCatagoryText: {
        marginRight: 30,
        fontFamily: 'LatoRegular',
        fontSize: 16,
        color: colour.gray,
        //fontWeight: 'bold',
    },
    discoverItemsWrapper: {
        paddingBottom: 20,
    },
    discoverItem: {
        width: 160,
        height: 250,
        marginRight: 15,
        borderRadius: 20,
    },
    discoverItemImage: {
        borderRadius: 20,
    },
    discoverItemTitles: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.white,
    },
    discoverItemLocationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    discoverItemLocationText: {
        marginLeft: 5,
        fontFamily: 'LatoBold',
        fontSize: 14,
        color: colour.white,
    },
    activitiesWrapper: {
        marginTop: 10,
    },
    activitiesTitle: {
        marginHorizontal: 20,
        fontFamily: 'LatoBold',
        fontSize: 24,
        color: colour.black,
    },
    activitiesItemsWrapper: {
        paddingVertical: 20,
    },
    activityItemWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 0,
    },
    acitivityItemImage: {

    },
    activityItemText: {
        marginTop: 5,
        fontFamily: 'LatoBold',
        fontSize: 14,
        color: colour.gray,
    },
    activitiesCircle: {
        marginLeft: 22,
        width: 67,
        height: 65,
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
    circleText: {
        fontSize: 11,
        fontFamily: "LatoBold",
        color: COLORS.darkGray2,
        textAlign: 'center',
        paddingLeft: 22,
        paddingTop: 9,
        paddingVertical: 5
    },
    learnMoreWrapper: {
        marginTop: 10,
    },
    learnMoreTitle: {
        marginHorizontal: 20,
        fontFamily: 'LatoBold',
        fontSize: 24,
        color: colour.black,
    },
    learnMoreItemsWrapper: {
        paddingVertical: 20,
    },
    learnMoreItem: {
        width: 170,
        height: 180,
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    learnMoreItemImage: {
        borderRadius: 20,
    },
    learnMoreItemText: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        textTransform: 'capitalize',
        color: colour.white,
        marginHorizontal: 10,
        marginVertical: 20,
    },
})


export default Home;

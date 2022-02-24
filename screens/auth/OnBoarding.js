import React from 'react';
import {View, StyleSheet, Text, ImageBackground, Image, Animated} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES, colour } from '../../assets/colors/theme';
import logo from '../../assets/images/logo.png' ;
import TextButton from '../../components/auth/TextButton';

const onboardingData = [
    {
        id: 1,
        title: 'Log your Dives',
        text: 'Fun or training dive, record your diving data all over Maldives',
        bannerImage: require('../../assets/images/Onboard1.png'),
        backgroundImage: require("../../assets/images/background01.png"),

    },
    {
        id: 2,
        title: 'Upload your photos',
        text: 'Upload photos as memories or to keep track of your dives',
        bannerImage: require('../../assets/images/Onboard2.png'),
        backgroundImage: require("../../assets/images/background02.png"),

    },
    {
        id: 3,
        title: 'Share with your friends',
        text: 'Share your dives with your friends and dive buddies',
        bannerImage: require('../../assets/images/Onboard3.png'),
        backgroundImage: require("../../assets/images/background01.png"),
    },
];


const OnBoarding2 = ({navigation}) => {


    const scrollx = React.useRef(new Animated.Value(0)).current;
    const flatListRef = React.useRef()

    const [currentIndex, setCurrenIndex] =React.useState(0)

    const onViewChangeRef = React.useRef(({ viewableItems, changed}) => {
        setCurrenIndex(viewableItems[0].index)
    })

    const Dots = () => {

        const dotPosition = Animated.divide(scrollx, SIZES.width)
        return (
            <View style ={{
                flexDirection: 'row',
                alignItems:'center',
                justifyContent: 'center',
            }}>
                {
                    onboardingData.map((item,index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [COLORS.lightpink, COLORS.darkpink1, COLORS.lightpink],
                            extrapolate: 'clamp'
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: 'clamp'
                        })

                        return (
                            <Animated.View 
                            key={`dot-${index}`}
                            style= {{
                                borderRadius: 5,
                                marginHorizontal: 6,
                                width: dotWidth,
                                height: 10,
                                backgroundColor:dotColor,
                            }} />
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View
            style = {{
                flex:1,
                backgroundColor: COLORS.white,
            }}>         
           {/* onboardingitems */}
            <View style = {{
                flex:1 
            }}>
                <Animated.FlatList 
                    ref={flatListRef}
                    horizontal 
                    pagingEnabled
                    data={onboardingData}
                    scrollEventThrottle ={16}
                    snapToAlignment = 'center'
                    showsHorizontalScrollIndicator ={false}
                    onScroll = {Animated.event(
                        [
                            {nativeEvent: {contentOffset: { x: scrollx}}}
                        ],
                        {useNativeDriver: false}
                    )}
                    onViewableItemsChanged= {onViewChangeRef.current}
                    keyExtractor = {(item) => `${item.id}`}
                    renderItem ={({ item, index}) => {
                        return(
                            <View 
                                style ={{
                                    width: SIZES.width
                                }}>
                                    
                                {/*Header */}
                                <View 
                                    style ={{
                                        flex:3 ,
                                    }}>
                                    <ImageBackground
                                        source={item.backgroundImage}
                                        style={{
                                            flex:1,
                                            alignItems: 'center',
                                            justifyContent:'flex-end',
                                            height: index == 1 ? "90%" : "100%",
                                            width: "100%",
                                        }} >
                                        <Image 
                                            source = {item.bannerImage}
                                            resizeMode ='contain'
                                            style ={{
                                                width: SIZES.width * 1,    
                                                height: SIZES.width * 0.9, 
                                                marginBottom: -25,
                                            }} 
                                        />
                                    </ImageBackground>
                                </View>
                                    
                                {/*Detail */}
                                <View
                                    styles ={{
                                        
                                        marginTop: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: SIZES.radius,
                                    }}>
                                    <Text style= {{
                                        fontFamily: 'PoppinsBold',
                                        textAlign: 'center',
                                        fontSize: 25,
                                    }}>
                                        {item.title}
                                    </Text>
                                    <Text style = {{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        color: COLORS.darkGray2,
                                        paddingHorizontal: SIZES.padding,
                                        fontFamily: 'PoppinsRegular',
                                        fontSize: 16,
                                    }} >
                                        {item.text}
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                />

                {/*logo */}
                <View
                    style = {{
                        position: 'absolute',
                        top: SIZES.height >800 ? 50: 28,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}>
                    <Image
                        source = {logo}
                        resizeMode= 'contain'
                        style ={{
                            width: SIZES.width * 0.19,
                            height: 100,
                            borderRadius: 15,
                            marginTop: 5,
                    }} />
                    <Text 
                        style= {{
                            fontFamily: 'PoppinsBold',
                            fontSize: 40,
                            color: COLORS.gray,
                            color: colour.blue,
                            padding: 11,
                            paddingTop: 25
                        }} >
                        IVES
                    </Text>
                </View>

                {/*Footer */}
                <View style= {{
                    height: 200,
                }}>
                    {/*Pagination/ Dots */}
                    <View style={{
                        flex:1,
                        justifyContent: 'center',
                    }}>
                        <Dots />
                    </View>

                    {/*Button */}
                    {currentIndex < onboardingData.length -1 && 
                    <View style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZES.padding,
                        marginVertical: SIZES.padding
                    }}>
                        <TextButton label = 'Skip' 
                        buttonContainerStyle={{
                            backgroundColor: null
                        }} 
                        labelStyle ={{
                            color: COLORS.darkGray2,
                            paddingTop: 25,
                        }}
                        onPress={() => navigation.replace("SignIn")} />

                        <TextButton label = 'Next' 
                        buttonContainerStyle={{
                            height:60, 
                            width: 200, 
                            borderRadius: SIZES.radius
                        }} 
                        
                        onPress={() => {

                                flatListRef?.current?.scrollToIndex({
                                    index: currentIndex +1,
                                    animated: true
                                }) 

                        }} />
                    </View>
                    }

                    {currentIndex == onboardingData.length -1 &&
                        <View style ={{
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding
                        }}>
                            <TextButton label = "Let's Get Started!"
                                buttonContainerStyle = {{
                                    height: 60,
                                    borderRadius: SIZES.radius 
                                }}
                                labelStyle ={{
                                    color: COLORS.white
                                }}
                                onPress = {() => navigation.replace ("initialauth")} 
                            />
                        </View>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default OnBoarding2;

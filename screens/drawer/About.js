import React from 'react';
import {View, StyleSheet, Text, useColorScheme, Pressable, ImageBackground, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

import { COLORS, colour } from '../../assets/colors/theme';


const About = ({navigation}) => {

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

    const  handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('https://sigsmaldives.org/what-we-do');
    };

    React.useEffect(() => {
        MyComponent();
    }, [])

    return (
        <View style={{flex: 1, 
        // backgroundColor:"#dbe02",
        backgroundColor: "#BFEEFF"
        }}>
            <ImageBackground style = {{flex: 1,}} source = {require('../../assets/images/about.png')}>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable 
            style= {({pressed}) => [
                styles.backIcon,
                {marginLeft: 15,},
                {backgroundColor: pressed? COLORS.lightGray1 : null},
                {borderRadius: pressed? 20 : null}
            ]} 
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
                <Entypo name='chevron-left' size={32} color={colour.darkGray} />
                {/* <MaterialIcons name = "keyboard-backspace" size={35} color={COLORS.black}/> */}

            </Pressable>
                <View 
            style= {{width: 250,
                height:220,
                marginTop: -20,
                 borderRadius: 2,
            }} />
                </View>
               
            <View style = {{marginTop: -40}}>
                <Text style={{...styles.subHeader, color: COLORS.darkGray3}}>Dives MV</Text>
                <Text style={{...styles.Header, color: colorsch? COLORS.black : COLORS.black}}>Small Islands Geographic Society (SIGS)</Text>
                <Text style={{...styles.maintext, textAlign: 'justify'}}>We are a NGO registered in the Maldives to create an 
                interest among young people and building new generations who are interested 
                on the unique environment, geography, and the livelihood of small islands. 
                The organisation has been founded by a group of individuals consisting of 
                professional environmental consultants with more than 20 years of working 
                in the Maldives. As such, SIGS will collaborate genuine, knowledgeable, 
                and practical ideas and concepts that positively impact the small island 
                environment and its people. </Text>
            </View>
            
            <View>
                <TouchableOpacity style={styles.buttonWrapper}
                onPress={() => handleOpenWithWebBrowser()}>
                    <Text style={{...styles.subHeader, color: COLORS.black}}>Go to our website </Text>
                    <MaterialIcons name = "horizontal-rule" size={40} color={COLORS.black}/>
                    
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backIcon: {
        marginTop:48,
        marginLeft: 10,
        width: 35,
        height:37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Header: {
        marginHorizontal: 10,
        fontFamily: 'LatoBold',
        fontSize:28,
        textAlign: 'center',
        //color: COLORS.black,
    },
    subHeader: {
        fontFamily: 'LatoBold',
        fontSize:17,
        padding: 12,
        color: COLORS.darkGray2,
        textAlign: 'center',
    },
    maintext: {
        fontFamily: 'LatoBold',
        fontSize:17,
        padding: 12,
        textAlign: 'center',
        color: COLORS.darkGray, 
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    buttonWrapper:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: 80,
    }

})

export default About;

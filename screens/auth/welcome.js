import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import {View, StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS } from '../../assets/colors/theme';

const Welcome = ({navigation}) => {
    return (
        <View style= {{flex: 1,}}>
            <ImageBackground style = {{flex: 1}} source = {require('../../assets/images/welcome3.jpg')}>
                <View style = {{
                    position: 'absolute',
                    top: "63%",
                    bottom: "5%",
                }}>
                <Text style = {{
                    marginHorizontal: 20,
                    fontFamily: 'LatoBold',
                    fontSize:32,
                    color: COLORS.white}}>Dives Maldives</Text>
                <Text style ={{
                    marginTop: 10,
                    paddingVertical: 5,
                    marginBottom: 15,
                    marginHorizontal: 20,
                    fontFamily: 'LatoRegular',
                    fontSize:15,
                    color: COLORS.white
                }}>Find popular dive locations and log your dives anywhere in Maldives</Text>
                <TouchableOpacity style = {styles.createLogButtonWrapper} onPress= {() => navigation.navigate('SignIn')}>
                    <Text style = {styles.createLogButtonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.createLogButtonWrapper} onPress= {() => navigation.navigate('SignUp')}>
                    <Text style = {styles.createLogButtonText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    createLogButtonWrapper: { 
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5,
        borderWidth: 2,
        width: Dimensions.get('window').width- 30,
        borderColor: COLORS.white,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 80,

         //shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.36,
        // shadowRadius: 6.68,
        // elevation: 11,
    },
    createLogButtonText: {
        fontFamily: 'LatoBold',
        fontSize: 22,
        color: COLORS.white,
    },
})

export default Welcome;

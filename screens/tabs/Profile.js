import React from 'react';
import { View, Text, StyleSheet , Button, Image, Pressable, Share} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions } from '@react-navigation/native';
import * as ImageManipulator from "expo-image-manipulator";
import Applogo from '../../assets/icon.png';

import {colour, COLORS} from '../../assets/colors/theme';
import Profileimage from '../../components/tabs/profileImage';

Feather.loadFont();

const Profile = ({navigation}) => {

    const onShare = async () => {
        try {
            const exampleImageUri = Image.resolveAssetSource(Applogo).uri          
            let imageProc = await ImageManipulator.manipulateAsync(exampleImageUri);
            const result = await Share.share({
                title: 'Download Dives Mv on Andoid and iOS and start logging your dives today!',
                message: 'Download Dives Mv on Andoid and iOS and start logging your dives today!',
                url: imageProc.uri,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
              console.log('shared successfully')
            } else {
              // shared
              console.log('success')
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
            console.log('dismissed')
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <View  style={styles.containerLogs}>
            {/*Header */} 
            <View style={{flexDirection: 'row', justifyContent: 'space-between', 
                }}>
                <Pressable 
                    style= {({pressed}) => [
                        styles.backIcon,
                        {backgroundColor: pressed? COLORS.lightGray1 : null},
                        {borderRadius: pressed? 20 : null},
                        {marginTop: 63,
                            marginHorizontal: 23,}
                    ]} 
                        onPress={() => navigation.goBack()}      
                    >
                    <Entypo name='chevron-left' size={32} color={colour.darkGray} />
                </Pressable>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate( 'ProfileScreen')}>
                    <Profileimage />
                </TouchableOpacity> */}
            </View>
                <Text style ={{...styles.discoverTitle, marginTop: 20}}>Invite Friends</Text>
            <View style={styles.containercreateLogs}>
                <View style ={styles.createLogTextWrapper}>
                    <Text style={styles.createLogText}>It's always better with friends!</Text>
                </View>
                <TouchableOpacity style = {styles.createLogButtonWrapper} 
                onPress= {() => onShare()}
                >
                    <Text style = {styles.createLogButtonText}>Invite Friends!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerLogs: {
        flex: 1, 
        color: colour.white,
    },
    menuWrapper: {
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileImage: {
        width:20,
        height:52,
        borderRadius:10,
    },
    containercreateLogs:{
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    createLogTextWrapper: {
        marginTop: 180,
        marginHorizontal: 40,
        marginBottom: 20,
    },
    createLogText:{
        fontFamily: 'LatoRegular',
        fontSize: 36,
        textAlign:'center',
        color: colour.darkGray,
    },
    createLogButtonWrapper: {
        marginHorizontal:20, 
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: colour.pink,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 13,
        paddingHorizontal: 40,
        borderRadius: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        
        elevation: 11,
    },
    createLogButtonText: {
        fontFamily: 'LatoBold',
        fontSize: 25.5,
        color: colour.white,
    },
    discoverTitle: {
        marginTop: 63,
        marginHorizontal: 23,
        fontFamily: 'LatoBold',
        fontSize:32,
    },
})

export default Profile;

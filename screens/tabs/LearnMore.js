import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, Share, Image} from 'react-native';
import { useFonts } from 'expo-font';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import Entypo from 'react-native-vector-icons/Entypo';
import {FontAwesome5 } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing'; 
import * as ImageManipulator from "expo-image-manipulator";
import Shipwreck from '../../assets/images/shipwreck.jpg'
// import * as mime from 'react-native-mime-types';


// import Share from 'react-native-share';

import {COLORS, colour} from '../../assets/colors/theme';
Entypo.loadFont();

const height= Dimensions.get('window').height;

const LearnMore = ({route, navigation}) => {
    const [favourite, setfavourite] = React.useState(false)

    const {item} = route.params;


    const openShareDialogAsync = async (item) => {
        if (!(await Sharing.isAvailableAsync())) {
          alert(`Uh oh, sharing isn't available on your platform`);
          return;
        }
        const exampleImageUri = Image.resolveAssetSource(item.image).uri          
        let imageProc = await ImageManipulator.manipulateAsync(exampleImageUri);
        const options = {
            mimeType: 'image/jpeg',
            dialogTitle: item.title,
        };
        const result = await Sharing.shareAsync(imageProc.uri, options);

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
      }; 


    const onShare = async (item) => {
        try {
            const exampleImageUri = Image.resolveAssetSource(item.image).uri          
            let imageProc = await ImageManipulator.manipulateAsync(exampleImageUri);
            const result = await Share.share({
                title: item.title,
                message: item.title,
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
        <View style={styles.detailsContainer}>
            <ScrollView>

            <ImageBackground source= {item.image}
            style={styles.backgroundImage}>
                <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                    <Entypo name='chevron-left' size={32} color={colour.white} />
                </TouchableOpacity>
                <View style={styles.titlesWrapper}>
                    <Text style= {styles.itemTitle}>{item.title}</Text>
                    <View style= {styles.locationWrapper}>
                        <Text style = {styles.locationText}>{item.author}</Text>
                    </View>
                </View>
            </ImageBackground>
                <View style ={styles.descritptionWrapper}>
                    <View style = {styles.heartWrapper}>
                        <TouchableOpacity style={{paddingTop: 5}}
                         onPress= {() => setfavourite(prevState => !prevState)}>
                        <Entypo name = 'heart' size = {29} color ={favourite ? COLORS.primary : colour.gray} />
                        </TouchableOpacity>
                    </View>
                    {/* <View style = {styles.shareWrapper}>
                        <TouchableOpacity style= {{padding: 3}} onPress={() => openShareDialogAsync(item)}>
                        <FontAwesome5 name="share-alt" size={24} color={COLORS.blue} />
                        </TouchableOpacity>
                    </View> */}
                    <View style = {styles.shareWrapper}>
                        <TouchableOpacity style= {{padding: 3}} onPress={() => onShare(item)}>
                        <FontAwesome5 name="share-alt" size={24} color={COLORS.blue} />
                        </TouchableOpacity>
                    </View>
                    <View>

                    <View style = {styles.descritptionTextWrapper}>
                        
                        <Text style={styles.descriptionTitle}>{item.articleText?.Header1}</Text>
                        <Text style = {styles.descriptionText}>{item.articleText?.Text1}</Text>
                        <Text style={styles.descriptionTitle}>{item.articleText?.Header2}</Text>
                        <Text style = {styles.descriptionText}>{item.articleText?.Text2}</Text>
                        <Text style={styles.descriptionTitle}>{item.articleText?.Header3}</Text>
                        <Text style = {styles.descriptionText}>{item.articleText?.Text3}</Text>
                        <Text style={styles.descriptionTitle}>{item.articleText?.Header4}</Text>
                        <Text style = {styles.descriptionText}>{item.articleText?.Text4}</Text>
                        <Text style={styles.descriptionTitle}>{item.articleText?.Header5}</Text>
                        <Text style = {styles.descriptionText}>{item.articleText?.Text5}</Text>
                        
                    </View>
                   
                    <View>
                        <Text style={{marginHorizontal: 20, textAlign: 'center',
                    color: COLORS.darkGray2, fontSize: 13}}>End of Article</Text>
                    </View>
                        </View>
                </View>
                    </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        backgroundColor: colour.white,
    },
    backgroundImage: {
        height:height *0.33,
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
        right:75,
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
    shareWrapper: {
        position: 'absolute',
        right:25,
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
        marginHorizontal:20, 
        marginTop:40,
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


export default LearnMore;

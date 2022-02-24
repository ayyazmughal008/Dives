import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

import { COLORS } from '../../assets/colors/theme';

const Uplaodphoto = (props) => {
    const [image, setImage] = useState(null);
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            //allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));

        if (!_image.cancelled) {
            setImage(_image.uri);
        }
    }

    const checkForCameraRollPermission = async () => {
        let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log("Please grant camera roll permissions inside your system's settings");
        } else {
            console.log('Media Permissions are granted')
        }

    }

    useEffect(() => {
        checkForCameraRollPermission()
    }, []);

    return (
        <View>
            <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.uploadPhotoButton}
                    onPress={props.addImage}>
                    {/* <Image style = {styles.uplaodphotoImage} 
                        source = {require('../assets/icons/uploadphoto.png')} /> 
                        <Feather name = 'image' size = {40} color= {COLORS.darkGray} />
                    */}
                    {/* <Text style = {styles.uplaodphototext}>Upload Image</Text> */}
                    <MaterialIcons name='add-a-photo' size={20} color={COLORS.darkGray2} />
                </TouchableOpacity>
                <View style={styles.uplaodedImage}>
                    {
                        props.image === "" || !props.image ?
                            <View />
                            : <Image
                                source={{ uri: props.image }}
                                style={{ width: 50, height: 50 }}

                            />
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    uploadPhotoButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray2,
        borderColor: COLORS.lightGray1,
        borderWidth: 2,
        borderRadius: 8,
        width: 40,
        // height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 5,
    },
    uplaodphotoImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    uplaodphototext: {
        fontFamily: 'LatoRegular',
        fontSize: 15,
        color: COLORS.darkGray2,
        paddingHorizontal: 15,
    },
    uplaodedImage: {
        elevation: 2,
        height: 50,
        width: 50,
        backgroundColor: COLORS.lightblue4,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 5,
    },
})

export default Uplaodphoto;

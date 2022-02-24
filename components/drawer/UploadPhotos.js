import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../assets/colors/theme';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const Uploadphotos = (props) => {
    // const [image, setImage] = useState(null);
    // const addImage = async () => {
    //     let _image = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4,3],
    //         quality: 1,
    //     });
    //     console.log(JSON.stringify(_image));

    //     if (!_image.cancelled) {
    //         setImage(_image.uri);
    //     }
    // }

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
        <View style={styles.container}>
            {
                props.image && <Image source={{ uri: props.image }} style={{ width: 200, height: 200 }} />
            }
            <View style={styles.uploadBtnContainer}>
                <TouchableOpacity
                    onPress={props.addImage}
                    style={styles.uploadBtn} >
                    <Text style={{ color: COLORS.white }}>
                        {props.image ? 'Change' : 'Upload'}
                        Image
                    </Text>
                    <AntDesign name="camera" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 4,
        height: 200,
        width: 200,
        backgroundColor: COLORS.lightblue4,
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',

    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.darkGray3,
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },

})

export default Uploadphotos;

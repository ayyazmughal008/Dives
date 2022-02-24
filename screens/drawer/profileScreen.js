import React from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';

import Uploadphotos from '../../components/drawer/UploadPhotos';
import { COLORS, colour } from '../../assets/colors/theme';
import { auth } from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profilescreen = ({ navigation }) => {

    const [username, setusername] = React.useState('');
    const [editprofile, seteditprofile] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false);
    const [image, setImage] = React.useState(null);
    const [userData, setUserData] = React.useState('');
    const [file, setFile] = React.useState("")

    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(JSON.stringify(_image));
        let data = {
            name: Date.now() + '_Dives',
            type: 'image/jpeg',
            uri: _image.uri
        }
        if (!_image.cancelled) {
            setImage(_image.uri);
            setFile(data)
        }
        _handleSubmit(data)
    }
    const toggleeditprofile = () => seteditprofile(previousState => !previousState)

    React.useEffect(() => {
        bootstrapAsync()
    }, [])
    const bootstrapAsync = async () => {
        let userTokens;
        try {
            userTokens = await AsyncStorage.getItem('signedIn')
            if (userTokens !== null) {
                var obj = JSON.parse(userTokens);
                console.log(obj)
                setUserData(obj)
            } else {
                console.log('no data found')
            }
        }
        catch {
            console.log('Couldnt get token')
        }
    }
    const _handleSubmit = (file) => {
        setLoading(true)
        const body = new FormData();
        body.append('userId', userData.data._id);
        body.append('name', username);
        body.append('email', userData.data.email);
        body.append('image', file);
        fetch(`http://157.245.56.243/dives/public/api/update-profile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                console.log('response ==>', json)
                if (json.status == 200) {
                    try {
                        AsyncStorage.setItem('signedIn', JSON.stringify(json)
                            , err => {
                                if (err) {
                                    console.log(err)
                                }
                                bootstrapAsync()
                            });
                    } catch {
                        console.log("Coudn't access async storage")
                    }
                } else {
                    Alert.alert('', json.message)
                }

            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
    }
    React.useEffect(() => {
        if (!editprofile) {
            if(userData){
                _handleSubmit(null)
            }
        }
    }, [editprofile])

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, padding: 10 }}>
            <View style={styles.optionsWrapper}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 45, }}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.backIcon,
                            { backgroundColor: pressed ? COLORS.lightGray1 : null },
                            { borderRadius: pressed ? 20 : null }
                        ]}
                        onPress={() => navigation.navigate('Dashboard', {screen: 'TabNavigator', params: { screen: 'Home'}})}
                    >
                        <Entypo name='chevron-left' size={32} color={colour.white} />
                    </Pressable>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            alignSelf: 'center', fontFamily: 'LatoBold',
                            fontSize: 20, color: COLORS.white, padding: 5
                        }}>
                            Profile
                        </Text>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.backIcon,
                            { backgroundColor: pressed ? COLORS.lightGray1 : null },
                            { borderRadius: pressed ? 20 : null }
                        ]}
                        onPress={() => toggleeditprofile()}
                    >
                        <Feather name='edit-2' size={25} color={colour.white} />
                    </Pressable>
                </View>
                <View style={{ marginTop: 70, marginBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <Uploadphotos
                        image={!userData ? image
                            : !userData.data.image ? image
                                : 'http://157.245.56.243/dives/public/' + userData.data.image}
                        addImage={() => addImage()}
                    />
                </View>
                <View>
                    <Text style={styles.subHeader}>{auth.currentUser?.email}</Text>
                    {!editprofile ?
                        <TextInput
                            style={{ ...styles.Header, backgroundColor: editprofile ? COLORS.darkGray : null, }}
                            onChangeText={text => setusername(text)}
                            value={!userData ? "" : userData.data.name}
                            editable={editprofile}
                        />
                        : <TextInput
                            style={{ ...styles.Header, backgroundColor: editprofile ? COLORS.darkGray : null, }}
                            onChangeText={text => setusername(text)}
                            value={username}
                            editable={editprofile}
                        />
                    }
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: Dimensions.get('window').height - 190, }}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.profileOptionsIcon,
                            { backgroundColor: pressed ? COLORS.darkGray3 : COLORS.lightGray1 },
                            { borderRadius: 20 }
                        ]}
                        onPress={() => navigation.navigate('Dashboard', { screen: 'TabNavigator', params: { screen: 'Dive Logs' } })}>
                        <Feather name="list" size={30} color={COLORS.darkGray2} />
                        <Text style={{ ...styles.subHeader, color: COLORS.darkGray2, fontSize: 14 }}>Dive Logs</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.profileOptionsIcon,
                            { backgroundColor: pressed ? COLORS.darkGray3 : COLORS.lightGray1 },
                            { borderRadius: 20 }
                        ]}
                        onPress={() => navigation.navigate('Photos')}>
                        <Feather name="image" size={30} color={COLORS.darkGray2} />
                        <Text style={{ ...styles.subHeader, color: COLORS.darkGray2, fontSize: 14 }}>Photos</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.profileOptionsIcon,
                            { backgroundColor: pressed ? COLORS.darkGray3 : COLORS.lightGray1 },
                            { borderRadius: 20 }
                        ]}
                        onPress={() => navigation.navigate('Profile')}>
                        <Feather name="users" size={30} color={COLORS.darkGray2} />
                        <Text style={{ ...styles.subHeader, color: COLORS.darkGray2, fontSize: 14 }}>Invite Friends</Text>
                    </Pressable>
                </View>
            </View>
            {isLoading &&
                <ActivityIndicator
                    size='large'
                    color='#000'
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    optionsWrapper: {
        padding: 10,
        position: 'absolute',

        height: Dimensions.get('window').height - 240,
        width: Dimensions.get('window').width,
        // backgroundColor:"#3895d3",
        //backgroundColor: "#199baa",
        backgroundColor: COLORS.lightblue1,
        //marginBottom: -20,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.23,
        // shadowRadius: 2.62,

        elevation: 2,
    },
    backIcon: {
        //marginTop:48,
        marginLeft: 1,
        width: 35,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileOptionsIcon: {
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        //elevation: 2,

    },
    Header: {
        marginHorizontal: 10,
        fontFamily: 'LatoBold',
        fontSize: 28,
        color: COLORS.white,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 6,
        width: 250,
    },
    subHeader: {
        fontFamily: 'LatoBold',
        fontSize: 16,
        padding: 12,
        color: COLORS.lightGray1,
        textAlign: 'center',
    },
})

export default Profilescreen;

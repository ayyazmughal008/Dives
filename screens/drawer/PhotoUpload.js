import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, Image, Alert, ActivityIndicator, Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DrawerActions } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../../components/divelogs/FormInput';
import divelog from '../../assets/data/divelog'
import menu from '../../assets/icons/menu.png';
import Profileimage from '../../components/tabs/profileImage';
import { COLORS, colour } from '../../assets/colors/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import GridImageView from 'react-native-grid-image-viewer';

const Photos = ({ navigation }) => {
    const DIVE_LOG = 'divelog';
    const [date, setDate] = React.useState(new Date())
    const [show, setShow] = React.useState(false)
    const [textDate, setTextDate] = React.useState('')
    const [noOfPhotos, setNoOfPhotos] = React.useState('0');
    const [selectedLanguage, setSelectedLanguage] = React.useState('');
    const [selectedView, setSelectedView] = React.useState('grid');
    const [firstopen, setfirstopen] = React.useState(true)
    const [photoordered, setphotosordered] = React.useState(divelog)
    const [imagedata, setimagedata] = React.useState()
    const [divelogs, setdivelogs] = React.useState(null)
    const [orderdivelogs, setOrderDivelogs] = React.useState([])
    const [imagesArr, setImagesArr] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)
    const [userData, setUserData] = React.useState('');
    const gallery = ["https://assets.weforum.org/article/image/responsive_big_webp_xLcwCseHFMM51BOggbh2-Q-EFQPLm0pLRdHXvMYh60o.webp" , "https://www.zubludiving.com/imager/images/Articles/Best-coral-reef-diving/25115/Best-Coral-Reef-Diving-Asia-Banner_d41d8cd98f00b204e9800998ecf8427e.webp"      ];
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
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios' ? true : false);
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let month = tempDate.getMonth() + 1
        let fDate = tempDate.getDate() + '/' + month + '/' + tempDate.getFullYear();
        retrievefunction(userData.data._id, fDate)
        setTextDate(fDate)
    }


    const retrievefunction = async (id, date) => {
        console.log(id, date)
        setLoading(true)
        fetch(`http://157.245.56.243/dives/public/api/get-images`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: id,
                sort_by: date
            })
        })
            .then(res => res.json())
            .then(json => {
                //console.log(json)
                setLoading(false)
                if (json.status == 200) {
                    setImagesArr(json.data)
                } else {
                    Alert.alert('', json.message)
                }

            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
    }

    const sortdivelogs = (selected) => {
        if (selected === 'Location') {
            let sortedlocation = divelogs.sort((a, b) => a.Location.Name.localeCompare(b.Location.Name)).reverse()
            setOrderDivelogs(sortedlocation)
        } else if (selected === 'Dive Date') {
            let sortedDate = divelogs.sort((a, b) => a.Date.localeCompare(b.Date))
            setOrderDivelogs(sortedDate)
        } else if (selected === 'Divelog Date') {
            let sortedDive = divelogs.sort((a, b) => Date.parse(a.CreatedOn) - Date.parse(b.CreatedOn)).reverse()
            setOrderDivelogs(sortedDive)
        }
        else {
            console.log('hello')
        }
        setSelectedLanguage(selected)
    }
    const pickerenabled = () => {
        if (orderdivelogs) {
            return true;
        }
        else {
            return false;
        }
    }
    const renderphotos = ({ item }) => {
        return (
            <View style={{ flex: 1, }}>
                <View>
                    <View style={{ padding: 5, borderBottomColor: COLORS.darkGray, borderBottomWidth: 0.4 }}>
                        {(selectedLanguage === 'Dive Date') &&
                            <Text style={{ fontFamily: 'LatoBold', color: COLORS.black, fontSize: 14 }}>{item.Date}</Text>
                        }
                        {(selectedLanguage === 'Divelog Date') &&
                            <Text style={{ fontFamily: 'LatoBold', color: COLORS.black, fontSize: 14 }}>{item.CreatedOn}</Text>
                        }
                        {(selectedLanguage === 'Location') &&
                            <Text style={{ fontFamily: 'LatoBold', color: COLORS.black, fontSize: 14 }}>{item.Location.Name}</Text>
                        }
                    </View>
                </View>
                <View>
                    <GridImageView data={item.images} heightOfGridImage={Dimensions.get('window').width / 4} transparent={0.8} />
                </View>
            </View>
        )
        // return (
        //     <Image
        //         source={{ uri: item }}
        //         resizeMode="cover"
        //         style={{
        //             height: 165,
        //             width: 165,
        //             borderRadius: 5,
        //             margin: 5
        //             //alignSelf:"center"
        //         }}
        //     />
        // )
    }
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            if (userData) {
                retrievefunction(userData.data._id, null)
            }

            //   setreloading(previosSate => !previosSate)
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [userData])
    )
    useEffect(() => {
        if (userData) {
            retrievefunction(userData.data._id, null)
        }
    }, [userData])

    useEffect(() => {
        if (selectedLanguage === 'Date') {
            console.log('==>', selectedLanguage)
        }
    }, [selectedLanguage])

    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: colour.white }}>
            {/*Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.discoverTitle}>Photos</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileScreen')}>
                    <Profileimage />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 30 }}>
                    <Text style={{ fontFamily: 'PoppinsBold', fontSize: 16 }}>No of Photos</Text>
                    <Text style={{ fontFamily: 'PoppinsBold', fontSize: 16, color: COLORS.darkGray, paddingRight: 5 }}>
                        {"0"}
                    </Text>
                </View>
            </View>
            {/* <View style={{ padding: 10 }}>
                <Pressable onPress={() => setShow(true)}>
                    <FormInput
                        style={styles.input}
                        inputStyle={{ color: COLORS.black }}
                        label="Filter"
                        placeholder={"Date"}
                        value={textDate}
                        editable={false}
                        appendComponent=
                        {
                            <View style={{ justifyContent: 'center' }}>
                                <Feather name="calendar" color={COLORS.gray} size={20} style={{ paddingVertical: 15, }} />
                            </View>
                        }
                    />
                </Pressable>
            </View> */}

            <View style={{
                borderTopColor: COLORS.darkGray2, borderBottomColor: COLORS.darkGray2,
                borderTopWidth: 0.5, borderBottomWidth: 0.5
            }}>
                <View style={{ marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 13, padding: 10 }}>Sort by: </Text>
                        <Text style={{
                            fontFamily: 'PoppinsRegular', fontSize: 13, paddingVertical: 10,
                            paddingRight: 5
                        }}>{selectedLanguage}</Text>
                        {userData ?
                            <Picker
                                style={{ padding: 10, height: 40, width: 50 }}
                                enabled={pickerenabled()}
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue) => {
                                    setSelectedLanguage(itemValue),
                                        retrievefunction(userData.data._id, itemValue)
                                }

                                }>
                                <Picker.Item label="Date" value="Dive Date" />
                                <Picker.Item label="Dive" value="Divelog Date" />
                                <Picker.Item label="Location" value="Location" />
                            </Picker>
                            : <View />
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setSelectedView('list')}>
                            <MaterialIcons name="view-list" size={34}
                                color={selectedView === 'list' ? COLORS.lightblue1 : COLORS.darkGray1} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedView('grid')}>
                            <MaterialIcons name="apps" size={30}
                                color={selectedView === 'grid' ? COLORS.lightblue1 : COLORS.darkGray1} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }}>

                {(!imagesArr || !imagesArr.length) &&
                    <View style={styles.createLogTextWrapper}>
                        <Text style={styles.createLogText}>Photos from your dive logs will appear here.</Text>
                    </View>
                }

                {!imagesArr || !imagesArr.length ?
                    <View />
                    : <FlatList
                        data={imagesArr}
                        renderItem={renderphotos}
                        keyExtractor={(item, index) => "unique" + index}
                        showsVerticalScrollIndicator={false}
                        initialNumToRender={7}
                        //numColumns={2}
                        contentContainerStyle={{ paddingTop: 10, paddingHorizontal: 5, paddingBottom: 100, marginBottom: 30 }}
                    />
                }
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
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'date'}
                    is24Hour={false}
                    display='default'
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    backIcon: {
        marginTop: 48,
        marginLeft: 1,
        width: 35,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Header: {
        marginHorizontal: 10,
        fontFamily: 'LatoBold',
        fontSize: 28,
        //textAlign: 'center',
        color: COLORS.black,
    },
    createLogTextWrapper: {
        marginTop: 140,
        marginHorizontal: 40,
        marginBottom: 20,
    },
    createLogText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 28,
        textAlign: 'center',
        color: COLORS.darkGray3,
    },
    discoverTitle: {
        marginTop: 63,
        marginHorizontal: 23,
        fontFamily: 'LatoBold',
        fontSize: 32,
    },
})

export default Photos;

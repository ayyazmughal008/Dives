import React, { useCallback } from 'react';
import { View, StyleSheet, Platform, Pressable, Text, Dimensions, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, colour } from '../../assets/colors/theme';
import FormInput from '../../components/divelogs/FormInput';
import Weatherss from './Weather';
import Tankconsumption from './TankConsumption';
import Reefhealth from './ReefHealth';
import Marinelife from './MarineLife';
import Divingdata from './DivingData';
import AdditionalData from './AdiitionalDetails';
import divelog from '../../assets/data/divelog';


const DiveEditing = ({ navigation, route }) => {
    const DIVE_LOG = 'divelog';
    const { divelogs } = route.params;


    const [textDate, setTextDate] = React.useState()
    const [divedata, setdivedata] = React.useState()
    const [weather, setweather] = React.useState()
    const [tankcons, settankcons] = React.useState()
    const [reefhelth, setreefhealth] = React.useState()
    const [marinlife, setmarinelife] = React.useState()
    const [diveLog, setdiveLog] = React.useState()
    const [final, setfinal] = React.useState()

    const [editdivedata, seteditdivedata] = React.useState()
    const [addetails, setaddetails] = React.useState()
    const [weathercon, setweathercon] = React.useState()
    const [tankcon, settankcon] = React.useState()
    const [reefheth, setreefheth] = React.useState()
    const [marinel, setmarinel] = React.useState()
    const [isLoading, setLoading] = React.useState(false)
    const [userData, setUserData] = React.useState('');



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

    const callback = useCallback((textDate) => {
        setTextDate(textDate);
    }, []);
    const callback1 = useCallback((divedata) => {
        setdivedata(divedata);
    }, []);
    const callback2 = useCallback((weather) => {
        setweather(weather);
    }, []);
    const callback3 = useCallback((tankcons) => {
        settankcons(tankcons);
    }, []);
    const callback4 = useCallback((reefhelth) => {
        setreefhealth(reefhelth);
    }, []);
    const callback5 = useCallback((marinlife) => {
        setmarinelife(marinlife);
    }, []);


    const submitfunction = async (key, value) => {
        try {
            await SecureStore.setItemAsync(key, value);

            //console.log('Successfully stored to storage')
        }
        catch (e) {
            console.log('could not access storage', e)
        }
    }

    const onSubmit = () => {
        submitfunction(DIVE_LOG, diveLog)
        _handleSubmit(diveLog)
        console.log(diveLog)
        //navigation.goBack();
    }
    // const onSubmit = () => {
    //     console.log(diveLog) 
    // }
    const _handleSubmit = (diveLog) => {
        setLoading(true)
        fetch(`http://157.245.56.243/dives/public/api/update-dive`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: diveLog
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoading(false)
                if (json.status == 200) {
                    Alert.alert("", json.message)
                    navigation.goBack();
                } else {
                    Alert.alert('', json.message)
                }

            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
    }

    function isEnabledSubmit() {
        if (textDate && Object.keys(textDate).length !== 0) {
            return textDate.Date !== "" && textDate.StartTime !== "" && textDate.EndTime !== ""
                && textDate.Location !== ""
        } else {
            return false
        }
    }

    function convertObjectValuesRecursive(obj, target, replacement) {
        obj = { ...obj };
        Object.keys(obj).forEach((key) => {
            if (obj[key] == target) {
                obj[key] = replacement;
            } else if (typeof obj[key] == 'object' && !Array.isArray(obj[key])) {
                obj[key] = convertObjectValuesRecursive(obj[key], target, replacement);
            }
        });
        return obj;
    }

    React.useEffect(() => {
        const date = new Date().toString() //To get the Current Date
        //  console.log(date)
        //console.log(Date.parse(date))
        let logtime = { CreatedOn: date, userId: !userData ? "" : userData.data._id, diveId: divelogs._id }
        let finaldata = { ...logtime, ...textDate, ...divedata, ...weather, ...tankcons, ...reefhelth, ...marinlife }
        //  const myJSON = JSON.stringify(finaldata)
        //const jsobj = JSON.parse(myJSON)
        const divelogjs = convertObjectValuesRecursive(finaldata, "", null)
        setfinal(divelogjs)
        let divelogjson = JSON.stringify(divelogjs)
        setdiveLog(divelogjson)
        console.log(divelogjson)
    }, [textDate, divedata, weather, tankcons, reefhelth, marinlife, userData])



    React.useEffect(() => {
        //console.log(divelogs)
        const rest = divelogs
        const res = convertObjectValuesRecursive(rest, null, "")

        const {
            Date,
            StartTime,
            EndTime,
            Duration,
            Location,
            DiveType,
            Temperature,
            Depth,
            BottomTime,
            Weight,
            DiveRating,
            Description,
            WeatherCondition,
            TankConsmption,
            ReefHealth,
            MarineLife,
            RareSpecies, ...restofdata } = res
        const divindata = {
            Date,
            StartTime,
            EndTime,
            Duration,
            Location
        }
        const adddetails = {
            DiveType,
            Depth,
            BottomTime,
            Temperature,
            Weight,
            DiveRating,
            Description
        }
        const weathercond = {
            WeatherCondition
        }
        const tankcond = TankConsmption
        const reefhealth = ReefHealth
        const marine = {
            MarineLife,
            RareSpecies
        }
        setmarinel(marine)
        setreefheth(reefhealth)
        settankcon(tankcond)
        setweathercon(weathercond)
        setaddetails(adddetails)
        seteditdivedata(divindata)
    }, [])
    // React.useEffect(()=>{
    //     console.log('==..>',tankcon)
    // },[tankcon])
    React.useEffect(() => {
        //  console.log(editdivedata)
    }, [editdivedata])

    React.useEffect(() => {

    }, [divelog])

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flex: 1, padding: 10, color: colour.white, backgroundColor: colour.white }}>
                <View>
                    <View style={styles.headersWrapper}>
                        <Text style={styles.diveLogHeaders}>Diving Data</Text>
                    </View>

                    {/*Diving Data */}
                    <Divingdata Editdivedata={editdivedata}
                        parentCallback={callback} />

                    {/*Additional Details */}
                    <AdditionalData AdditionalDetails={addetails}
                        parentCallback={callback1} />

                    {/*Weather Conditions */}
                    <Weatherss WeatherConditions={weathercon}
                        parentCallback={callback2} />

                    {/*Tank Consumption */}
                    <Tankconsumption TankConsumptn={tankcon}
                        parentCallback={callback3} />

                    {/* Reef Health */}
                    <Reefhealth RefHealth={reefheth}
                        parentCallback={callback4} />

                    {/*Marine Life */}
                    <Marinelife MarineLifee={marinel}
                        parentCallback={callback5} />




                    <View style={{ paddingTop: 70, paddingBottom: 15, marginBottom: 15 }}>
                        <TouchableOpacity
                            style={{
                                ...styles.submitbuttonWrapper,
                                backgroundColor: isEnabledSubmit() ? COLORS.lightblue2 : COLORS.lightblue3
                            }}
                            disabled={isEnabledSubmit() ? false : true}
                            onPress={() => {
                                onSubmit();
                            }}
                        >
                            <Text style={styles.submitbuttonTExt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGray2,
        backgroundColor: COLORS.lightGray2,
        padding: 10,
        borderRadius: 6,
        marginVertical: 5,
    },
    inputStyle: {
        color: COLORS.black,
        fontFamily: 'LatoRegular',
        fontSize: 14,
    },
    headersWrapper: {
        marginVertical: 20,
        marginTop: 12,

    },
    diveLogHeaders: {
        fontFamily: 'LatoBold',
        fontSize: 17,
        color: COLORS.black,
    },
    diveLogSubHeaders: {
        marginHorizontal: 5,
        marginVertical: 10,
        marginTop: 10,
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: COLORS.black,
    },
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray2,
        borderColor: COLORS.lightGray1,
        borderWidth: 3,
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderRadius: 10,
        margin: 2,
    },
    submitbuttonWrapper: {
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 10,
        margin: 2,

        backgroundColor: COLORS.lightblue2

    },
    submitbuttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: COLORS.white,
        alignSelf: 'center',
        padding: 5
    },
    buttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: COLORS.blue,
        alignSelf: 'center',

    },
    overlayButtonWrapper: {
        //marginHorizontal:20, 
        marginTop: 20,
        backgroundColor: colour.pink,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    overlayButtonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.white,
    },
    overlaysubtext: {
        fontFamily: "LatoRegular",
        fontSize: 13,
        textAlign: 'center'
    },
    mftgray: {
        color: COLORS.darkGray2,
    },
    mftblack: {
        color: COLORS.black,
        fontWeight: 'bold'
    },
    slidertext: {
        marginHorizontal: 5,
        marginVertical: 10,
        marginTop: 10,
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: COLORS.black,
        //textAlign: 'center',
    },
    labelStyles: {
        fontSize: 18,
        fontFamily: 'LatoRegular',
        padding: 5,
        paddingLeft: 10,
        paddingVertical: 25,
        textTransform: 'capitalize',
    },
    conditionButton: {
        width: 100,
        height: 75,
        backgroundColor: COLORS.lightOrange2,
        borderRadius: 20,
        borderColor: COLORS.lightOrange2,
        borderWidth: 2,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})

export default DiveEditing;

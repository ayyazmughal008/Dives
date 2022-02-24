import React from 'react';
import {View, StyleSheet, Platform, TextInput, Pressable, Text, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather} from '@expo/vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
//import CheckBox from '@react-native-community/checkbox';
import CheckBox from 'expo-checkbox';


import { COLORS, colour, SIZES } from '../../assets/colors/theme';
import FormInput from '../../components/divelogs/FormInput';
import { Rating } from 'react-native-ratings';


const AdditionalData = ({parentCallback, AdditionalDetails}) => {
    const editdivedata = AdditionalDetails

    const [divedetailsvisible, setdivedetailsVisible] = React.useState(false)
 {/*Depth States */}
    const [maxDepth, setMaxDepth] = React.useState('')
    const [avgDepth, setAvgDepth] = React.useState('')
    const [mft, setmft] = React.useState('meters')
 {/*Bottom Time */}
    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [show, setShow] = React.useState(false)
    const [bottomTimeRemoveVisible, setBottomTimeRemoveVisible] = React.useState(false)
    const [textTime, setTextTime] = React.useState('')
 {/*Suface Temp */}
    const [airTemp, setAirTemp] = React.useState('')
    const [surfTemp, setSurfTemp] = React.useState('')
    const [bottomTemp, setBottomTemp] = React.useState('')
    const [cf, setcf] = React.useState('cel')
 {/*Description */}
    const [description, setDescription] = React.useState('')
 {/*Weights */}
    const [weights, setWeights] = React.useState('')
    const [kl, setkl] = React.useState('kg')
 {/*Dive Type */}
    const [night, setNight] = React.useState(false)
    const [training, setTraining] = React.useState(false)
    const [shore, setShore] = React.useState(false)
    const [boat, setBoat] = React.useState(false)
    const [drift, setDrift] = React.useState(false)
 {/* Rating */}
    const [rating, setRating] = React.useState(0)   



    function handleWeightConv() {
        if (kl === 'kg'){
            setkl('lbs')
            if (weights != '') {
                let inkg = Math.round(((Number(weights)*2.205)  + Number.EPSILON) * 10) / 10
                setWeights(inkg.toString())
            }
        }else if (kl === 'lbs'){
            setkl('kg') 
            if (weights != '') {
                let inkg = Math.round(((Number(weights)/2.205)  + Number.EPSILON) * 10) / 10
                setWeights(inkg.toString())
            }
        }  
    }
   
    function handleDepthConv() {
         if (mft === 'meters'){
             setmft('feet')
             if (maxDepth != '') {
              let inmeters = Math.round(((Number(maxDepth)/0.3048)  + Number.EPSILON) * 10) / 10
              setMaxDepth(inmeters.toString())
             }
             if (avgDepth != '') {
                let inmeters2 = Math.round(((Number(avgDepth)/0.3048)  + Number.EPSILON) * 10) / 10
                setAvgDepth(inmeters2.toString())
               }
         }else if (mft === 'feet'){
             setmft('meters') 
             if (maxDepth != '') {
             let inmeters = Math.round(((Number(maxDepth)*0.3048)  + Number.EPSILON) * 10) / 10
             setMaxDepth(inmeters.toString())
             }
             if (avgDepth != '') {
                let inmeters2 = Math.round(((Number(avgDepth)*0.3048)  + Number.EPSILON) * 10) / 10
                setAvgDepth(inmeters2.toString())
            }
         }   
    }

    function handletempConv() {
        if (cf === 'cel'){
            setcf('fer') 
            
            if (surfTemp != ''){
                let incelc = Math.round((((Number(surfTemp)* (9/5)) + 32 )  + Number.EPSILON) * 10) / 10
                setSurfTemp(incelc.toString())
            }
            
            
            if (airTemp != ''){
                let incelc = Math.round((((Number(airTemp)* (9/5)) + 32 )  + Number.EPSILON) * 10) / 10
                setAirTemp(incelc.toString())
            }

            if (bottomTemp != ''){
                let incelc = Math.round((((Number(bottomTemp)* (9/5)) + 32 )  + Number.EPSILON) * 10) / 10
                setBottomTemp(incelc.toString())
            }
            
            
       }else if (cf === 'fer'){
           setcf('cel')
            
           if (surfTemp != ''){
                let incelc2 = Math.round((((Number(surfTemp)-32) * (5/9))  + Number.EPSILON) * 10) / 10
                setSurfTemp(incelc2.toString())
            }

            if (airTemp != ''){
                let incelc2 = Math.round((((Number(airTemp)-32) * (5/9)) + Number.EPSILON) * 10) / 10
                setAirTemp(incelc2.toString())
            }

            if (bottomTemp != ''){
                let incelc2 = Math.round((((Number(bottomTemp)-32) * (5/9))  + Number.EPSILON) * 10) / 10
                setBottomTemp(incelc2.toString())
            }        
        }   
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS  === 'ios' ? true: false);
        setDate(currentDate);

        let tempDate =new Date(currentDate);
        let fTime = tempDate.getHours() + ' hrs : ' + tempDate.getMinutes() + ' mins ';
             
        setTextTime(fTime)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    React.useEffect(() => {
        if (textTime === '') {
            setBottomTimeRemoveVisible(false)
        }
        else {
            setBottomTimeRemoveVisible(true)
        }
    }, [textTime])

    React.useEffect(() => {
        if(editdivedata) {
            if (Object.keys(editdivedata).length !== 0){
                setdivedetailsVisible(true)
            }
            if(editdivedata.DiveType.boatdive){
                setBoat(editdivedata.DiveType.boatdive)
            }  
            if(editdivedata.DiveType.nightdive){
                setNight(editdivedata.DiveType.nightdive)
            }  
            if(editdivedata.DiveType.trainingdive){
                setTraining(editdivedata.DiveType.trainingdive)
            }  
            if(editdivedata.DiveType.shoredive){
                setShore(editdivedata.DiveType.shoredive)
            }  
            if(editdivedata.DiveType.driftdive){
                setDrift(editdivedata.DiveType.driftdive)
            }            
            setMaxDepth(editdivedata.Depth.MaxDepth)
            setAvgDepth(editdivedata.Depth.AvgDepth)
            if (editdivedata.Depth.DepthUnit) {
                setmft(editdivedata.Depth.DepthUnit)
            }
            setTextTime(editdivedata.BottomTime)
            setAirTemp(editdivedata.Temperature.AirTemperature)
            setSurfTemp(editdivedata.Temperature.SurfaceTemperature)
            setBottomTemp(editdivedata.Temperature.BottomTemperature)
            if (editdivedata.Temperature.TempUnit) {
                setcf(editdivedata.Temperature.TempUnit)
            }
            setWeights(editdivedata.Weight.Weights) 
            if(editdivedata.Weight.WeightUnit) {
                setkl(editdivedata.Weight.WeightUnit)
            }
            setRating(editdivedata.DiveRating)
            setDescription(editdivedata.Description)
        }
    }, [editdivedata])

    React.useEffect(() => {
        let divetype = {}
        let unit = ''
        let tempunt= ''
        let weightunt = ''

        if(night === true){
            divetype = {...divetype, nightdive: true}
        }
        if(training === true){
            divetype = {...divetype, trainingdive: true}
        }
        if(shore === true){
            divetype = {...divetype, shoredive: true}
        }
        if(boat === true){
            divetype = {...divetype, boatdive: true}
        }
        if(drift === true){
            divetype = {...divetype, driftdive: true}
        }
        if (maxDepth !== '' || avgDepth !== '') {
            unit = mft
        } else {
            unit = ''
        }
        if (airTemp !== '' || surfTemp !== '' || bottomTemp !== '') {
            tempunt = cf
        } else {
            tempunt = ''
        }
        if (weights !== '') {
            weightunt = kl
        }else {
            weightunt = ''
        }
        //console.log(divetype)
        parentCallback({
            DiveType: divetype,
            Depth: {
                MaxDepth: maxDepth,
                AvgDepth: avgDepth,
                DepthUnit: unit,
            },
            BottomTime: textTime,
            Temperature: {
                AirTemperature: airTemp ,
                SurfaceTemperature: surfTemp,
                BottomTemperature: bottomTemp,
                TempUnit: tempunt, 
            },
            Weight:{
                Weights: weights,
                WeightUnit: weightunt,
            },
            DiveRating: rating,
            Description: description,
        })
    }, [rating, maxDepth, textTime,airTemp, surfTemp, bottomTemp, weights, avgDepth, night, training, shore, boat, drift, description])

    return (
        <View>
            <View style = {{borderBottomColor: COLORS.lightGray1, borderBottomWidth: 1.5, marginVertical: 5, marginBottom: 10}}>
                <TouchableOpacity style = {{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}}
                onPress= {() => setdivedetailsVisible(!divedetailsvisible)}
                >
                <Text style = {{...styles.diveLogSubHeaders, marginLeft: 5}}>Details</Text>
                {divedetailsvisible?
                <Feather name = 'minus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                : <Feather name = 'plus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                 }
                </TouchableOpacity>

            { divedetailsvisible && 
            <View style= {{paddingTop: 10}}>
                <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Dive Type</Text>

                <View style = {{paddingHorizontal: 5,}}> 
                    <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection :'row', }}>
                        <CheckBox
                            value={shore}
                            onValueChange={setShore}
                            style={{alignSelf: 'center'}}
                            />
                        <Text style={{...styles.sublabelStyles, fontSize: 13, paddingVertical: 10, paddingHorizontal: 3}}>Shore</Text>
                    </View>
                    <View style={{flexDirection :'row', }}>
                        <CheckBox
                            value={boat}
                            onValueChange={setBoat}
                            style={{alignSelf: 'center'}}
                            />
                        <Text style={{...styles.sublabelStyles, fontSize: 13, paddingVertical: 10, paddingHorizontal: 3}}>Boat</Text>
                    </View>
                    <View style={{flexDirection :'row', marginBottom: 5}}>
                        <CheckBox
                            value={training}
                            onValueChange={setTraining}
                            style={{alignSelf: 'center'}}
                            />
                        <Text style={{...styles.sublabelStyles, fontSize: 13, paddingVertical: 10, paddingHorizontal: 3}}>Training</Text>
                    </View>
                    </View>

                    <View style ={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection :'row', marginBottom: 5}}>
                        <CheckBox
                            value={night}
                            onValueChange={setNight}
                            style={{alignSelf: 'center'}}
                            />
                        <Text style={{...styles.sublabelStyles, fontSize: 13, paddingVertical: 10, paddingHorizontal: 3}}>Night</Text>
                    </View>
                    <View style={{flexDirection :'row', marginBottom: 5}}>
                        <CheckBox
                            value={drift}
                            onValueChange={setDrift}
                            style={{alignSelf: 'center'}}
                            />
                        <Text style={{...styles.sublabelStyles, fontSize: 13, paddingVertical: 10, paddingHorizontal: 3}}>Drift</Text>
                    </View> 

                    <View style = {{paddingHorizontal: 42}}></View>
                    </View>
                </View>

            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Depth</Text>
            {/*Depth*/}
            <View style = {{flexDirection: 'row', paddingVertical: 5, }}>
                <View  style = {{flexGrow: 1, paddingRight: 5}}>
                    <FormInput    
                        style = {styles.input}
                        inputStyle = {{color: COLORS.black}}
                        keyboardType = 'numeric'
                        label = "Max Depth"
                        placeholder= { "--"}
                        editable = {true}
                        value={maxDepth }
                        onChangeText={(value) => {setMaxDepth(value)}}
                        //errorMsg= {dateError}                 
                        appendComponent =
                        {
                            <TouchableOpacity onPress = {() => handleDepthConv()} 
                                style = {{flexDirection : 'row', paddingVertical: 15,}} >
                                <Text style = {(mft === 'feet') ? styles.mftgray : styles.mftblack}> m</Text>
                                <Text style = {(mft === 'meters') ? styles.mftgray : styles.mftblack}>/ft</Text>
                            </TouchableOpacity>
                        } 
                    />
                </View>
                <View  style = {{flexGrow: 1, paddingLeft: 5}}>
                    <FormInput    
                        style = {styles.input}
                        inputStyle = {{color: COLORS.black}}
                        keyboardType = 'numeric'
                        label = "Avg Depth"
                        placeholder= { "--"}
                        editable = {true}
                        value={avgDepth }
                        onChangeText={(value) => {setAvgDepth(value)}}
                        //errorMsg= {dateError}                 
                        appendComponent =
                        {
                            <TouchableOpacity onPress = {() => handleDepthConv()} 
                                style = {{flexDirection : 'row', paddingVertical: 15,}} >
                                <Text style = {(mft === 'feet') ? styles.mftgray : styles.mftblack}> m</Text>
                                <Text style = {(mft === 'meters') ? styles.mftgray : styles.mftblack}>/ft</Text>
                            </TouchableOpacity>
                        } 
                    />
                </View>
            </View>
            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Bottom Time</Text>
            <View style = {{flexDirection: 'row', paddingVertical: 5, }}>
                    <View style = {{flexGrow: 1, marginTop: -10}}>
                <Pressable onPress={() => showMode('time')}>
                    <FormInput
                        containerStyle={{width: (textTime != '') ? Dimensions.get('window').width -55: null}} 
                        style = {styles.input}
                        inputStyle = {{color: COLORS.black}}
                        //label = "Bottom Time"
                        placeholder= { "Duration"}
                        value = {textTime}
                        editable = {false}
                    />
                </Pressable>
            </View>
                {bottomTimeRemoveVisible &&
                <TouchableOpacity style = {{justifyContent: 'center', paddingHorizontal: 10, paddingTop: 10,}} onPress={() => setTextTime('')}>
                    <Feather name ="x" color= {COLORS.gray} size = {20} style = {{paddingVertical: 15,}}/>
                </TouchableOpacity>}
            </View>
            
            {show && (
                <DateTimePicker 
                    testID= 'dateTimePicker'
                    value = {date}
                    mode = {mode}
                    is24Hour = {true}
                    display = 'default'
                    onChange= {onChange} 
                />
            )}

            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Temperature</Text>
        
            {/*Temperature */}
            <View style = {{flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-evenly'}}>
            {/*Air Temperate */}
                <View style = {{flexGrow: 1, paddingRight: 5}}>
                <FormInput
                    containerStyle = {{paddingBottom: 5,}}    
                    style = {styles.input}
                    inputStyle = {{color: COLORS.black}}
                    keyboardType = 'numeric'
                    label = "Air Temperature          "
                    placeholder= { "--"}
                    editable = {true}
                    value={airTemp }
                    onChangeText={(value) => {setAirTemp(value)}}
                    //errorMsg= {dateError}                 
                    appendComponent =
                    {
                        <TouchableOpacity onPress = {() => handletempConv()} 
                        style = {{flexDirection : 'row', paddingVertical: 15,}} >
                            <Text style = {(cf == 'fer') ? styles.cfgray : styles.cfblack}> ºC</Text>
                            <Text style = {(cf == 'cel') ? styles.cfgray : styles.cfblack}>/ºF</Text>
                        </TouchableOpacity>
                    } 
                />
                </View>
            {/*Surface Temperature */}
                <View style = {{flexGrow: 1, paddingRight: 5}}>
                <FormInput
                    containerStyle = {{paddingBottom: 5,}}    
                    style = {styles.input}
                    inputStyle = {{color: COLORS.black}}
                    keyboardType = 'numeric'
                    label = "Surface Temperature"
                    placeholder= { "--"}
                    editable = {true}
                    value={surfTemp }
                    onChangeText={(value) => {setSurfTemp(value)}}
                    //errorMsg= {dateError}                 
                    appendComponent =
                    {
                        <TouchableOpacity onPress = {() => handletempConv()} 
                        style = {{flexDirection : 'row', paddingVertical: 15,}} >
                            <Text style = {(cf === 'fer') ? styles.cfgray : styles.cfblack}> ºC</Text>
                            <Text style = {(cf === 'cel') ? styles.cfgray : styles.cfblack}>/ºF</Text>
                        </TouchableOpacity>
                    } 
                />
                </View>
            {/*Bottom Temperature */}
                <View style = {{flexGrow: 1, }}>
                <FormInput
                    containerStyle = {{paddingBottom: 5, }}    
                    style = {styles.input}
                    inputStyle = {{color: COLORS.black}}
                    keyboardType = 'numeric'
                    label = "Bottom Temperature"
                    placeholder= { "--"}
                    editable = {true}
                    value={bottomTemp }
                    onChangeText={(value) => {setBottomTemp(value)}}
                    //errorMsg= {dateError}                 
                    appendComponent =
                    {
                        <TouchableOpacity onPress = {() => handletempConv()} 
                        style = {{flexDirection : 'row', paddingVertical: 15,}} >
                            <Text style = {(cf == 'fer') ? styles.cfgray : styles.cfblack}> ºC</Text>
                            <Text style = {(cf == 'cel') ? styles.cfgray : styles.cfblack}>/ºF</Text>
                        </TouchableOpacity>
                    } 
                />
                </View>
            </View>
            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Gear Used</Text>
            
            <View>
            <FormInput
                    containerStyle = {{paddingBottom: 5,}}    
                    style = {styles.input}
                    inputStyle = {{color: COLORS.black}}
                    keyboardType = 'numeric'
                    label = "Weights"
                    placeholder= { "Weights"}
                    editable = {true}
                    value={weights }
                    onChangeText={(value) => {setWeights(value)}}               
                    appendComponent =
                    {
                        <TouchableOpacity onPress = {() => handleWeightConv()} 
                         style = {{flexDirection : 'row', paddingVertical: 15,}} >
                            <Text style = {(kl == 'lbs') ? styles.mftgray : styles.mftblack}>kg</Text>
                            <Text style = {(kl == 'kg') ? styles.mftgray : styles.mftblack}>/lbs</Text>
                        </TouchableOpacity>
                    } 
                />
            </View>
            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Dive Rating</Text>
            <View style= {{flexDirection: 'row',
                //height: 55, 
                paddingHorizontal: SIZES.padding, 
                borderRadius: SIZES.radius,
                borderWidth: 0.3,
                borderColor: COLORS.lightGray1,
                backgroundColor: COLORS.lightGray2,
                alignItems: 'center',
                justifyContent: 'center',}}>
                <Rating 
                    type='custom'
                    showRating
                    // dont need this -> onSwipeRating={}={(value => setRating(value))}
                    onFinishRating={(value => setRating(value))}
                    ratingBackgroundColor={COLORS.darkGray1}
                    ratingCount={5}
                    ratingTextColor={(rating === 0) ?COLORS.darkGray1 :COLORS.lightblue2}
                    startingValue={rating}
                    fractions={2}
                    tintColor={COLORS.lightGray2}
                    style= {{backgroundColor: COLORS.lightGray2, borderColor:COLORS.primaryBlur, }}
                    jumpValue={0.5}

                />
            </View>
            <Text style = {{...styles.diveLogSubHeaders, fontSize: 13}}>Description</Text>

            <View style= {{marginBottom: 30, marginTop: -10}}>
                <FormInput
                    styleMain={{height: 80, }}
                    containerStyle = {{paddingBottom: 5}}    
                    style = {styles.input}
                    inputStyle = {{color: COLORS.black, paddingBottom: 5,}}
                    multiline={true}
                    placeholder= {"Description... "}
                    editable = {true}
                    value={description }
                    onChangeText={(value) => {setDescription(value)}}
                />
            </View>
            </View>
            }
            </View>
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

    },
    diveLogHeaders: {
        fontFamily: 'LatoBold',
        fontSize: 17,
        color: COLORS.black,
    },
    diveLogSubHeaders: {
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: COLORS.black,
    },
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray2,
        borderColor : COLORS.lightGray1,
        borderWidth :3,
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
        backgroundColor: COLORS.lightblue2,

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
        marginTop:20,
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
        textAlign:'center'
    },
    mftgray: {
        color: COLORS.darkGray2,

    },
    mftblack: {
        color: COLORS.black,
        fontWeight: 'bold'
    },
    cfgray: {
        color: COLORS.darkGray2,
        fontSize: 12,
        paddingTop: 3,
    },
    cfblack: {
        color: COLORS.black,
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 3,
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

export default AdditionalData;

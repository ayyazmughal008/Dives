import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {Slider as Sliders } from 'react-native-range-slider-expo';

//import { Slider } from 'react-native-elements';

import { COLORS, colour } from '../../assets/colors/theme';



const Tankconsumption = ({parentCallback, TankConsumptn}) => {
    const tankcons = TankConsumptn;

    const [TCVisible, setTCVisible] = React.useState(false)
    const [barpsi, setbarpsi] = React.useState('bar')
    const [tanksArray, setTanksArray] = React.useState([{
        tankid: 1,
        startPressure: 0,
        startPrespsi: 0,
        endpresure: 0,
        endPrespsi: 0,
        tanktype: '',
    }])
    const [currentTanks, setCurrentTank] = React.useState('1')
    
    const addnewtank = () => {
        let newaddedvalue = Number(currentTanks) +1
        setCurrentTank(newaddedvalue.toString())
        tanksArray.push({tankid: newaddedvalue,
            startPressure: 0,
            startPrespsi: 0,
            endpresure: 0,
            endPrespsi: 0,
            tanktype: '',
        })
    }

    const removetank = () => {
        if (currentTanks === '1') {
            const newarr = [{tankid: 1,
                startPressure: 0,
                startPrespsi: 0,
                endpresure: 0,
                endPrespsi: 0,
                tanktype: '',}]
            setTanksArray(newarr)
            handleTCVisibility()
        }else {
            let newval = Number(currentTanks) - 1
            setCurrentTank(newval.toString())
            tanksArray.pop()
        }
        
    }

    const settanktypeselected = (type, index) => {
        const newarr = tanksArray.slice() //copy the array
        newarr[index].tanktype = type //execute the manipulations
        setTanksArray(newarr)
    }

    const handleChangeEnd = (value, index) => {
        // console.log(index)
        // console.log(value)

        const newarr = tanksArray.slice() //copy the array
        newarr[index].endpresure = value //execute the manipulations
        const convEnd = Math.round(((Number(value)*14.5038)  + Number.EPSILON) * 1) / 1
        newarr[index].endPrespsi = convEnd
        setTanksArray(newarr) //set the new state



        //return tanksArray.index.endpresure
       // tanksArray[index].startPressure = value
    }

    const handleChangestart = (index, value) => {
        // console.log(index)
        // console.log(value)

        const newarr = tanksArray.slice() //copy the array
        newarr[index].startPressure = value //execute the manipulations
        const convStart = Math.round(((Number(value)*14.5038)  + Number.EPSILON) * 1) / 1
        newarr[index].startPrespsi = convStart
        setTanksArray(newarr) //set the new state
        //console.log('startreds', startRef)

       // return tanksArray[index].startPressure
       // tanksArray[index].startPressure = value
    }

    const handleTCVisibility = () => {
        { TCVisible?  setTCVisible(false) : setTCVisible(true) }
    }

    function handlepresSelect() {
        if (barpsi === 'bar'){
            setbarpsi('psi')
        }else if (barpsi === 'psi'){
            setbarpsi('bar') 
        }   
    }

    const Tankcons = () => {
        return(
            <View>
                <TankView />
                <TouchableOpacity style = {{borderRadius: 8, borderColor: COLORS.lightblue3, borderWidth :2, paddingVertical: 10, 
                               marginHorizontal: 6, backgroundColor: COLORS.white2}}
                               onPress={() => {
                                   addnewtank()
                                   TankView()
                               }}
                               >
                               <Feather name = 'plus' size = {25} color= {COLORS.lightblue2} style = {{alignSelf: 'center'}}/>
                           </TouchableOpacity>
             
            </View>
        )
    }

    const TankView = () => {
        return(
            <View>
                {tanksArray.map((index, i) => {
                    return(
                        <View key={Math.random().toString(36).substring(2, 2+9)} >
                        <View style ={{borderColor: COLORS.lightGray1, borderWidth: 1.5, 
                            borderRadius: 8, padding: 10, marginVertical: 5,}}>
                            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style = {{ textAlign: 'left', ...styles.diveLogHeaders}}>Tank {index.tankid}</Text>
                            <View style = {{flexDirection: 'row'}}>
                                <TouchableOpacity onPress = {() => handlepresSelect()}  style = {{flexDirection : 'row', paddingHorizontal: 15,}} >
                                    <Text style = {(barpsi == 'psi') ? styles.mftgray : styles.mftblack}> bar</Text>
                                    <Text style = {(barpsi == 'bar') ? styles.mftgray : styles.mftblack}>/psi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style = {{alignSelf: 'flex-end', padding: 5,}}
                                onPress = {() => {
                                    removetank();
                                }}>
                                    <Feather name = 'x' size = {20} color={COLORS.darkGray2} />
                                </TouchableOpacity>
                            </View>
                {/* <View style={{borderColor: COLORS.darkGray2, borderWidth: 5, height: 10, width: 100}}>
                    
                <View style={{flex: 1, marginTop: -35}}>
                    <Sliders min={0} max={300} step={4}
                        styleSize={18}
                        
                        valueOnChange={value => {setStartPres(value)
                    setEndPres('a')}}
                        initialValue={startpres}
                        knobColor={COLORS.blue}
                        showRangeLabels={false}
                        valueLabelsBackgroundColor={COLORS.darkGray3}
                        inRangeBarColor={COLORS.darkGray2}
                        outOfRangeBarColor={COLORS.lightblue2}
                    />
                </View>
                </View> */}
                </View>
                <View style = {{paddingVertical : 15}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {{...styles.sublabelStyles, alignSelf: 'flex-end', color: COLORS.black}}>Start</Text>
                        <Text style = {(barpsi == 'bar') ? styles.presSelected : styles.presnotSelected}>{index.startPressure}</Text>
                    </View>
                <Slider
                    style={{width: Dimensions.get('window').width - 40, height: 20, alignSelf: 'center',}}
                    step={1}
                    value={index.startPressure}
                    minimumValue={0}
                    maximumValue={300}
                    tapToSeek={true}
//                    onValueChange={(value) => handleonchangestart(value)}
                    //onValueChange={(value) => setStartPres(value)}
                    onSlidingComplete={(value) => handleChangestart(i, value)}
                    thumbTintColor={COLORS.lightblue2}
                    minimumTrackTintColor={COLORS.lightblue3}
                    maximumTrackTintColor="#000000"
                />
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 5, marginTop: -5}}>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}></Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}></Text>
                    </View> 
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: -10}}>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end'}}>0</Text>
                       
                        <Text style = {(barpsi == 'psi') ? styles.presSelected : styles.presnotSelected}>{index.startPrespsi}</Text>
                    </View> 
                </View>
                <View style = {{paddingVertical : 15}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {{...styles.sublabelStyles, alignSelf: 'flex-end', color: COLORS.black}}>End</Text>
                        <Text style = {(barpsi == 'bar') ? styles.presSelected : styles.presnotSelected}>{index.endpresure}</Text>
                    </View>
                    <Slider
                        style={{width: Dimensions.get('window').width - 40, height: 20, alignSelf: 'center'}}
                        step={1}
                        value = {index.endpresure}
                        minimumValue={0}
                        maximumValue={300}
                        tapToSeek={true}
                        onSlidingComplete={(value) => handleChangeEnd(value, i)}
                        thumbTintColor={COLORS.lightblue2}
                        minimumTrackTintColor={COLORS.lightblue3}
                        maximumTrackTintColor="#000000"
                    />
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal: 5, marginTop: -5}}>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}></Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}>|</Text>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end', fontSize: 8, alignSelf: 'flex-start'}}></Text>
                    </View> 
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginTop: -10}}>
                        <Text style ={{...styles.sublabelStyles, alignSelf: 'flex-end'}}>0</Text>
                        <Text style = {(barpsi == 'psi') ? styles.presSelected : styles.presnotSelected}>{index.endPrespsi}</Text>
                    </View> 
                </View>
                <View>
                    {(index.endpresure > index.startPressure) ? 
                    <Text style={{fontFamily: 'LatoRegular', fontSize: 12, color: COLORS.red}}>
                        End Pressure is higher than Start Pressure
                    </Text>
                    : null}
                    </View>
                        <View style = {{flexDirection :'row', justifyContent: 'space-evenly', paddingBottom: 10}}>
                            <TouchableOpacity
                                style={(index.tanktype == 'Air') ? styles.tankbuttonslected : styles.tankbuttonNotslected}
                                onPress ={() => settanktypeselected('Air', i)}
                                >
                                <Text style= {styles.overlayButtonTExt}>Air</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={(index.tanktype == 'Nitrox') ? styles.tankbuttonslected : styles.tankbuttonNotslected}
                                onPress ={() => settanktypeselected('Nitrox', i)}
                                >
                                <Text style= {styles.overlayButtonTExt}>Nitrox</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={(index.tanktype == 'Trimix') ? styles.tankbuttonslected : styles.tankbuttonNotslected}
                                onPress ={() => settanktypeselected('Trimix', i)}
                                >
                                <Text style= {styles.overlayButtonTExt}>Trimix</Text>
                            </TouchableOpacity>
                
                            </View>
                        </View>
                    </View>
                    )
                })
                }
        </View>
        )
    }

    React.useEffect(() => {
        if(tankcons && Object.keys(tankcons).length !== 0){
            console.log('......>', tankcons)
            setTCVisible(true)
            setbarpsi(tankcons.PressureUnit)
            setTanksArray(tankcons.TankConsumption)
            
        }
    }, [tankcons])


    React.useEffect(() => {
        if(
            tanksArray.length === 1 && 
            // tanksArray[0].tankid === '1' && 
            tanksArray[0].startPressure === 0 &&
            tanksArray[0].startPrespsi === 0 &&
            tanksArray[0].endpresure=== 0 &&
            tanksArray[0].endPrespsi === 0 &&
            tanksArray[0].tanktype=== '')
            {
            parentCallback({Tankconsumption: null})
        } else{
            parentCallback({
                TankConsmption: {
                    TankConsumption: tanksArray,
                    PressureUnit: barpsi,
                },
            })
        }
     }, [tanksArray, currentTanks])


    return (
        <View>
            {/*Tank Consumption */}
            <View style = {{borderColor: COLORS.lightGray1, borderWidth: 1.5, borderRadius: 8,
                borderBottomColor: COLORS.lightGray1, borderBottomWidth: 1.5, padding: 5, marginBottom: 5}}>
                <TouchableOpacity style = {{flexDirection: 'row',justifyContent: 'space-between', paddingRight: 10}} 
                onPress= {() => handleTCVisibility()}>
                <Text style = {styles.diveLogSubHeaders}>Tank Consumption</Text>
                {TCVisible?
                <Feather name = 'minus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                : <Feather name = 'plus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                }
                </TouchableOpacity>
                {TCVisible && 
                <View>
                    <Tankcons />
                </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        borderColor : COLORS.lightGray1,
        borderWidth :3,
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 10,
        margin: 2,
    },
    buttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: COLORS.blue,
        alignSelf: 'center',
        
    },
    tankbuttonslected: {
        //marginHorizontal:20, 
        marginTop:20,
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
       // paddingHorizontal: 5,
        width: 105,
    },
    tankbuttonNotslected: {
        //marginHorizontal:20, 
        marginTop:20,
        backgroundColor: COLORS.lightGray,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
       // paddingHorizontal: 5,
        width: 105,
    },
    overlayButtonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 15,
        color: colour.white,
    },
    overlayButtonTExt2: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.black,
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
    sublabelStyles :{ 
        fontSize: 14,
        fontFamily: 'LatoRegular',
        color: COLORS.darkGray2,
        paddingHorizontal: 5,
        //paddingLeft: 10, 
        //paddingVertical: 25,
        //textTransform: 'capitalize', 
        //fontWeight: 'bold', 
        
        // position: 'absolute', 
        // right: 25,
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
    },
    presSelected: {
        color: COLORS.lightblue2,
        fontSize: 16,
        alignSelf: 'flex-end',
        fontFamily: 'LatoBold',
        paddingHorizontal: 5,
    },
    presnotSelected: {
        alignSelf: 'flex-end',
        fontSize: 14,
        fontFamily: 'LatoRegular',
        color: COLORS.darkGray2,
        paddingHorizontal: 5,
    },
})

export default Tankconsumption;

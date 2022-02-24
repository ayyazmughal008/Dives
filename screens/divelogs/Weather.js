import React from 'react';
import {View, StyleSheet, Platform, TextInput, Pressable, Text, Dimensions, Image, ImageBackground, Appearance} from 'react-native';
import { TouchableOpacity as TouchableOpacit} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Overlay } from 'react-native-elements';
import {Entypo} from 'react-native-vector-icons';

import { COLORS,  colour } from '../../assets/colors/theme';
import CompassImage from '../../assets/images/compass2.png'



const Weather = ({parentCallback, WeatherConditions}) => {
    const WeatherConditiond = WeatherConditions
    {/*Condition */}
    const [conditionsVisible, setConditionsVisible] = React.useState(false)
    const [seaStateVisible, setSeaStateVisible] = React.useState(false)
    const [currDirVisible, setCurrDirVisible] = React.useState(false)
    const [currSpeedVisible, setCurrSpeedVisible] = React.useState(false)
    const [visibilityVisible, setVisibilityVisible] = React.useState(false)
    const [blurVisibility, setBlurVisibility] = React.useState({value: 0 })
    const [weatherVisible, setWeatherVisible] = React.useState(false)
    const [seaState, setSeaState] = React.useState('')
    const [dirSelected, setDirSelected] = React.useState('')
    const [currentSpeed, setCurrentSpeed] = React.useState('')
    const [visibiltiy, setVisibility] = React.useState('')
    const [Weather, setWeather] = React.useState('')

    const colorScheme = Appearance.getColorScheme();

    const handleConditionsVisibility = () => {
        { conditionsVisible?  setConditionsVisible(false) : setConditionsVisible(true) }
    }

    function assignVisibility(value){
        if (Number(value) < 21) {
            setVisibility(value + ' m')
        }
        else if (Number(value) === 21){
            setVisibility('20+ m' )
        }
    }

    React.useEffect(() => {
        if(WeatherConditiond){
            setConditionsVisible(true)
             setWeather(WeatherConditiond.WeatherCondition.Weather)
             setDirSelected(WeatherConditiond.WeatherCondition.CurrentDirection)
             setSeaState(WeatherConditiond.WeatherCondition.SeaState)
             setVisibility(WeatherConditiond.WeatherCondition.Visibility)
             setCurrentSpeed(WeatherConditiond.WeatherCondition.CurrentSpeed)
        }
       
    }, [WeatherConditiond])

    React.useEffect(() =>{
        parentCallback({
            WeatherCondition: {
                Weather: Weather,
                CurrentDirection: dirSelected,
                SeaState: seaState,
                Visibility: visibiltiy,
                CurrentSpeed: currentSpeed, 
            }}
        )
    }, [Weather, dirSelected, seaState, visibiltiy, currentSpeed])

    return (
        <View>
             {/*Weather Conditions */}
             <View style = {{borderColor: COLORS.lightGray1, borderWidth: 1.5, borderRadius: 8, 
                    borderBottomColor: COLORS.lightGray1, borderBottomWidth: 1.5, marginVertical: 5, padding: 5}}>
                    <TouchableOpacity style = {{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10}}
                    onPress= {() => handleConditionsVisibility()}>
                    <Text style = {styles.diveLogSubHeaders}>Weather Conditions</Text>
                    {conditionsVisible?
                        <Feather name = 'minus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                        : <Feather name = 'plus-circle' size = {17} color= {COLORS.black} style = {{alignSelf: 'center', paddingLeft: 10,}} />
                        }
                    </TouchableOpacity>
                
                { conditionsVisible && 
                <View style = {{paddingHorizontal: 2, paddingTop: 5}}>
                    <View style = {{flexDirection: 'row', paddingVertical: 1,}}>
                        <TouchableOpacity style={styles.conditionButton} onPress ={() => setSeaStateVisible(true)}>
                            <Image 
                            style = {{ height: 90, width: 55, resizeMode:'contain', alignSelf: 'center',}}
                            source ={require('../../assets/icons/wave.png')}
                            />
                        </TouchableOpacity>
                        <Text style = {styles.labelStyles}>Sea State :</Text>
                        <Text style = {styles.sublabelStyles}>{seaState}</Text>
                    </View>

                    {seaStateVisible && 
                    <View>
                    <Overlay isVisible={seaStateVisible} 
                    onBackdropPress={() => {setSeaStateVisible(false)
                        setSeaState('')}}  
                    overlayStyle = {{borderRadius: 10}}
                    //backdropStyle = {{color: "rgbs(0,0,0, 0.8)"}}
                   >
                    <View> 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{paddingHorizontal:20,}}></View>
                            <Text style = {{ textAlign: 'center', ...styles.diveLogHeaders,}}>Sea State</Text>
                            <TouchableOpacit onPress={() => {setSeaStateVisible(false)
                                setSeaState('')}} style={{paddingBottom: 10, paddingLeft: 10,}}>
                                <Entypo name='cross' size = {23} color={COLORS.black}/>
                            </TouchableOpacit>
                        </View>
                    <View>
                        <Text style = {{fontWeight: 'bold' , ...styles.labelStyles, textAlign: 'center', fontSize: 17}}>{seaState}</Text>
                        {/* <Text style = {styles.slidertext}> m </Text> */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 1,}}>
                        <Text style = {{...styles.overlaysubtext1, color: COLORS.darkGray2}}>1</Text>
                        <Text style = {{...styles.overlaysubtext1, color: COLORS.darkGray2}}>10</Text>
                    </View>
                    <View>
                    <Slider
                        style={{width: Dimensions.get('window').width -50, height: 15, paddingHorizontal: 2}}
                        step={1}
                        minimumValue={1}
                        maximumValue={10}
                        onValueChange={(value) => setSeaState(value)}
                        thumbTintColor={colour.pink}
                        minimumTrackTintColor={colour.pink}
                        maximumTrackTintColor="#000000"
                    />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingBottom: 30,}}>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Calm</Text>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Moderate</Text>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Rough</Text>
                    </View>
                            
                    <View>

                    <Text style = {{...styles.overlaysubtext, fontSize: 14}}>Select sea state on a scale of 1 to 10.</Text>
                    </View>
                    <TouchableOpacit
                            style={styles.overlayButtonWrapper}
                            onPress ={() => setSeaStateVisible(false)}>
                            <Text style= {styles.overlayButtonTExt}>Select</Text>
                        </TouchableOpacit>
                        </View>
                  </Overlay>
                    </View>}
                    <View style = {{flexDirection: 'row', paddingVertical: 1,}}>
                        <TouchableOpacity style={styles.conditionButton} onPress ={() => setCurrDirVisible(true)}>
                            <Image 
                            style = {{ height: 90, width: 38, resizeMode:'contain', alignSelf: 'center',}}
                            source ={require('../../assets/icons/direction.png')}
                            />
                        </TouchableOpacity>
                        <Text style = {styles.labelStyles}>Current  Direction: </Text>
                        <Text style = {styles.sublabelStyles}>{dirSelected}</Text>
                    </View>

                    {currDirVisible && 
                    <View>
                    <Overlay isVisible={currDirVisible} 
                        onBackdropPress={() => {setCurrDirVisible(false)
                        setDirSelected('')}}  
                        overlayStyle = {{borderRadius: 10}}
                    >
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{paddingHorizontal:20,}}></View>
                                <Text style = {{ textAlign: 'center', ...styles.diveLogHeaders}}>Current Direction</Text>
                                <TouchableOpacit onPress={() => {setCurrDirVisible(false)
                                    setDirSelected('')}} style={{paddingBottom: 5, paddingLeft: 10,}}>
                                    <Entypo name='cross' size = {25} color={COLORS.black}/>
                                </TouchableOpacit>
                            </View>
                        
                        <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
            
                            <ImageBackground source= {CompassImage} 
                                style = {{height: 300, width: 300, marginTop: 20, marginRight: 5, borderRadius: 20,}}>
                {/*NW */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', top: 0, left: 0,
                        marginTop: 63, marginLeft: 63},
                        styles.nwdir,
                        {transparancy: 0.12},
                    {backgroundColor: (dirSelected == 'NW') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('NW')}
                />

                {/*NE */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', top: 0, right: 0,
                        marginTop: 61, marginRight: 54},
                    styles.nwdir,
                    {backgroundColor: (dirSelected == 'NE') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('NE')}
                />

                {/*N */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', top: 0, alignSelf: 'center', left: 0,
                        marginTop: 1, marginLeft: 138},
                    styles.Ndir,
                    {backgroundColor: (dirSelected == 'N') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('N')}
                />

                {/*W */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', top: 0, left: 0,
                        marginTop: 131, marginLeft: 6},
                    styles.Ndir,
                    {backgroundColor: (dirSelected == 'W') ? 'rgba(0, 100, 192, 0.28)': 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('W')}
                />

                {/*E */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', top: 0, right: 0,
                        marginTop: 131, marginRight: -2},
                        styles.Ndir,
                    {backgroundColor: (dirSelected == 'E') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('E')}
                />

                {/*S */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', bottom: 0, alignSelf: 'center',left: 0,
                    marginBottom: 1, marginLeft: 138},
                        styles.Ndir,
                    {backgroundColor: (dirSelected == 'S') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('S')}
                />

                {/*SW */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', bottom: 0, left: 0,
                        marginBottom: 63, marginLeft: 63},
                        styles.nwdir,
                    {backgroundColor: (dirSelected == 'SW') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('SW')}
                />

                {/*SE */}
                <Pressable 
                style= {({pressed}) => [
                    {position: 'absolute', bottom: 0, right: 0,
                        marginBottom: 61, marginRight: 56},
                        styles.nwdir,
                    {backgroundColor: (dirSelected == 'SE') ? 'rgba(0, 100, 192, 0.28)' : 'rgba(0,0,0,0.11)'},
                    {borderRadius: 20}
                ]}
                onPress={() => setDirSelected('SE')}
                />
                        </ImageBackground>
                        <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                                        <Text style = {styles.curdirlabelStyles}> {dirSelected}</Text>
                        </View>
                        </View>
                        <TouchableOpacit
                            style={styles.overlayButtonWrapper}
                            onPress ={() => setCurrDirVisible(false)}>
                            <Text style= {styles.overlayButtonTExt}>Select</Text>
                        </TouchableOpacit>
                        </View>
                  </Overlay>
                    </View>}

                    <View style = {{flexDirection: 'row', paddingVertical: 1,}}>
                        <TouchableOpacity style={styles.conditionButton} onPress ={() => setWeatherVisible(true)}>
                            <Image 
                            style = {{ height: 90, width: 50, resizeMode:'contain', alignSelf: 'center'}}
                            source ={require('../../assets/icons/weather.png')}
                            />
                        </TouchableOpacity>
                        <Text style = {styles.labelStyles}>Weather :</Text>
                        <Text style = {{...styles.sublabelStyles, textTransform: 'capitalize'}}>{Weather}</Text>
                    </View>


                    {weatherVisible && 
                    <View>
                    <Overlay isVisible={weatherVisible} 
                    onBackdropPress={() => {setWeatherVisible(false)
                    setWeather('')}}  
                    overlayStyle = {{borderRadius: 10, paddingHorizontal: 10}}
                   >
                    <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{paddingHorizontal:20,}}></View>
                                <Text style = {{ textAlign: 'center', ...styles.diveLogHeaders}}>Weather</Text>
                                <TouchableOpacit onPress={() => {setWeatherVisible(false)
                                    setWeather('')}} style={{paddingBottom: 5, paddingLeft: 10,}}>
                                    <Entypo name='cross' size = {25} color={COLORS.black}/>
                                </TouchableOpacit>
                            </View>
                

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
                    {/* Clear Sky */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'CLEAR SKY'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('CLEAR SKY')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/clearsky.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>CLEAR SKY</Text>
                    </View>

                    {/*Sunny */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, paddingVertical: 10.5,  
                            backgroundColor: (Weather === 'SUNNY'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('SUNNY')}>
                            <Image style ={{...styles.WeatherOptionImage, height: 35, }}
                            source ={require('../../assets/icons/sunny.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>SUNNY</Text>
                    </View>

                    {/*FEW Clouds */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'FEW CLOUDS'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('FEW CLOUDS')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/fewclouds.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>FEW {'\n'}CLOUDS</Text>
                    </View>

                    {/*Scattered Clouds */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'SCATTERED CLOUDS'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('SCATTERED CLOUDS')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/scatteredclouds.png')}
                            />
                        </TouchableOpacit>
                        
                            <Text style={styles.weatherOptionsText}>SCATTERED {'\n'}CLOUDS</Text>
                        
                    </View>

                    {/*Broken Clouds */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'BROKEN CLOUDS'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('BROKEN CLOUDS')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/brokenclouds.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>BROKEN {'\n'}CLOUDS</Text>
                    </View>
                    </View>


                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    {/* LIGHT RAIN */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'LIGHT RAIN/DRIZZLE'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('LIGHT RAIN/DRIZZLE')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/lightrain.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>LIGHT RAIN</Text>
                    </View>

                    {/*MODERATE RAIN */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'MODERATE RAIN'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('MODERATE RAIN')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/moderateshowerrain.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>MODERATE {'\n'}RAIN</Text>
                    </View>

                    {/*HEAVY RAIN */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'HEAVY RAIN'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('HEAVY RAIN')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/heavyshowerrain.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>HEAVY {'\n'}RAIN</Text>
                    </View>

                    {/*THUNDERSTORM */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'THUNDERSTORM'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('THUNDERSTORM')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/thunderstorm.png')}
                            />
                        </TouchableOpacit>
                        <Text style={{...styles.weatherOptionsText, fontSize: 8}}>THUNDERSTORM</Text>
                    </View>

                    {/*MIST */}
                    <View>
                        <TouchableOpacit style={{...styles.weatherOptionButton, 
                            backgroundColor: (Weather === 'MIST'? COLORS.darkGreen1: COLORS.lightGray1)}}
                            onPress={() => setWeather('MIST')}>
                            <Image style ={styles.WeatherOptionImage}
                            source ={require('../../assets/icons/mist.png')}
                            />
                        </TouchableOpacit>
                        <Text style={styles.weatherOptionsText}>MIST</Text>
                    </View>
                    </View>

                    <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style = {{fontWeight: 'bold' , ...styles.labelStyles, fontSize: 16}}>{Weather}</Text>
                    </View>
                    <TouchableOpacit
                            style={styles.overlayButtonWrapper}
                            onPress ={() => setWeatherVisible(false)}>
                            <Text style= {styles.overlayButtonTExt}>Select</Text>
                        </TouchableOpacit>
                        </View>
                  </Overlay>
                    </View>}


                    <View style = {{flexDirection: 'row', paddingVertical: 1,}}>
                        <TouchableOpacity style={styles.conditionButton} onPress ={() => setVisibilityVisible(true)}>
                            <Image 
                            style = {{ height: 90, width: 50, resizeMode:'contain', alignSelf: 'center',}}
                            source ={require('../../assets/icons/visibility.png')}
                            />
                        </TouchableOpacity>
                        <Text style = {styles.labelStyles}>Visibility: </Text>
                        <Text style = {styles.sublabelStyles}>{visibiltiy}</Text>
                    </View>


                    {visibilityVisible && 
                    <View>
                    <Overlay isVisible={visibilityVisible} 
                    onBackdropPress={() => {setVisibilityVisible(false)
                    setVisibility('')}}  
                    overlayStyle = {{borderRadius: 10}}
                    //backdropStyle = {{color: "rgbs(0,0,0, 0.8)"}}
                   >
                    <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{paddingHorizontal:20,}}></View>
                                <Text style = {{ textAlign: 'center', ...styles.diveLogHeaders}}>Visibility</Text>
                                <TouchableOpacit onPress={() => {setVisibilityVisible(false)
                                setVisibility('')}} style={{paddingBottom: 5, paddingLeft: 10,}}>
                                    <Entypo name='cross' size = {25} color={COLORS.black}/>
                                </TouchableOpacit>
                            </View>
                    <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style = {{fontWeight: 'bold' , ...styles.labelStyles, textTransform: 'lowercase'}}>{visibiltiy}</Text>
                    </View>
                    <View>
                        <Image style = { {height: 190, width: 280, resizeMode:'contain', alignSelf: 'center',}} 
                        source = {require('../../assets/images/visibility-image.jpg')} 
                        blurRadius = {blurVisibility.value}/>
                    </View>
                    <Slider
                        style={{width: Dimensions.get('window').width - 80, height: 30, marginTop: 20}}
                        step={1}
                        minimumValue={0}
                        maximumValue={21}
                        onValueChange={(value) => {
                            setBlurVisibility({value: (21 - value)})
                            assignVisibility(value)
                        }}
                        thumbTintColor={colour.pink}
                        minimumTrackTintColor={colour.pink}
                        maximumTrackTintColor="#000000"
                    />
                    <TouchableOpacit
                            style={styles.overlayButtonWrapper}
                            onPress ={() => 
                                setVisibilityVisible(false)
                                }>
                            <Text style= {styles.overlayButtonTExt}>Select</Text>
                        </TouchableOpacit>
                        </View>
                  </Overlay>
                    </View>}

                    <View style = {{flexDirection: 'row', paddingVertical: 1,}}>
                        <TouchableOpacity style={styles.conditionButton} onPress ={() => setCurrSpeedVisible(true)}>
                            <Image 
                            style = {{ height: 90, width: 35, resizeMode:'contain', alignSelf: 'center',}}
                            source ={require('../../assets/icons/speed.png')}
                            />
                        </TouchableOpacity>
                        
                        <Text style = {styles.labelStyles}>Current Speed :</Text>
                        <Text style = {styles.sublabelStyles}>{currentSpeed}</Text>
                       
                    </View>

                    {currSpeedVisible && 
                    <View>
                    <Overlay isVisible={currSpeedVisible} 
                    onBackdropPress={() => {setCurrSpeedVisible(false)
                    setCurrentSpeed('')}}  
                    overlayStyle = {{borderRadius: 10}}
                    //backdropStyle = {{color: "rgbs(0,0,0, 0.8)"}}
                   >
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{paddingHorizontal:20,}}></View>
                            <Text style = {{ textAlign: 'center', ...styles.diveLogHeaders}}>Current Speed</Text>
                            <TouchableOpacit onPress={() => {setCurrSpeedVisible(false)
                    setCurrentSpeed('')}} style={{paddingBottom: 10, paddingLeft: 10,}}>
                                <Entypo name='cross' size = {23} color={COLORS.black}/>
                            </TouchableOpacit>
                        </View>
                    <View style = {{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style = {{fontWeight: 'bold' , ...styles.labelStyles, fontSize: 17}}>{currentSpeed}</Text>
                        {/* <Text style = {styles.slidertext}> m </Text> */}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 1,}}>
                        <Text style = {{...styles.overlaysubtext1, color: COLORS.darkGray2}}>1</Text>
                        <Text style = {{...styles.overlaysubtext1, color: COLORS.darkGray2}}>10</Text>
                    </View>
                    <Slider
                        style={{width: Dimensions.get('window').width - 50, height: 20}}
                        step={1}
                        minimumValue={0}
                        maximumValue={10}
                        onValueChange={(value) => setCurrentSpeed(value)}
                        thumbTintColor={colour.pink}
                        minimumTrackTintColor={colour.pink}
                        maximumTrackTintColor="#000000"
                    />
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingBottom: 30,}}>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Slow</Text>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Moderate</Text>
                        <Text style = {{...styles.overlaysubtext, color: COLORS.darkGray2}}>Fast</Text>
                    </View>
                            
                    <View>
                    <Text style = {{...styles.overlaysubtext, fontSize: 14}}>Select current speed on a scale of 1 to 10.</Text>
                    </View>
                    
                    <TouchableOpacit
                            style={styles.overlayButtonWrapper}
                            onPress ={() => setCurrSpeedVisible(false)}>
                            <Text style= {styles.overlayButtonTExt}>Select</Text>
                        </TouchableOpacit>
                        </View>
                  </Overlay>
                    </View>}
                    
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
    overlaysubtext1: {
        fontFamily: "LatoBold", 
        fontSize: 14, 
        textAlign:'center',
        color: COLORS.darkGray2
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
        fontSize: 15,
        fontFamily: 'LatoRegular',
        padding: 5,
        paddingLeft: 10, 
        paddingVertical: 24,
        textTransform: 'capitalize',
    },
    sublabelStyles :{ 
        fontSize: 16,
        fontFamily: 'LatoRegular',
        padding: 5,
        paddingLeft: 10, 
        paddingVertical: 25,
       // textTransform: 'capitalize', 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        position: 'absolute', 
        right: 10,
    },
    conditionButton: {
        width: 100,
        height: 55, 
        backgroundColor: COLORS.lightblue4, 
        borderRadius: 14, 
        borderColor: COLORS.lightblue4, 
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
    curdirlabelStyles: {
        fontSize: 18,
        fontFamily: 'LatoBold',
        padding: 5,
        paddingLeft: 10, 
        paddingVertical: 24,
       // textTransform: 'capitalize',
    },
    nwdir: {
        width: 32,
        height:32,
    },
    Ndir: {
        width: 35,
        height:35,
    },
    weatherOptionButton: {
        borderRadius: 8, 
        //backgroundColor: COLORS.darkGreen1,  
        alignItems: 'center', 
        justifyContent: 'center',
        marginHorizontal: 3,
        padding: 3,
        //paddingHorizontal: 5,
        
    },
    WeatherOptionImage: {
        height: 50, 
        width: 50, 
        resizeMode: 'contain',
    },
    weatherOptionsText: {
        fontSize: 10, 
        fontFamily: "LatoBold", 
        color: COLORS.darkGray2, 
        textAlign: 'center', 
        paddingTop: 9,
        paddingVertical: 5
    },
})

export default Weather;

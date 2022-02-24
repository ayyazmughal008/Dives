import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { COLORS, SIZES, colour } from '../../assets/colors/theme';

import AuthLayout from '../../components/auth/AuthLayout';
import TextButton from '../../components/auth/TextButton';


const otp = ({navigation}) => {

    const [timer, setTimer] = React.useState(60)

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevTimer => {
                if(prevTimer > 0) {
                    return prevTimer - 1
                } else {
                    return prevTimer
                }
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    

    return (
        <AuthLayout
            title = "OTP Authentication"
            subtitle = "An authentication code has been sent to your device."
            titleContainerStyle = {{
                //marginTop: SIZES.padding *2
            }}>
            {/**OTP Input */}
            <View
             style ={{
                 flex:1,
                 marginVertical: SIZES.padding *2,
                 marginHorizontal: 10
             }}>
                <OTPInputView 
                    pinCount= {4}
                    style={{
                        width: '100%',
                        height: 50,
                    }}
                    codeInputFieldStyle ={{
                        width: 65,
                        height: 65,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        color: COLORS.black,
                        fontFamily: 'PoppinsSemiBold',
                        fontSize: 16,
                    }}
                    onCodeFilled ={(code) => {
                        console.log(`Code is ${code}`)
                    }}
                />
                {/* Countdown Timer */}
                <View style ={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: SIZES.padding
                }}>
                    <Text style = {{
                        color: COLORS.darkGray, 
                        fontFamily: 'PoppinsRegular',
                        fontSize: 14,
                    }}>
                        Didn't recieve code?
                    </Text>
                    <TextButton 
                        label = {`Resend (${timer}s)`}
                        disabled = {timer == 0 ? false : true}
                        buttonContainerStyle ={{
                            marginLeft: SIZES.base,
                            backgroundColor: null,
                        }}
                        labelStyle ={{
                            color: COLORS.darkpink2,
                            fontFamily: 'PoppinsRegular',
                            fontSize: 14,

                        }} 
                        onPress ={() => setTimer(60)}/>        
                </View>
            </View>

            {/*Footer */}
            <View style ={{
                marginTop:180,
                marginHorizontal: 10,
                marginBottom: 10,
            }}>
                <TextButton 
                    label = "Continue"
                    buttonContainerStyle ={{
                        height: 50, 
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.pink,
                    }}
                    onPress={() => navigation.replace("SignIn")} 
                />
                <View style ={{
                    marginTop: 10,
                    alignItems: 'center',
                }}>
                    <Text style = {{
                        color: COLORS.darkGray,
                        fontFamily: 'PoppinsRegular',
                        fontSize: 14,
                    }}>
                        By Signing up you agree to our
                    </Text>
                    <TextButton
                        label ="Terms and Conditions"
                        buttonContainerStyle={{
                            backgroundColor: null,
                        }}
                        labelStyle={{
                            color: COLORS.darkpink2,
                            fontFamily: 'PoppinsRegular',
                            fontSize: 14,
                        }}
                        onPress={() => navigation.navigate("TermsandCond")} 
                    />
                </View>
            </View>
            
        </AuthLayout>
    );
}

const styles = StyleSheet.create({})

export default otp;

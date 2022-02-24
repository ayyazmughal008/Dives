import React from 'react';
import {View, StyleSheet, Text,} from 'react-native';
import { Feather, AntDesign } from 'react-native-vector-icons';


import { COLORS, SIZES, colour } from '../../assets/colors/theme';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthformInput from '../../components/auth/AuthformInput';
import TextButton from '../../components/auth/TextButton';
import { auth } from '../../firebase';





Feather.loadFont();

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState("")
    const [emailError, setEmailError] = React.useState("")

    function isEnabledEmail() {
        return email != "" && emailError == "" 
    }

    function SendEmailPress() {
        alert('Are your sure to logout?')
        navigation.goBack()
    }

    const forgotPassword = (Email) => {
        auth.sendPasswordResetEmail(email)
          .then(function (user) {
            alert('Link to reset email has been sent to ' + email)
            navigation.goBack()
          }).catch(function (e) {
            alert(e)
          })
      }

      React.useEffect(() => {

      }, [email])

    return (
        <AuthLayout 
        title = "Password Recovery"
        subtitle = "Please Enter your email adress to recover your password"
        titleContainerStyle= {{
           // marginTop: SIZES.padding * 2,
            
        }} >
           {/*  Form Input */}
            <View style ={{
                flex: 1,
                marginTop: SIZES.padding * 2,
                marginHorizontal: 10,
            }}>
                <AuthformInput 
                        label = "Email"
                        keyboardType = "email-address"
                        autoCompleteType = "email"
                        onChangeText= {(value) => {
                           // Utils.validateEmail(value, setEmailError)
                            setEmail(value)
                        }}
                        errorMsg ={emailError}
                        appendComponent ={
                            <View style = {{
                                justifyContent: 'center'
                            }}>
                                    {email =="" || (email != "" && emailError =="") ? <Feather name ="check-circle" color= {COLORS.green} 
                                    size = {20} />:<Feather name ="x-circle" color= {COLORS.red} size = {20} />}
                            </View>
                        } 
                    />
           </View>
           {/* Button */}
           <TextButton 
           label = "Send Email"
           disabled = {isEnabledEmail() ? false : true}
           buttonContainerStyle={{
               height: 55, 
               alignItems: 'center',
               marginTop: SIZES.padding * 1.5,
               borderRadius: SIZES.radius, 
               backgroundColor: isEnabledEmail() ? COLORS.pink : COLORS.lightpink,
               marginHorizontal: 10,
           }}
           onPress={() => {
               console.log(email)
               forgotPassword(email)
        }}
            />
            <TextButton 
           label = "Cancel"
           //disabled = {isEnabledEmail() ? false : true}
           buttonContainerStyle={{
               height: 55, 
               alignItems: 'center',
               marginTop: 20,
               borderRadius: SIZES.radius, 
               backgroundColor: COLORS.pink,
               marginHorizontal: 10,
           }}
           onPress={() => navigation.replace('SignIn')}
            />

        </AuthLayout>
    );
}

const styles = StyleSheet.create({})

export default ForgotPassword;

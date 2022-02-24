import React from 'react';
import { View, StyleSheet, Text , ActivityIndicator,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Formik, useFormik, Form } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';


import fb from '../../assets/icons/fb.png'
import google from '../../assets/icons/google.png'
import { COLORS, SIZES, colour } from '../../assets/colors/theme';

import CustomSwitch from '../../components/auth/CustomSwitch'
import TextButton from '../../components/auth/TextButton';
import TextIconButton from '../../components/auth/TextIconButton';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthformInput from '../../components/auth/AuthformInput';
import { AuthContext } from '../../components/auth/context';

import { userSignInSchema } from '../../validation/SignInValidation'
import { auth } from '../../firebase';
import Constants from 'expo-constants'; //So we can read app.json extra
import * as Google from 'expo-google-app-auth'; //google auth libraries
import firebase from 'firebase';
import {Restart} from 'fiction-expo-restart';


const SignIn = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [isLoading, setLoading] = React.useState(false)
    const [showpassword, setShowPassword] = React.useState(false)
    const [saveMe, setSaveMe] = React.useState(false)
    const [user, setUser] = React.useState({
        emailss: '',
        passwordss: '',
    })


    const SIGNED_IN = 'signedIn';

    const handleLogin = () => {
        setLoading(true)
        fetch(`http://157.245.56.243/dives/public/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                setLoading(false)
                if (json.status == 200) {
                    try {
                        AsyncStorage.setItem(SIGNED_IN, JSON.stringify(json)
                            , err => {
                                if (err) {
                                    console.log(err)
                                }
                                console.log("success");
                            });
                        setTimeout(() => {
                            Restart();
                        }, 500)
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
        // auth
        //     .signInWithEmailAndPassword(email, password)
        //     .then(userCredentials => {
        //         const user = userCredentials.user;
        //         try{
        //             setTimeout(() => {
        //                 AsyncStorage.setItem(SIGNED_IN, 'true');
        //             }, 500)
        //         }catch {
        //             console.log("COudn't access async storage")
        //         }

        //         if (user){
        //             signIn();
        //         }

        //         console.log('Logged in with:', user);  
        //     })
        //     .catch(error => alert(error.message))
    }

    const Glogin = async () => {
        try {
            //await GoogleSignIn.askForPlayServicesAsync();
            const result = await Google.logInAsync({ //return an object with result token and user
                iosClientId: Constants.manifest.extra.IOS_KEY, //From app.json
                androidClientId: Constants.manifest.extra.ANDROIUD_KEY, //From app.json
            });
            if (result.type === 'success') {
                console.log(result);
                setIsLoading(true);
                const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
                    result.idToken,
                    result.accessToken
                );
                auth
                    .signInWithCredential(credential) //Login to Firebase
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                //CANCEL
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    const formRef = React.useRef();

    const addUSer = () => {
        let formuser = formRef.current.values
        let curemail = formRef.current.values.email
        let curpass = formRef.current.values.password
        setEmail(curemail)
        setPassword(curpass)
        setUser(formuser)
    }

    React.useEffect(() => {
        if (email === '' && password === '') {
            return;
        } else {
            handleLogin();
        }
    }, [user])


    // React.useEffect(() => {
    //     const onSubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             user.userProfile({
    //                 username: user
    //             })
    //         }
    //     })
    //     return onSubscribe
    // }, []);

    return (
        <AuthLayout
            title="Let's Sign You In"
            subtitle="Welcome back, you have been missed"
        >
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding,
                    paddingHorizontal: 10,
                }}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    innerRef={formRef}
                    validationSchema={userSignInSchema}
                    onSubmit={(values, actions) => {
                        addUSer();
                        actions.resetForm();
                    }}
                >
                    {({ handleChange, handleBlur, touched, errors, isValid, handleSubmit, values }) => (
                        <View>
                            {/*Form Input */}

                            <AuthformInput
                                label="Email"
                                keyboardType="email-address"
                                autoCompleteType="email"

                                value={values.email}
                                onChangeText={
                                    handleChange('email')
                                }
                                onBlur={handleBlur('email')}
                                errorMsg={touched.email && errors.email}
                                appendComponent={
                                    <View style={{
                                        justifyContent: 'center'
                                    }}>
                                        {!touched.email ? <Feather name="check-circle" color={COLORS.darkGray2} size={20} /> :
                                            !errors.email ? <Feather name="check-circle" color={COLORS.green}
                                                size={20} /> : <Feather name="x-circle" color={COLORS.red} size={20} />}
                                    </View>
                                }
                            />
                            <AuthformInput
                                label='Password'
                                autoCompleteType='password'
                                secureTextEntry={!showpassword}
                                containerStyle={{
                                    marginTop: 5,
                                }}
                                errorMsg={touched.password && errors.password}
                                value={values.password}
                                onChangeText={
                                    handleChange('password')
                                }
                                // onSubmitEditing={() => setPassword(values.password)}
                                onBlur={handleBlur('password')}
                                appendComponent={
                                    <TouchableOpacity style={{ justifyContent: 'center', }}
                                        onPress={() => setShowPassword(!showpassword)} >
                                        <View>
                                            {showpassword ? <Feather name="eye-off" color={COLORS.gray}
                                                size={20} style={{ marginVertical: 15, }} /> :
                                                <Feather name='eye' color={COLORS.gray} size={20} style={{ marginVertical: 15, }} />}
                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                            {/*Sign In */}
                            <TextButton
                                label="Sign In"
                                disabled={!isValid}
                                buttonContainerStyle={{
                                    height: 55,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: touched.email && isValid ? COLORS.pink
                                        : COLORS.lightpink
                                }}
                                onPress={handleSubmit}
                            />

                        </View>
                    )}

                </Formik>

                {/*Save me & forgot password */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'space-between'
                    }}>
                    <CustomSwitch
                        value={saveMe}
                        onChange={(value) => setSaveMe(value)} />

                    <TextButton
                        label='Forgot Password'
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.gray,
                            fontFamily: 'PoppinsRegular',
                            fontSize: 14,
                        }}
                        onPress={() => navigation.navigate("ForgotPassword")}
                    />
                </View>

                {/*Sign Up */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    justifyContent: 'center',

                }}>
                    <Text style={{
                        color: COLORS.darkGray,
                        fontFamily: "PoppinsRegular",
                        fontSize: 16,
                    }}>
                        Don't have an account?
                    </Text>
                    <TextButton
                        label="Sign Up"
                        buttonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.darkpink2,
                            fontFamily: "PoppinsRegular",
                            fontSize: 16,
                        }}
                        onPress={() => navigation.navigate("SignUp")}
                    />
                </View>

                {/*Footer */}

                <View
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 20,
                        marginTop: 35
                    }}>
                    {/*Facebook */}
                    {/* <TextIconButton
                        containerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue,
                        }}
                        icon ={fb}
                        iconPosition = "LEFT"
                        iconStyle = {{
                            marginHorizontal: 10,
                            tintColor: COLORS.white,
                        }}
                        label = "Continue with Facebook"
                        labelStyle = {{
                            marginLeft: 3,
                            color: COLORS.white,
                        }}
                        onPress= {() => console.log("FB")}
                    /> */}

                    {/*Google */}
                    {/* <TextIconButton 
                        containerStyle ={{
                            height: 50, 
                            alignItems: 'center',
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        icon= {google}
                        iconPosition = "LEFT"
                        iconStyle = {{
                            marginHorizontal: 20,
                        // tintColor: null,
                        }}
                        label = "Continue with Google"
                        labelStyle = {{
                            marginLeft: SIZES.radius,
                            
                        }}
                        onPress= {() => Glogin()}
                     /> */}
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
        </AuthLayout>
    );
}

const styles = StyleSheet.create({})

export default SignIn;

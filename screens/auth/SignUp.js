import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';

import fb from '../../assets/icons/fb.png'
import google from '../../assets/icons/google.png'
import { COLORS, SIZES } from '../../assets/colors/theme';

import AuthLayout from '../../components/auth/AuthLayout';
import AuthformInput from '../../components/auth/AuthformInput';
import TextButton from '../../components/auth/TextButton';
import TextIconButton from '../../components/auth/TextIconButton';
import { AuthContext } from '../../components/auth/context';

import { userSignUpSchema } from '../../validation/SignUpValidation'
import { auth } from '../../firebase'

const SignUp = ({ navigation }) => {
    const { signUp } = React.useContext(AuthContext);
    //const { user } = React.useContext(AuthContext);

    // const [user, setUser] = React.useState({
    //     username: '',
    //     password: '',
    //     email: '',
    // })
    const [isLoading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [user, setUSer] = React.useState({
        email: '',
        username: '',
    })
    // const [confirmPassword, setConfirmPassword] = React.useState("")
    const [showpassword, setShowPassword] = React.useState(false)
    const [showconfpassword, setShowconfPassword] = React.useState(false)

    const handleSignUp = () => {
        setLoading(true)
        fetch(`http://157.245.56.243/dives/public/api/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: username
            })
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoading(false)
                if (json.status == 200) {
                    Alert.alert('', json.message)
                    navigation.navigate("SignIn");
                } else {
                    Alert.alert('', json.message)
                }

            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
        // auth
        // .createUserWithEmailAndPassword(email, password)    
        // .then(userCredentails => {
        //     const user = userCredentails.user;
        //     console.log('Registered with:', user.email);
        //     signUp();
        //     navigation.navigate("SignIn");
        // })
        // .onAuthStateChanged((user=> {
        //     if (user) {
        //       user.updateProfile({ // <-- Update Method here
        //         displayName: username,
        //        // photoURL: "https://example.com/jane-q-user/profile.jpg"
        //       }).then(function() {

        //         // Profile updated successfully!
        //         //  "NEW USER NAME"

        //         console.log(user.displayName);
        //         // "https://example.com/jane-q-user/profile.jpg"
        //         //var photoURL = user.photoURL;

        //       }, function(error) {
        //           console.log(error)
        //         // An error happened.
        //       });     

        //     }
        // }))
        //.catch(error => alert(error.message))
    }

    React.useEffect(() => {
        if (username != '' && password != '' && email != '') {
            console.log(user)
            handleSignUp();
        }
    }, [user])

    // React.useEffect(() => {
    //     const onSubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             user.updateProfile({
    //                 displayName: username,
    //             })

    //             // if (user) {
    //             //     firebaseDataBase.ref('users/' + user.uid).set({
    //             //         email: user.email,
    //             //         uid : user.uid,
    //             //         name: username
    //             //     });
    //             //     console.log(user, "is signed in.");
    //             // } else {
    //             //     console.log("No user is signed in.");
    //             // }
    //         }
    //     })
    //     return onSubscribe
    // }, []);

    // React.useEffect(() => {

    //     firebase.database().ref('users/' + userId).set({
    //         username: username,
    //         email: email,
    //         //profile_picture : imageUrl,
    //         // Add more stuff here
    //     });

    // }, [username])






    return (
        <AuthLayout
            title="Getting Started"
            subtitle="Create an account to continue!"
            titleContainerStyle={{
                marginTop: 1
            }} >
            {/* Form input and Sign up */}
            <View style={{
                flex: 1,
                marginTop: 5,
                paddingHorizontal: 10,
            }}>
                <Formik
                    initialValues={{
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={userSignUpSchema}
                    onSubmit={(values, actions) => {
                        setEmail(values.email)
                        setPassword(values.password)
                        setUsername(values.username)
                        setUSer({
                            email: values.email,
                            username: values.username
                        })
                        console.log(values)

                        actions.resetForm();
                    }
                    }
                >
                    {({ handleChange, handleBlur, touched, errors, isValid, handleSubmit, values }) => (
                        // const {username, email, password, confirmPassword} = values
                        <View>
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
                                label="Username"
                                containerStyle={{
                                    marginTop: 5
                                }}
                                errorMsg={touched.username && errors.username}
                                onChangeText={
                                    handleChange('username')
                                }
                                onBlur={handleBlur('username')}
                                value={values.username}
                                appendComponent={
                                    <View style={{
                                        justifyContent: 'center'
                                    }}>
                                        {!touched.username ? <Feather name="check-circle" color={COLORS.darkGray2} size={20} /> :
                                            !errors.username ? <Feather name="check-circle" color={COLORS.green}
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
                                onBlur={handleBlur('password')}
                                // errorMsg ={passwordError}
                                appendComponent={
                                    <TouchableOpacity style={{

                                        justifyContent: 'center',
                                    }}
                                        onPress={() => setShowPassword(!showpassword)}
                                    >
                                        <View>
                                            {showpassword ? <Feather name="eye-off" color={COLORS.gray}
                                                size={20} style={{ marginVertical: 15, }} /> : <Feather name='eye' color={COLORS.gray} size={20} style={{ marginVertical: 15, }} />}

                                        </View>
                                    </TouchableOpacity>
                                }
                            />

                            <AuthformInput
                                label='Confirm Password'
                                autoCompleteType='password'
                                secureTextEntry={!showconfpassword}
                                containerStyle={{
                                    marginTop: 5,
                                }}
                                value={values.confirmPassword}
                                errorMsg={touched.confirmPassword && errors.confirmPassword}
                                onChangeText={
                                    handleChange('confirmPassword')
                                }
                                onBlur={handleBlur('confirmPassword')}
                                appendComponent={
                                    <TouchableOpacity style={{

                                        justifyContent: 'center',
                                    }}
                                        onPress={() => setShowconfPassword(!showconfpassword)}
                                    >
                                        <View>
                                            {showconfpassword ? <Feather name="eye-off" color={COLORS.gray}
                                                size={20} style={{ marginVertical: 15, }} /> : <Feather name='eye' color={COLORS.gray} size={20} style={{ marginVertical: 15, }} />}

                                        </View>
                                    </TouchableOpacity>
                                }
                            />
                            <TextButton
                                label="Sign Up"
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


                {/*  Sign up & sign in Buttons*/}
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        color: COLORS.darkGray,
                        fontFamily: "PoppinsRegular",
                        fontSize: 16,
                    }}> Already have an account?</Text>
                    <TextButton
                        label="Sign In"
                        buttonContainerStyle={{
                            backgroundColor: null
                        }}
                        labelStyle={{
                            color: COLORS.darkpink2,
                            fontFamily: "PoppinsRegular",
                            fontSize: 16,
                        }}
                        onPress={() => navigation.navigate('SignIn')}
                    />
                </View>

                {/*Footer */}
                {/* <View
                    style = {{
                        marginHorizontal: 10,
                        marginVertical: 15,
                    }}> */}
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
                                marginLeft: SIZES.radius,
                                color: COLORS.white
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
                            onPress= {() => console.log("Google")}
                         />
                        </View> */}
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

export default SignUp;

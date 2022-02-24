import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';


import Home from '../screens/tabs/Home';
import Details from '../screens/tabs/Details';
import Liked from '../screens/tabs/Liked';
import Profile from '../screens/tabs/Profile';
import Explore from '../screens/tabs/Explore';
import LearnMore from '../screens/tabs/LearnMore';
import MapView from '../screens/tabs/MapView';

import Settings from '../screens/drawer/settings';
import About from '../screens/drawer/About';
import FAQs from '../screens/drawer/FAQs';
import ProfileScreen from '../screens/drawer/profileScreen';
import PhotoUpload from '../screens/drawer/PhotoUpload';
import Drawerscreen from '../screens/drawer/Drawerscreen';
// import Certificates from '../screens/Certificates';
// import Mapuse from '../components/mapuse';

//import Divelogging from '../screens/divelogs/DiveLogging';
import Divelogging from '../screens/divelogs/DiveLogging';
import DiveEditing from '../screens/divelogs/DiveEditing';
import MapUse from '../screens/divelogs/MapUse';
import Divingdata from '../screens/divelogs/DivingData';
import Share from '../screens/divelogs/Share';

import LoadingScreen from '../screens/loadingScreen';
import Splashscreen from '../screens/splashscreen';

import SignIn from '../screens/auth/SignIn';
import OnBoarding from '../screens/auth/OnBoarding';
import SignUp from '../screens/auth/SignUp';
import Otp from '../screens/auth/otp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import TermsandCond from '../screens/auth/TermsnCon';
import Welcome from '../screens/auth/welcome';


import { COLORS, colour } from '../assets/colors/theme';
import { AuthContext } from '../components/auth/context';
import checkIfFirstLaunch from '../components/auth/CheckfirstLauch';
import { auth } from '../firebase';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Photos from '../screens/drawer/PhotoUpload';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



// const Rootstackscreens = ({userToken}) => {
//     return(
//         <Rootstack.Navigator>
//             {userToken ? (<Rootstack.Screen name = "Auth" component = {AuthStack} options = {{headerShown: false}}/>
//           )  : (<Rootstack.Screen name = "App" component = {MainDrawer} options = {{headerShown: false}}/>
//            ) }
//         </Rootstack.Navigator>
//     )
// };


const MainNav = () => {

    const [username, setUsername] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);
    const [isFirstLauch, setFirstLaunch] = React.useState(true);
    const [hasCheckedAsyncStorage, setCheckedAsyncStorage] = React.useState(false);

    //     const [colorsch, setcolorsch] = React.useState(true)


    //     const MyComponent= ()=> {
    //      if (colorScheme === 'dark') {
    //        setcolorsch(false)
    //      } else {
    //        setcolorsch(true)
    //      }
    //      console.log(colorScheme)
    //    }





    // const [isSignedOut, setIsSignedOut] = React.useState(false);
    // const [viewdOnboarding, setViewedOnboarding] = React.useState(false)

    // const initialLoginState ={
    //     isLoading: true,
    //     username: null,
    //     userToken: null,
    // }


    // const LoginReducer =(prevState, action) => {
    //     switch(action.type) {
    //         case 'RETRIEVE_TOKEN' :
    //             return {
    //                 ...prevState, 
    //                 userToken: action.token,
    //                 isLoading: false,
    //             };
    //         case 'LOGIN' : 
    //             return {
    //                 ...prevState,
    //                 username: action.id,
    //                 userToken: action.token,
    //                 isLoading: false,
    //             };
    //         case 'LOGOUT' : 
    //             return {
    //                 ...prevState,
    //                 username: null,
    //                 userToken: null,
    //                 isLoading: false,
    //             };
    //         case 'REGISTER' : 
    //             return {
    //                 ...prevState,
    //                 username: action.id,
    //                 userToken: action.token,
    //                 isLoading: false, 
    //             }
    //     }
    // }

    // const [loginState, dispatch] = React.useReducer(LoginReducer, initialLoginState)

    const authContexts = React.useMemo(() => {
        return {
            signIn: () => {
                //fetch username and token from db
                setUserToken('true')
                setIsLoading(false);
            },
            signUp: () => {
                setIsLoading(false);

            },
            signOt: () => {
                setIsLoading(false);
                setUserToken(null);
            },
            user: (user) => {
                setUsername(user)
                return username;
            }

        }
    }, []);

    const bootstrapAsync = async () => {
        let userTokens;
        try {
            userTokens = await AsyncStorage.getItem('signedIn')
            if (userTokens !== null) {
                setUserToken(userTokens)
                console.log('===>', userTokens)
            } else {
                console.log('no data found')
            }
        }
        catch {
            console.log('Couldnt get token')
        }
        setIsLoading(false)
    }

    const setlaunched = async () => {
        const isFirstLaunchs = await checkIfFirstLaunch();
        setFirstLaunch(isFirstLaunchs)
    }

    React.useEffect(() => {
        // setTimeout(()=> {
        // }, 1000)
        setTimeout(() => {
            setlaunched();
            bootstrapAsync();
        }, 1000);

        //  MyComponent();

        // setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={authContexts}>
            {isLoading ? <Splashscreen /> : userToken ?
                <MainDrawer /> : isFirstLauch ? <OnboardingStack /> :
                    <AuthStack />}
        </AuthContext.Provider>
    )
};

{/*Auth screens */ }

const OnboardingStack = () => {
    return (
        <Stack.Navigator initialRouteName='Onboard'>
            <Stack.Screen name="Onboard" component={OnBoarding} options={{ headerShown: false }} />
            <Stack.Screen name="initialauth" component={AuthStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Welcome'}
        >

            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />

            <Stack.Screen
                name="Otp"
                component={Otp}
            />

            <Stack.Screen
                name="TermsandCond"
                component={TermsandCond}
            />
        </Stack.Navigator>

    )
}




{/*Main screens */ }
const FriendStack = () => {
    return (
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            {/* <Stack.Screen name = "inviteFriends" component = {InviteFriends} options = {{headerShown: false}}/> */}
        </Stack.Navigator>
    )
};

// const DiveLogs = () => {
//     return (
//         <Stack.Navigator initialRouteName = 'Profile'>
//           <Stack.Screen name = "Dive Logging" component = {Divelogging} options = {{headerShown: true}}/>
//           {/* <Stack.Screen name = "Mapuse" component = {Mapuse} options = {{headerShown: false}}/> */}
//         </Stack.Navigator>
//     )
// }

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                headerShown: false,
                showLabel: true,


            }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Entypo name="home" size={32} color={focused ? COLORS.darkpink1 : COLORS.darkGray3}
                            style={focused ? { paddingTop: 2, } : { paddingTop: 10, }} />
                    ),
                    tabBarLabel: ({ focused }) => {
                        return <Text style={focused ? { fontSize: 10, fontWeight: '600', color: COLORS.pink, paddingBottom: 5, } :
                            { fontSize: 8, paddingBottom: 3 }}>{focused ? "Home" : null}</Text>
                    }
                }} />
            <Tab.Screen name="Dive Logs" component={Liked}
                options={{

                    tabBarIcon: ({ focused, color }) => (
                        <MaterialIcon name="list-alt" size={32} color={focused ? COLORS.darkpink1 : COLORS.darkGray3}
                            style={focused ? { paddingTop: 2 } : { paddingTop: 10, }} />
                    ),
                    tabBarLabel: ({ focused }) => {
                        return <Text style={focused ? { fontSize: 10, fontWeight: '600', color: COLORS.darkpink1, paddingBottom: 5, } :
                            { fontSize: 8, paddingBottom: 3 }}>{focused ? "Dive Logs" : null}</Text>
                    }
                }} />
            <Tab.Screen name="Photos" component={Photos}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <MaterialIcon name="collections" size={32} color={focused ? COLORS.darkpink1 : COLORS.darkGray3}
                            style={focused ? { paddingTop: 2 } : { paddingTop: 10, }} />
                    ),
                    tabBarLabel: ({ focused }) => {
                        return <Text style={focused ? { fontSize: 10, fontWeight: '600', color: COLORS.darkpink1, paddingBottom: 5, } :
                            { fontSize: 8, paddingBottom: 3 }}>{focused ? "Photos" : null}</Text>
                    }
                }} />
        </Tab.Navigator>
    )
};

const MainStack = () => {
    const colorScheme = useColorScheme();

    return (
        <Stack.Navigator initialRouteName='TabNavigator' >
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
            <Stack.Screen name="LearnMore" component={LearnMore} options={{ headerShown: false }} />
            <Stack.Screen name="MapUse" component={MapUse} options={{ headerShown: false }} />
            <Stack.Screen name="MapView" component={MapView} options={{ headerShown: false }} />
            <Stack.Screen name="DivingData" component={Divingdata} options={{ headerShown: false }} />
            <Stack.Screen name="Share" component={Share} options={{ headerShown: false }} />
            <Stack.Screen name="Dive Log" component={Divelogging} options={{
                headerShown: true,
                //headerTitleStyle :{color: (colorScheme === 'light') ? COLORS.black: COLORS.white},
                //headerTintColor: (colorScheme === 'light') ? COLORS.black: COLORS.white,
            }} />
            <Stack.Screen name="Dive Edit" component={DiveEditing} options={{
                headerShown: true,
                // headerTitleStyle :{color: (colorScheme === 'light') ? COLORS.black: COLORS.white},
                //headerTintColor: (colorScheme === 'light') ? COLORS.black: COLORS.white,
            }} />
        </Stack.Navigator>
    )
};

const DrawerScreenss = ({ navigation, style }) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator initialRouteName="Dashboard"
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    headerShown: false,
                    headerLeft: () => (
                        <TouchableOpacity transparent onPress={() => navigation.openDrawer()}>
                            <Feather name="menu" size={24} color="black" style={{ paddingHorizontal: 10 }} />
                        </TouchableOpacity>
                    ),
                }}>
                <Stack.Screen name="Dashboard"
                    options={({ route }) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard'
                        if (routeName == "Dashboard")
                            return ({ swipeEnabled: false })
                    }}
                >{props => <MainStack {...props} />}</Stack.Screen>

                <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>{props => <ProfileScreen {...props} />}</Stack.Screen>
                <Stack.Screen name="Profile" options={{ headerShown: false }}>{props => <Profile {...props} />}</Stack.Screen>
                <Stack.Screen name="FAQs" options={{ headerShown: false }}>{props => <FAQs {...props} />}</Stack.Screen>
                <Stack.Screen name="About" options={{ headerShown: false }}>{props => <About {...props} />}</Stack.Screen>
                <Stack.Screen name="Settings" options={{ headerShown: false }}>{props => <Settings {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    )
}

const MainDrawer = () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };
    const updateprogress = (prevprops) => {
        return (
            setProgress(prevstate => prevprops.progress)
        )
    }

    return (
        <LinearGradient style={{ flex: 1 }} colors={[COLORS.darkGreen, COLORS.lightblue1]}>
            {/* "#DF5A7D" */}
            <Drawer.Navigator initialRouteName="Home"
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)
                    return <Drawerscreen {...props} />;
                }}
            >
                <Drawer.Screen name="Home" options={{ headerShown: false }}>
                    {props => <DrawerScreenss {...props} style={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBar: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 5,
        marginTop: -20,
        borderColor: COLORS.white,
        backgroundColor: COLORS.white,
        height: 55,
    },
    stack: {
        flex: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
        // shadowColor: '#FFF',
        // shadowOffset: {
        //   width: 0,
        //   height: 8,
        // },
        // shadowOpacity: 0.44,
        // shadowRadius: 10.32,
        // elevation: 5,

        overflow: 'hidden',
        // borderWidth: 1,
    },
    drawerStyles: {
        flex: 1,
        width: '60%',
        backgroundColor: 'transparent'
    },
    drawerItem: {
        alignItems: 'flex-start',
        marginVertical: 2,
    },
    drawerLabel: {
        color: 'white',
        marginLeft: -16
    },
    avatar: {
        borderRadius: 60,
        marginBottom: 16,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },

});

export default MainNav;


import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';

import profile from '../../assets/images/profile.png';
import menu from '../../assets/icons/menu.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profileimage = () => {

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

    return (
        <SafeAreaView>
            <View style={styles.menuWrapper}>
                {/* <TouchableOpacity 
                style = {{paddingHorizontal: 15, paddingBottom: 15, paddingTop: 3}} 
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                    <Image source = {menu} 
                    style = {{
                        height: 40, 
                        width: 40,
                        borderRadius: 2,
                        resizeMode: 'contain'
                    }}/>
                </TouchableOpacity> */}
                {!userData ?
                    <Image
                        source={profile}
                        style={{
                            width: 65,
                            height: 65,
                            borderRadius: 14,
                        }}
                    />
                    : !userData.data.image ?
                        <Image
                            source={profile}
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 14,
                            }}
                        />
                        : <Image
                            source={{ uri: 'http://157.245.56.243/dives/public/' + userData.data.image }}
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 14,
                            }}
                        />
                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    menuWrapper: {
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})

export default Profileimage;

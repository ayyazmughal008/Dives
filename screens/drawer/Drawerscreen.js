import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { DrawerItem, DrawerContentScrollView, useIsDrawerOpen } from '@react-navigation/drawer';
import { Feather, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';

import { AuthContext } from '../../components/auth/context'
import { COLORS, SIZES } from '../../assets/colors/theme';
import profile1 from '../../assets/images/profile.png';
import { auth } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

AntDesign.loadFont();

const Drawerscreen = props => {
  const { signOt, user } = React.useContext(AuthContext);
  const [username, setusername] = React.useState('Naza Zuhair');
  const [userData, setUserData] = React.useState('');
  const isOpen = useIsDrawerOpen()


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        try {
          setTimeout(() => {
            AsyncStorage.removeItem('signedIn');
          }, 1000)

        } catch {
          console.log("Coudn't access async storage")
        } finally {
          signOt()
        }
      })
      .catch(error => alert(error.message))
  }
  React.useEffect(() => {
    bootstrapAsync()
  }, [])
  const bootstrapAsync = async () => {
    let userTokens;
    try {
      userTokens = await AsyncStorage.getItem('signedIn')
      if (userTokens !== null) {
        var obj = JSON.parse(userTokens);
        setUserData(obj)
      } else {
        console.log('no data found')
      }
    }
    catch {
      console.log('Couldnt get token')
    }
  }
  React.useEffect(() => {
    console.log('=== is drwaer', isOpen)
    bootstrapAsync()
  }, [isOpen])

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius
        }}>
        {/* CLose */}
        <View
          style={{
            paddingTop: 15,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
            <Feather name="x" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 35,
            marginBottom: 22,
          }}
          onPress={() => props.navigation.navigate('ProfileScreen')}>
          {!userData ?
            <Image
              source={profile1}
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
              }}
            />
            : !userData.data.image ?
              <Image
                source={profile1}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                }}
              />
              : <Image
                source={{ uri: 'http://157.245.56.243/dives/public/' + userData.data.image }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                }}
              />
          }
          <View style={{ marginLeft: 5 }}>
            <Text style={{ color: COLORS.white, fontFamily: 'PoppinsBold', fontSize: 16 }}>
              {!userData ? "" : userData.data.name}
            </Text>
            <Text style={{ color: COLORS.white, fontFamily: 'PoppinsRegular', fontSize: 14, flexWrap: 'wrap' }}>
              {!userData ? "" : userData.data.email}
            </Text>
          </View>
        </TouchableOpacity>
        {/*Drawer items */}
        <View style={{ marginTop: 10 }}>
          <DrawerItem
            label="Dashboard"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Dashboard')}
            icon={() => <AntDesign name="home" color="white" size={19} />}
          />
          {/* <DrawerItem
              label="Invite Friends"
              labelStyle={styles.drawerLabel}
              onPress={() => props.navigation.navigate('Profile')}
              icon={() => <MaterialIcons name="group" color="white" size={19} />}
            /> */}
          <DrawerItem
            label="Settings"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('Settings')}
            icon={() => <AntDesign name="setting" color="white" size={19} />}
          />
          <DrawerItem
            label="About"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('About')}
            icon={() => <Feather name="external-link" color="white" size={19} />}
          />
          <DrawerItem
            label="Help Center"
            labelStyle={styles.drawerLabel}
            onPress={() => props.navigation.navigate('FAQs')}
            icon={() => <MaterialIcons name="headset" color="white" size={19} />}
          />
        </View>
      </View>
      {/*Logout */}
      <View
        style={{
          marginBottom: 50,
        }} >
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'white', marginLeft: -16 }}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
          onPress={() => Alert.alert(
            "Log out",
            "Are you sure you want to log out?",
            [
              // The "Yes" button
              {
                text: "Yes",
                onPress: () => {
                  handleSignOut();
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: "No",
              },
            ]
          )}
        // onPress={() => handleSignOut()}
        />
      </View>
    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'white' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: {
    color: 'white',
    marginTop: 2,
    marginLeft: -16,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
})


export default Drawerscreen;

import React from 'react';
import { View, StyleSheet, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import TextButton from '../../components/auth/TextButton';
import FormInput from '../../components/divelogs/FormInput';
import { COLORS, colour, SIZES } from '../../assets/colors/theme';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FAQs = ({ navigation }) => {
  const [q1, setq1] = React.useState(false)
  const [q2, setq2] = React.useState(false)
  const [q3, setq3] = React.useState(false)
  const [q4, setq4] = React.useState(false)
  const [q5, setq5] = React.useState(false)

  const [subject, setsubject] = React.useState('');
  const [request, setrequest] = React.useState('');
  const [isLoading, setLoading] = React.useState(false)
  const [enablesubmit, setenablesubmit] = React.useState(false);
  const [userData, setUserData] = React.useState('');


  const toggleq1 = () => setq1(previousState => !previousState)
  const toggleq2 = () => setq2(previousState => !previousState)
  const toggleq3 = () => setq3(previousState => !previousState)
  const toggleq4 = () => setq4(previousState => !previousState)
  const toggleq5 = () => setq5(previousState => !previousState)


  React.useEffect(() => {
    if (subject != '' || request != '') {
      setenablesubmit(true)
    } else {
      setenablesubmit(false)
    }

  }, [subject, request])

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

  const _handleSubmit = () => {
    setLoading(true)
    fetch(`http://157.245.56.243/dives/public/api/submit-feedback`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userData.data._id,
        subject: subject,
        req: request
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setLoading(false)
        if (json.status == 200) {
          Alert.alert('', json.message)
          setsubject('')
          setrequest('')
        } else {
          Alert.alert('', json.message)
        }

      })
      .catch(error => {
        setLoading(false)
        console.log("response error ===>", error)
      })
  }

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.backIcon,
              { backgroundColor: pressed ? COLORS.lightGray1 : null },
              { borderRadius: pressed ? 20 : null }
            ]}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Entypo name='chevron-left' size={32} color={colour.darkGray} />
          </Pressable>
        </View >
        <View style={{ marginTop: 25, }}>
          <Text style={styles.Header}>Help Center</Text>
        </View>

        {/*FAQs */}
        <View style={{ marginBottom: 10, marginTop: 5, }}>
          <View style={{ flexDirection: 'row', borderBottomColor: COLORS.darkGray1, borderBottomWidth: 0.5, marginTop: 12, }}>
            <MaterialIcon name="question-answer" size={28} color={colour.black} style={{ paddingHorizontal: 10, paddingTop: 4 }} />
            <Text style={styles.subHeader}>Frequently asked Questions (FAQs)</Text>
          </View>
          <View >


            {/* q1 */}
            <Pressable
              style={({ pressed }) => [
                { margin: 2, },
                { backgroundColor: pressed ? COLORS.lightGray2 : q1 === true ? COLORS.lightGray1 : null },
                { borderRadius: 20 }
              ]}
              onPress={() => toggleq1()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                <Text style={{ ...styles.options, width: 310 }}>Why is it a good idea to log every single dive online?</Text>
                {q1 ? <Entypo name='chevron-down' size={22} color={COLORS.darkGray3} /> :
                  <Entypo name='chevron-right' size={22} color={COLORS.darkGray3} />}
              </View>
            </Pressable>
            {q1 &&
              <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                <Text style={{ ...styles.suboptions, color: COLORS.black, textAlign: 'justify' }}>
                  Dive logs are very useful for future reference and can help you keep
                  track of your dives. You can also just use it as a scrapbook for you personal expriences.
                  For proffesional divers, having dive logs online, can be proof of your dive experience.
                </Text>
              </View>
            }

            {/* q2 */}
            <Pressable
              style={({ pressed }) => [
                { margin: 2, },
                { backgroundColor: pressed ? COLORS.lightGray2 : q2 === true ? COLORS.lightGray1 : null },
                { borderRadius: 20 }
              ]}
              onPress={() => toggleq2()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                <Text style={{ ...styles.options, width: 310 }}>Can I download/ export my dive data from the app. </Text>
                {q2 ? <Entypo name='chevron-down' size={22} color={COLORS.darkGray3} /> :
                  <Entypo name='chevron-right' size={22} color={COLORS.darkGray3} />}
              </View>
            </Pressable>
            {q2 &&
              <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                <Text style={{ ...styles.suboptions, color: COLORS.black, textAlign: 'justify' }}>
                  The export feature will be inluded in the next update comin soon! Meanwhile,
                  if you want to download/ export your dive data, you can contact us by sending a message from
                  the Request Assisstant section below.
                </Text>
              </View>
            }


            {/* q3 */}
            <Pressable
              style={({ pressed }) => [
                { margin: 2, },
                { backgroundColor: pressed ? COLORS.lightGray2 : q3 === true ? COLORS.lightGray1 : null },
                { borderRadius: 20 }
              ]}
              onPress={() => toggleq3()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                <Text style={{ ...styles.options, width: 310 }}>What should I do if my app crashes?</Text>
                {q3 ? <Entypo name='chevron-down' size={22} color={COLORS.darkGray3} /> :
                  <Entypo name='chevron-right' size={22} color={COLORS.darkGray3} />}
              </View>
            </Pressable>
            {q3 &&
              <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                <Text style={{ ...styles.suboptions, color: COLORS.black, textAlign: 'justify' }}>
                  You can report the crash or send us a message below.
                </Text>
              </View>
            }


            {/* q4 */}
            <Pressable
              style={({ pressed }) => [
                { margin: 2, },
                { backgroundColor: pressed ? COLORS.lightGray2 : q4 === true ? COLORS.lightGray1 : null },
                { borderRadius: 20 }
              ]}
              onPress={() => toggleq4()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                <Text style={{ ...styles.options, width: 310 }}>How will the app use my data that is collected?</Text>
                {q4 ? <Entypo name='chevron-down' size={22} color={COLORS.darkGray3} /> :
                  <Entypo name='chevron-right' size={22} color={COLORS.darkGray3} />}
              </View>
            </Pressable>
            {q4 &&
              <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                <Text style={{ ...styles.suboptions, color: COLORS.black, textAlign: 'justify' }}>
                  The data collected from this app will be used in Reef and
                  Marine Life tracking and protection efforts.
                </Text>
              </View>
            }


            {/* q5 */}
            <Pressable
              style={({ pressed }) => [
                { margin: 2, },
                { backgroundColor: pressed ? COLORS.lightGray2 : q5 === true ? COLORS.lightGray1 : null },
                { borderRadius: 20 }
              ]}
              onPress={() => toggleq5()}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, }}>
                <Text style={{ ...styles.options, width: 310 }}>Can I choose not to contribute my dive data?</Text>
                {q5 ? <Entypo name='chevron-down' size={22} color={COLORS.darkGray3} /> :
                  <Entypo name='chevron-right' size={22} color={COLORS.darkGray3} />}
              </View>
            </Pressable>
            {q5 &&
              <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                <Text style={{ ...styles.suboptions, color: COLORS.black, textAlign: 'justify' }}>
                  Yes, you can always turn off data collection from the settings page.
                </Text>
              </View>
            }


          </View>
        </View>



        {/*REquest Asssitance */}
        <View style={{ marginBottom: 10, marginTop: 10, }}>
          <View style={{ flexDirection: 'row', borderBottomColor: COLORS.darkGray1, borderBottomWidth: 0.5, marginTop: 12, }}>
            <MaterialIcon name="live-help" size={28} color={colour.black} style={{ paddingHorizontal: 10, paddingTop: 6 }} />
            <Text style={styles.subHeader}>Request Assitance</Text>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ ...styles.diveLogSubHeaders, fontSize: 13 }}>Subject</Text>

            <View style={{ marginBottom: 1, marginTop: -15 }}>
              <FormInput
                styleMain={{ height: 50, }}
                containerStyle={{ paddingBottom: 5 }}
                style={styles.input}
                inputStyle={{ color: COLORS.black, paddingBottom: 5, }}
                multiline={false}
                placeholder={"Subject"}
                editable={true}
                value={subject}
                onChangeText={(value) => { setsubject(value) }}
              />
            </View>

            <Text style={{ ...styles.diveLogSubHeaders, fontSize: 13 }}>Request Message</Text>

            <View style={{ marginBottom: 15, marginTop: -15 }}>
              <FormInput
                styleMain={{ height: 80, }}
                containerStyle={{ paddingBottom: 5 }}
                style={styles.input}
                inputStyle={{ color: COLORS.black, paddingBottom: 5, }}
                multiline={true}
                placeholder={"Message..."}
                editable={true}
                value={request}
                onChangeText={(value) => { setrequest(value) }}
              />
            </View>

            <View>
              <TextButton
                label="Submit"
                disabled={!enablesubmit}
                buttonContainerStyle={{
                  marginBottom: 50,
                  height: 50,
                  alignItems: 'center',
                  borderRadius: SIZES.radius,
                  backgroundColor: (enablesubmit === false) ? COLORS.darkGray1 : COLORS.pink,
                }}
                onPress={() => {
                  _handleSubmit()
                }}
              />
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
        </View>






      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    marginTop: 48,
    marginLeft: 1,
    width: 35,
    height: 37
  },
  Header: {
    marginHorizontal: 10,
    fontFamily: 'LatoBold',
    fontSize: 28,
  },
  subHeader: {
    fontFamily: 'LatoBold',
    fontSize: 18,
    padding: 12,
  },
  options: {
    fontFamily: 'LatoBold',
    fontSize: 16,
    color: COLORS.darkGray2,
    //padding: 12,
  },
  suboptions: {
    fontFamily: 'LatoRegular',
    fontSize: 16,
    color: COLORS.darkGray2,
    //padding: 12,
  },
  icon: {
    color: COLORS.darkGray2
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray2,
    backgroundColor: COLORS.lightGray2,

    padding: 10,
    borderRadius: 3,
    marginVertical: 5,
  },
  diveLogSubHeaders: {
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'LatoBold',
    fontSize: 16,
    color: COLORS.black,
  },

})

export default FAQs;






import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Feather, AntDesign } from 'react-native-vector-icons';

import TextButton from '../../components/auth/TextButton';
import { COLORS, SIZES } from '../../assets/colors/theme';

const TermsnCon = ({navigation}) => {
    return (
        <View style= {styles.container}>
            <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                    <Feather name='arrow-left' size={30} color={COLORS.primary} />
            </TouchableOpacity>
            <View style = {styles.textWrappper}>
            <Text style= {styles.MainHeader}>Terms and Conditions of Use</Text>
            <ScrollView style = {{
                height: 510,
            }}>
            <Text style= {styles.subHEadings}>1. Terms</Text>
            <Text style= {styles.subtext}>By accessing this Website, accessible from Website.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</Text>
            
            <Text style= {styles.subHEadings}>2. Use License</Text>
            <Text style= {styles.subtext}>Permission is granted to temporarily download one copy of the materials on Company Name's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</Text>
            <Text style= {styles.subtext}>modify or copy the materials;
                use the materials for any commercial purpose or for any public display;
                attempt to reverse engineer any software contained on Company Name's Website;
                remove any copyright or other proprietary notations from the materials; or
                transferring the materials to another person or "mirror" the materials on any other server.</Text>

            <Text style= {styles.subtext}>This will let Company Name to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</Text>

            <Text style= {styles.subHEadings}>3. Disclaimer</Text>
            <Text style= {styles.subtext}>All the materials on Company Name's Website are provided “as is”. Company Name makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Company Name does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</Text>
            
            <Text style= {styles.subHEadings}>4. Limitations</Text>
            <Text style= {styles.subtext}>Company Name or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Company Name's Website, even if Company Name or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</Text>
            
            <Text style= {styles.subHEadings}>5. Revisions and Errata</Text>
            <Text style= {styles.subtext}>The materials appearing on Company Name's Website may include technical, typographical, or photographic errors. Company Name will not promise that any of the materials in this Website are accurate, complete, or current. Company Name may change the materials contained on its Website at any time without notice. Company Name does not make any commitment to update the materials.</Text>
            
            <Text style= {styles.subHEadings}>6. Links</Text>
            <Text style= {styles.subtext}>Company Name has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Company Name of the site. The use of any linked website is at the user's own risk.</Text>
            
            <Text style= {styles.subHEadings}>7. Site Terms of Use Modifications</Text>
            <Text style= {styles.subtext}>Company Name may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</Text>
            
            <Text style= {styles.subHEadings}>8. Governing Law</Text>
            <Text style = {styles.subtext}>Any claim related to Company Name's Website shall be governed by the laws of Country without regards to its conflict of law provisions.</Text>
            </ScrollView>
            </View>
            <View>

            <TextButton 
                label = "Agree"
                buttonContainerStyle ={{
                    height: 50, 
                    alignItems: 'center',
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary,
                }}
                onPress={() => navigation.goBack()} 
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
                        color: COLORS.primary,
                        fontFamily: 'PoppinsRegular',
                        fontSize: 14,
                    }}
                    onPress={() => navigation.navigate("TermsandCond")} />

                </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
    },
    MainHeader: {
        fontFamily: 'OpenSansBold',
        fontSize: 18, 
        margin: 10,
        color: COLORS.black,
    },
    subHEadings: {
        fontFamily: 'OpenSansSemiBold',
        fontSize: 14, 

    },
    subtext: {
        fontFamily: 'OpenSansRegular',
        fontSize: 14, 
    },
    backIcon: {
        marginTop:45,
        marginLeft: 5,
    },
    textWrappper: {
        marginTop: 10,
        marginBottom: 20,
    },
})

export default TermsnCon;

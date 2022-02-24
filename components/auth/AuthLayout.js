import React from 'react';
import {View, StyleSheet, Text, ImageBackground, Image} from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, SIZES, colour } from '../../assets/colors/theme';
import logo from '../../assets/images/logo.png' ;


const AuthLayout = ({title, subtitle, titleContainerStyle, children}) => {
    return (
        <View style ={{
            flex: 1, paddingVertical: SIZES.padding,
            backgroundColor: COLORS.white,
        }}>
            <KeyboardAwareScrollView>

                {/*App Icon */}
                <View 
                style = {{
                    marginTop: SIZES.height >800 ? 25: 5,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}>
                    <Image
                        source = {logo}
                        resizeMode= 'contain'
                        style ={{
                            width: SIZES.width * 0.19,
                            height: 100,
                            borderRadius: 15,
                    }} />
                    <Text 
                        style= {{
                            fontFamily: 'PoppinsBold',
                            fontSize: 40,
                            color: COLORS.lightGray,
                            padding: 9,
                            marginTop: 15
                        }} >
                        IVES
                    </Text>
                </View>

                {/* Title & Subtitle */}
                <View
                style = {{
                    marginTop: 5,
                    ...titleContainerStyle,
                    
                }}>
                    <Text 
                    style ={{
                        textAlign: 'center',
                        fontFamily: 'PoppinsBold',
                        fontSize: 22,
                    }} >{title}</Text>
                    <Text 
                    style ={{
                        textAlign: 'center',
                        color: COLORS.darkGray,
                        marginTop: 2,
                        fontFamily: 'PoppinsRegular',
                        fontSize: 16,
                    }} >{subtitle}</Text>
                    

                </View>
                {/* Content/Children */}
                {children}
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthLayout;

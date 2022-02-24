import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';

import { COLORS, SIZES } from '../../assets/colors/theme';


const CustomSwitch = ({value, onChange}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => onChange(!value)}
        >
            <View style= {{
                flexDirection: 'row'
            }}>
                {/* Switch */}
                <View style={value ? styles.switchOnContainer: 
                    styles.switchOffContainer}>
                    <View style = {{
                        ...styles.dot,
                        backgroundColor: value ? COLORS.white
                        : COLORS.gray
                    }}>
                        
                    </View>

                </View>
                {/*Text */}
                <Text style = {{
                    color: value ? COLORS.pink : COLORS.gray, 
                    marginLeft: SIZES.base,
                    fontFamily: 'PoppinsRegular',
                    fontSize: 14,
                }}>Save Me
                </Text>

            </View>
            
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    switchOnContainer: {
        width: 40, 
        height: 20, 
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.darkpink2,
    },
    switchOffContainer: {
        width: 40, 
        height: 20, 
        paddingRight: 2,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 18,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    }
})

export default CustomSwitch;

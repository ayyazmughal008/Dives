import React from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import {  TouchableOpacity } from 'react-native-gesture-handler';

import { COLORS, SIZES } from '../../assets/colors/theme';

const TextIconButton = ({
    containerStyle,
    label,
    labelStyle,
    icon, 
    iconPosition,
    iconStyle,
    onPress
}) => {
    return (
        <TouchableOpacity
            style = {{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
            onPress= {onPress}
        >
            {iconPosition == "LEFT" && 
            <Image 
                source = {icon}
                style= {{
                    ...styles.image,
                    ...iconStyle
                }} />
            }
            <Text
                style = {{
                    fontFamily: "PoppinsBold",
                    fontSize: 14,
                    ...labelStyle
                }}>{label}</Text>

            {iconPosition == "RIGHT" && 
                <Image 
                    source = {icon}
                    style= {{
                        ...styles.image,
                        ...iconStyle
                    }} />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width: 20,
        height: 20,
     //   tintColor: COLORS.blue
        
    }
})

export default TextIconButton;

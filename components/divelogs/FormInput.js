import React from 'react';
import {View, StyleSheet, Text, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../assets/colors/theme';

const AuthformInput = ({
    containerStyle,
    value,
    label,
    multiline,
    placeholder,
    inputStyle, 
    onFocus,
    input,
    editable,
    onPressIn, 
    onPressOut,
    defaultValue,
    onTouchEnd,
    onTouchStart,
    onChangeText,
    styleMain,
    onBlur,
    prependComponent, 
    appendComponent, 
    onChange, 
    secureTextEntry, 
    keyboardType ='default',
    autoCompleteType = 'off',
    autoCapitalize ='none',
    errorMsg = ""
}) => {
    return (
        <View style = {{
            marginHorizontal:1,
            ...containerStyle,
        }}>
            {/*Label and Error msg */}
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style = {{
                    color: COLORS.darkGray,
                    fontFamily: 'LatoRegular',
                    fontSize: 12,
                    paddingLeft: 5,
                }}>{label}</Text>
                <Text style = {{
                    color: COLORS.red,
                    fontFamily: 'LatoRegular',
                    fontSize: 14,
                }}>{errorMsg}</Text>
            </View> 
            {/*Text Input */}   
            <View style ={{
                flexDirection: 'row',
                height: 55, 
               // marginTop: SIZES.base,
                paddingHorizontal: SIZES.padding, 
                borderRadius: SIZES.radius,
                borderWidth: 0.3,
                borderColor: COLORS.lightGray1,
                backgroundColor: COLORS.lightGray2,
                ...styleMain,
                
            }}>
                <TextInput  style = {{
                    flex:1,
                    ...inputStyle
                }}
                onTouchEnd ={onTouchEnd}
                onTouchStart={onTouchStart}
                defaultValue = {defaultValue}
                value = {value}
                Input = {input}
                onFocus= {onFocus}
                placeholder= {placeholder}
                placeholderTextColor= {COLORS.darkGray2}
                secureTextEntry ={secureTextEntry}
                keyboardType= {keyboardType}
                autoCapitalize ={autoCapitalize}
                onPressIn = {onPressIn} 
                onPressOut = {onPressOut}
                autoCompleteType ={autoCompleteType}
                //onChange ={onChange}
                onChangeText ={onChangeText}
                editable = {editable}
                multiline ={multiline}
                //style= {style} 
                //ref={input => { this.textInput = input }}
            />
                {appendComponent}
            </View>        
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthformInput;

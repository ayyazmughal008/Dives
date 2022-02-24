import React from 'react';
import {View, StyleSheet, Text, TextInput } from 'react-native';

import { COLORS, SIZES } from '../../assets/colors/theme'
const AuthformInput = ({
    containerStyle,
    label, 
    placeholder,
    inputStyle, 
    onFocus,
    input,
    editable,
    onPressIn, 
    onPressOut,
    defaultValue,
    onTouchEnd,
    onChangeText,
    inputType,
    value,
    onBlur,
    error,
    prependComponent, 
    appendComponent, 
    onSubmitEditing,
    onChange, 
    secureTextEntry, 
    keyboardType ='default',
    autoCompleteType = 'off',
    autoCapitalize ='none',
    errorMsg = "",
    
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
                    fontFamily: 'PoppinsRegular',
                    fontSize: 14,
                    paddingLeft: 5,
                }}>{label}</Text>
                <Text style = {{
                    color: COLORS.red,
                    fontFamily: 'PoppinsRegular',
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
                backgroundColor: COLORS.lightGray2,
            }}>
                <TextInput  style = {{
                    flex:1,
                    ...inputStyle
                }}
                onSubmitEditing={onSubmitEditing}
                error = {error}
                onTouchEnd ={onTouchEnd}
                defaultValue = {defaultValue}
                Input = {input}
                onFocus= {onFocus}
                placeholder= {placeholder}
                placeholderTextColor= {COLORS.darkGray}
                secureTextEntry ={secureTextEntry}
                keyboardType= {keyboardType}
                autoCapitalize ={autoCapitalize}
                onPressIn = {onPressIn} 
                onPressOut = {onPressOut}
                value = {value}
                autoCompleteType ={autoCompleteType}
                onChange ={onChange}
                onChangeText ={onChangeText}
                editable = {editable} 
                onBlur = {onBlur}
                //ref={input => { this.textInput = input }}
            />
                {appendComponent}
            </View>        
        </View>
    );
}

const styles = StyleSheet.create({})

export default AuthformInput;

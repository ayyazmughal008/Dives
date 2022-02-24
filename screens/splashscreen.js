import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

const Splashscreen = () => {
    return (
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ImageBackground style = {{flex: 1, backgroundColor: "#1F2037", }} source = {require('../assets/images/splashscreen.png')} />
        </View>
    );
}

const styles = StyleSheet.create({})

export default Splashscreen;

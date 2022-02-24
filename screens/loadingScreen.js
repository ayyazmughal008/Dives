import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loadingscreen = () => {
    return (
        <View style = {{flex: 1, backgroundColor: "#1F2037", alignContent: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 140,
        width: 170,
        resizeMode: 'contain',
        position: "absolute",
        left: "26.25%",
        right: "21.03%",
        top: "68.39%",
        bottom: "18.03%",
    }
})

export default Loadingscreen;

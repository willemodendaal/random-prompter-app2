import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function MyStatelessCheckBox({ label, value, onValueChanged }
    : {
        label: string,
        value: boolean,
        onValueChanged: (newVal: boolean) => void
    }) {

    const onButtonPress = () => {
        onValueChanged(!value);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onButtonPress}>
                <Text style={styles.checkBorder}>
                    {!value && <Ionicons name="square-outline" size={30} color="#333" />}
                    {value && <Ionicons name="checkbox-outline" size={30} color="#333" />}
                </Text>
            </Pressable>
            <Text style={styles.label}>{label}</Text>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flexGrow: 0,
    },
    label: {
        flexGrow: 1,
        marginLeft: 8
    },
    checkBorder: {
        width: 30,
        height: 30,
    },
    
});
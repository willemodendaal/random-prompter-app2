import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

export default function MyCheckBox({ label, initialValue, onValueChanged }
    : {
        label: string,
        initialValue: boolean,
        onValueChanged: (newVal: boolean) => void
    }) {

    const [isChecked, setIsChecked] = useState(initialValue);

    const onButtonPress = () => {
        setIsChecked(!isChecked);
        onValueChanged(!isChecked);
    };

    const checkStyle = isChecked ? styles.checked : styles.unchecked;

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onButtonPress}>
                <Text style={checkStyle}>
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
    checked: {
        borderWidth: 2,
        borderColor: '#999',
        borderRadius: 4,
        width: 30,
        height: 30
    },
    unchecked: {
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 4,
        width: 30,
        height: 30
    }
});
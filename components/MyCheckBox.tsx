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

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={onButtonPress}>
                <Text>
                    {isChecked ? 'Checked' : 'Unchecked'}
                </Text>
            </Pressable>
            <Text style={styles.label}>{label}</Text>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 3,
        borderColor: 'red'
    },
    button: {
        flexGrow: 0,
    },
    label: {
        flexGrow: 1,
    }
});
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { convertBpmToDelayMs, convertDelayMsToBpm } from '../domain/BpmToTempoConverter';

const MaxDelaySeconds = 60 * 60; // 60 minutes, seems like a more than reasonable max.
const MaxBpm = 1000;  // Every 30ms. Good enough.

function delayMsToDelaySeconds(delayMs: number) {
    return delayMs / 1000;
}

function isValidDelaySeconds(newDelaySecondsStr: string) {
    if (newDelaySecondsStr.trim() === "") {
        return false;
    }

    const delaySeconds = Number(newDelaySecondsStr);
    if (delaySeconds > 0 && delaySeconds < MaxDelaySeconds) {
        return true;
    }
    else {
        return false;
    };
}

function isValidBpm(newBpmStr: string) {
    if (newBpmStr.trim() === "") {
        return false;
    }

    const bpm = Number(newBpmStr);
    if (bpm > 0 && bpm < MaxBpm) {
        return true;
    }
    else {
        return false;
    };
}

export default function TempoChooser({ onTempoChanged, initialValue }
    : { onTempoChanged: (newVal: number) => void, initialValue: number }) {
    const [bpmStr, setBpmStr] = useState("" + initialValue);
    const [isValid, setIsValid] = useState(true);
    const [delaySecondsStr, setDelaySecondsStr] = useState("" + delayMsToDelaySeconds(convertBpmToDelayMs(initialValue)));

    const onBpmChanged = (newBpmStr: string) => {
        if (!isValidBpm(newBpmStr)) {
            setIsValid(false);
            setBpmStr(newBpmStr);
            return;
        }

        const bpm = Number(newBpmStr);
        setBpmStr(newBpmStr);
        setDelaySecondsStr("" + delayMsToDelaySeconds(convertBpmToDelayMs(bpm)));

        if (isValid) {
            onTempoChanged(bpm);
        }
    };

    const onDelaySecondsChanged = (newDelaySeconds: string) => {
        if (!isValidDelaySeconds(newDelaySeconds)) {
            setIsValid(false);
            setDelaySecondsStr(newDelaySeconds);
            return;
        }

        const delaySeconds = Number(newDelaySeconds);
        const delayMs = delaySeconds * 1000;
        setDelaySecondsStr(newDelaySeconds);

        const newBpm = convertDelayMsToBpm(delayMs);
        setIsValid(true);
        setBpmStr("" + newBpm);

        if (isValid) {
            onTempoChanged(newBpm);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.labelAndConfigOption}>
                <Text style={styles.labelAndConfigOption_label}>BPM:</Text>
                <TextInput
                    onChangeText={onBpmChanged}
                    style={styles.labelAndConfigOption_input}
                    value={bpmStr}></TextInput>
            </View>
            <View style={styles.labelAndConfigOption}>
                <Text style={styles.labelAndConfigOption_label}>Nr seconds between:</Text>
                <TextInput
                    onChangeText={onDelaySecondsChanged}
                    style={styles.labelAndConfigOption_input}
                    value={delaySecondsStr}></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    labelAndConfigOption: {
        display: 'flex',
        flexDirection: 'row',
    },
    labelAndConfigOption_label: {
        flexGrow: 0.5,
        textAlign: 'right'
    },
    labelAndConfigOption_input: {
        flexGrow: 1,
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid'
    },
});


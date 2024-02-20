import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { convertBpmToDelayMs, convertDelayMsToBpm } from '../domain/BpmToTempoConverter';

function delayMsToDelaySeconds(delayMs: number) {
    return delayMs / 1000;
}

export default function TempoChooser({ onTempoChanged, initialValue }
    : { onTempoChanged: (newVal: number) => void, initialValue: number }) {
    const [bpmStr, setBpmStr] = useState("" + initialValue);
    const [delaySecondsStr, setDelaySecondsStr] = useState("" + delayMsToDelaySeconds(convertBpmToDelayMs(initialValue)));

    // Use to prevent infinite loop when BPM and DelayMs update one another.
    const [autoUpdateInProgress, setAutoUpdateInProgress] = useState(false);

    // Bpm changed.
    useEffect(() => {
        if (autoUpdateInProgress) {
            setAutoUpdateInProgress(false);
            return;
        }
        else {
            setAutoUpdateInProgress(true);
        }

        const bpm = Number(bpmStr);
        setDelaySecondsStr("" + delayMsToDelaySeconds(convertBpmToDelayMs(bpm)));
        onTempoChanged(bpm);
    }, [bpmStr]);

    // DelaySeconds changed.
    useEffect(() => {
        if (autoUpdateInProgress) {
            setAutoUpdateInProgress(false);
            return;
        }
        else {
            setAutoUpdateInProgress(true);
        }

        const delaySeconds = Number(delaySecondsStr);
        const delayMs = delaySeconds * 1000;
        setBpmStr("" + convertDelayMsToBpm(delayMs));
    }, [delaySecondsStr]);

    return (
        <View style={styles.container}>
            <View style={styles.labelAndConfigOption}>
                <Text style={styles.labelAndConfigOption_label}>BPM:</Text>
                <TextInput
                    onChangeText={setBpmStr}
                    style={styles.labelAndConfigOption_input}
                    value={bpmStr}></TextInput>
            </View>
            <View style={styles.labelAndConfigOption}>
                <Text style={styles.labelAndConfigOption_label}>Nr seconds between:</Text>
                <TextInput
                    onChangeText={setDelaySecondsStr}
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


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

    const onBpmChanged = (newBpmStr: string) => {
        const bpm = Number(newBpmStr);
        setBpmStr(newBpmStr);
        setDelaySecondsStr("" + delayMsToDelaySeconds(convertBpmToDelayMs(bpm)));
        onTempoChanged(bpm);
    };

    const onDelaySecondsChanged = (newDelaySeconds: string) => {
        const delaySeconds = Number(newDelaySeconds);
        const delayMs = delaySeconds * 1000;
        setDelaySecondsStr(newDelaySeconds);

        const newBpm = convertDelayMsToBpm(delayMs);
        setBpmStr("" + newBpm);
        onTempoChanged(newBpm);
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


import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { convertBpmToDelayMs, convertDelayMsToBpm } from
'../domain/BpmToTempoConverter';
import { KindOfTiming } from '../domain/Tempo';

import MyStatelessCheckBox from "./MyStatelessCheckBox";

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


// -----------------
// -----------------
export default function TempoChooser({ onTempoChanged, initialValue }
    : { onTempoChanged: (newVal: number) => void, initialValue: number }) {
    const [bpmStr, setBpmStr] = useState("" + initialValue);
    const [isValid, setIsValid] = useState(true);
    const [delaySecondsStr, setDelaySecondsStr] = useState("" + delayMsToDelaySeconds(convertBpmToDelayMs(initialValue)));
    const [kindOfTiming, setKindOfTiming] = useState<KindOfTiming>(KindOfTiming.DelaySeconds);

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

    const onChangeMainOption = (newKindOfTiming: KindOfTiming): void => {
        setKindOfTiming(newKindOfTiming);
    }

    // Consts
    const kindOfTimingIsBpm = (kindOfTiming === KindOfTiming.Bpm);
    const kindOfTimingIsDelaySeconds = (kindOfTiming === KindOfTiming.DelaySeconds);

    const checkedBpmRow = (<View style={styles.row}>
        <MyStatelessCheckBox
            label=""
            onValueChanged={() =>
                onChangeMainOption(KindOfTiming.Bpm)}
            value={true}></MyStatelessCheckBox>

        <TextInput
            onChangeText={onBpmChanged}
            style={styles.input}
            value={bpmStr}></TextInput>
        <Text style={styles.label}> times per minute.</Text>

    </View>);

    const unCheckedBpmRow = (<View style={styles.row}>
        <MyStatelessCheckBox
            label=""
            onValueChanged={() =>
                onChangeMainOption(KindOfTiming.Bpm)}
            value={false}></MyStatelessCheckBox>

        <Text style={styles.label}>X times per minute.</Text>
    </View>);

    const checkedDelaySecondsRow = (<View style={styles.row}>
        <MyStatelessCheckBox
            label=""
            onValueChanged={() => onChangeMainOption(KindOfTiming.DelaySeconds)}
            value={true}></MyStatelessCheckBox>

        <Text style={styles.label}>Every </Text>
        <TextInput
            onChangeText={onDelaySecondsChanged}
            style={styles.input}
            value={delaySecondsStr}></TextInput>
        <Text style={styles.label}> seconds.</Text>
    </View>);

    const unCheckedDelaySecondsRow = (<View style={styles.row}>
        <MyStatelessCheckBox
            label=""
            onValueChanged={() => onChangeMainOption(KindOfTiming.DelaySeconds)}
            value={false}></MyStatelessCheckBox>

        <Text style={styles.label}>Every X seconds.</Text>
    </View>);

    return (
        <View style={styles.container}>
            <View>
                <Text>How frequently should random prompt be changed?</Text>
                {kindOfTimingIsDelaySeconds ? checkedDelaySecondsRow : unCheckedDelaySecondsRow}
                {kindOfTimingIsBpm ? checkedBpmRow : unCheckedBpmRow}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 4
    },
    labelAndConfigOption: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        height: 30,
        textAlignVertical: 'center',
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 4
    },
});


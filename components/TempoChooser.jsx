import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TempoChooser({onTempoChanged, initialValue}) {
    const [bpmStr, setBpmStr] = useState("" + initialValue);

    // Bpm changed.
    useEffect(() => {
        const bpm =  Number(bpmStr)
        onTempoChanged(bpm);
    }, [bpmStr]);

    const onChangeText = (newVal) => {
        setBpmStr(newVal);
    }

    return (
        <View style={styles.labelAndConfigOption}>
        <Text style={styles.labelAndConfigOption_label}>BPM:</Text>
        <TextInput 
            onChangeText={onChangeText}
            style={styles.labelAndConfigOption_input} 
            value={bpmStr}></TextInput>
      </View>

    );
}

const styles = StyleSheet.create({
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
  
  
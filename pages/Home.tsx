import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TempoChooser from '../components/TempoChooser';
import { KindOfTiming } from '../domain/Tempo';

// EDIT HERE
const DefaultRand1PromptsString = 'string-5, string-6'; 
const DefaultRand2PromptsString = 'A, B, C, D, E, F, G';
const DefaultBpm = 60;

//---

function getRandomInt(min, max) {
  const randomFloat = Math.random();

  // Scale the random number to the desired range and floor it to get an integer
  const randomInt = Math.floor(randomFloat * (max - min + 1)) + min;

  // Return the random integer
  return randomInt;
}

function getRandomPrompt(rand1, rand2) {
  const r1 = getRandomInt(0, rand1.length - 1);
  const r2 = getRandomInt(0, rand2.length - 1);

  const prompt1 = rand1[r1];
  const prompt2 = rand2[r2];

  return `${prompt1}  ${prompt2}`;
}

function promptStringToArray(promptString) {
  if (promptString === null || promptString === "") {
    return [];
  }

  const asArray = promptString
          .split(",")
          .map((s) => {
            return s.trim();
          });

  return asArray;
}



// ---------------------------------------
// ---------------------------------------
export default function Home() {
  const [started, setStarted] = useState(false);
  const [promptToShow, setPromptToShow] = useState("...");
  // %%% TODO: Add setTempo here, where we store what we get from the tempo component. (must contain type and value)
  // then, lower down, add an Effect that detects change to tempo, which updates bpm accordingly.
  // Then! Make sure that user's choice of tempo isn't lost on Start/Stop.
  //
  const [bpm, setBpm] = useState(DefaultBpm);
  const [rand1PromptsString, setRand1PromptsString] = useState(DefaultRand1PromptsString);
  const [rand2PromptsString, setRand2PromptsString] = useState(DefaultRand2PromptsString);

  // Weird use of 'arr' below. Otherwise React converts my array of strings to a plain string.
  // No idea why.
  const [rand1PromptsArray, setRand1PromptsArray] = useState(promptStringToArray(rand1PromptsString));
  const [rand2PromptsArray, setRand2PromptsArray] = useState(promptStringToArray(rand2PromptsString));

  // Timer
  useEffect(() => {
    if (started) {
      const waitMs = (60 * 1000) / bpm;
      const interval = setInterval(() => {
        setPromptToShow(getRandomPrompt(rand1PromptsArray, rand2PromptsArray));
      }, waitMs);

      return () => clearInterval(interval);
    }
    else {
      return () => {};
    }
  }, [started, bpm, rand1PromptsArray, rand2PromptsArray]);

  //Random prompts arrays.
  useEffect(() => {
    setRand1PromptsArray(promptStringToArray(rand1PromptsString));
    setRand2PromptsArray(promptStringToArray(rand2PromptsString));
  }, [rand1PromptsString, rand2PromptsString]);

  const startStop = () => {
    setStarted(!started);
  };

  const goSlower = () => {
    if (bpm > 5) {
      setBpm(bpm - 5);
    }
  };

  const goFaster = () => {
    setBpm(bpm + 5);
  };

  const notStartedView = (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Random Prompter Tool</Text>
      <Text style={styles.label}>Show these prompts randomly: (separate using commas)</Text>
      
      <View style={styles.checkAndTextbox}>
        <TextInput style={styles.randTextBox} value={rand1PromptsString} onChangeText={setRand1PromptsString} />
      </View>

      <View style={styles.checkAndTextbox}>
        <TextInput style={styles.randTextBox} value={rand2PromptsString} onChangeText={setRand2PromptsString} />
      </View>

      <Text style={styles.label}>Options:</Text>
      <TempoChooser onTempoChanged={setBpm} initialValue={bpm}></TempoChooser>

      <Button onPress={startStop} title="Start!" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );

  const startedView = (
    <View style={styles.container}>
      <Text style={styles.prompt}>{promptToShow}</Text>
      <Text style={styles.miscInfo}>BPM: {bpm}</Text>

      <View style={styles.fasterSlowerContainer}>
        <Button onPress={goSlower} title="- Slower" />
        <Text> | </Text>
        <Button onPress={goFaster} title="+ Faster" />
      </View>

      <Button onPress={startStop} title="STOP" />
      <StatusBar style="auto" />
    </View>
  );

  return started ? startedView : notStartedView;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkAndTextbox: {
    flexDirection: 'row'
  },
  prompt: {
    fontSize: 32
  },
  title: {
    marginBottom: 32,
    color: 'blue',
  },
  label: {
    marginBottom: 16
  },
  randTextBox: {
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  labelAndConfigOption: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelAndConfigOption_label: {
    flexGrow: 0.5
  },
  labelAndConfigOption_input: {
    flexGrow: 1,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  miscInfo: {
    marginBottom: 8
  },
  fasterSlowerContainer: {
    flexDirection: 'row',
    marginBottom: 16
  }
});


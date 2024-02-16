import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// EDIT HERE
const rand1 = ['str-6', 'str-5', 'str-6', 'str-5', 'str-6', 'str-5'];
const rand2 = ['A', 'B', 'C', 'D', 'E'];
const defaultBpm = 60;

//---

function getRandomInt(min, max) {
  const randomFloat = Math.random();

  // Scale the random number to the desired range and floor it to get an integer
  const randomInt = Math.floor(randomFloat * (max - min + 1)) + min;

  // Return the random integer
  return randomInt;
}

function getRandomPrompt() {
  const r1 = getRandomInt(0, rand1.length - 1);
  const r2 = getRandomInt(0, rand2.length - 1);

  const prompt1 = rand1[r1];
  const prompt2 = rand2[r2];

  return `${prompt1}  ${prompt2}`;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [promptToShow, setPromptToShow] = useState("...");
  const [bpm, setBpm] = useState(defaultBpm);

  useEffect(() => {
    if (started) {
      const waitMs = (60 * 1000) / bpm;
      const interval = setInterval(() => {
        setPromptToShow(getRandomPrompt());
      }, waitMs);

      return () => clearInterval(interval);
    }
    else {
      return () => {};
    }
  }, [started, bpm]);

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
    <View style={styles.container}>
      <Text style={styles.title}>My random note prompter</Text>
      <Button onPress={startStop} title="Start..." />
      <StatusBar style="auto" />
    </View>
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
  prompt: {
    fontSize: 32
  },
  title: {
    marginBottom: 32
  },
  miscInfo: {
    marginBottom: 8
  },
  fasterSlowerContainer: {
    flexDirection: 'row',
    marginBottom: 16
  }
});


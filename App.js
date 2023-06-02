import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Speech from 'expo-speech';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  console.clear();
  let completeWordWasSpeeched = useRef(false); // Use useRef instead of a regular variable
  const cons = ['d', 's', 'd', 't', 'n', 'l', 'd'];
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const intervalTime = 4000;
  const [progressBarWidth, setProgressBarWidth] = useState(100);
  let textSpeaked = '';
  const [textGenerated, setTextGenerated] = useState('');
  const speakSpeed = useRef(1); // Use useRef instead of useState
  const speakPitch = useRef(1); // Use useRef instead of useState
  const frame = intervalTime / 50;

  const generateOptions = () => {
    return {
      language: 'es',
      rate: speakSpeed.current, // Access the current value of the useRef variable
      pitch: speakPitch.current, // Access the current value of the useRef variable
    };
  };

  const speak = (thingToSay) => {
    const options = generateOptions();
    console.log(options);
    Speech.speak(thingToSay, options);
  };

  const generateTextToSpeech = () => {
    completeWordWasSpeeched.current = false; // Access the current value of the useRef variable
    let randCons = randIndex(cons);
    let randVowel = randIndex(vowels);
    speak(`la ${cons[randCons]} con la ${vowels[randVowel]}`);

    textSpeaked = `${cons[randCons]}${vowels[randVowel]}`;
    setTextGenerated(textSpeaked);
  };

  const randIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Reduce the width of the progress bar
      let newProgressBarWidth = progressBarWidth - 100 / frame;
      setProgressBarWidth((prevWidth) => {
        const newWidth = prevWidth - 100 / (intervalTime / 50);

        if (newWidth < 0) {
          generateTextToSpeech();
          return 100;
        }
        if (newWidth < 20 && !completeWordWasSpeeched.current) {
          speak(textSpeaked);
          completeWordWasSpeeched.current = true; // Access the current value of the useRef variable
        }

        return newWidth;
      });
    }, frame);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progressBarWidth}%` }]} />
      <Text style={styles.textToSpeech}>{textGenerated}</Text>

      <Text>Velocidad</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={speakSpeed.current} // Access the current value of the useRef variable
        onValueChange={(value) => (speakSpeed.current = value)} // Update the useRef variable
      />
      <Text>Tono</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={speakPitch.current} // Access the current value of the useRef variable
        onValueChange={(value) => (speakPitch.current = value)} // Update the useRef variable
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 70,
    backgroundColor: 'rgb(217, 91, 194)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  textToSpeech: {
    color: 'rgb(217, 91, 194)',
    fontSize: 300,
  },
});

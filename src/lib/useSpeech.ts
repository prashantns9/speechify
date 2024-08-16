import { useEffect, useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";
const speechEngine = createSpeechEngine({
  onBoundary: () => {},
  onEnd: () => {},
  onStateUpdate: () => {},
});
/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");
  useEffect(() => {
    speechEngine.load(sentences[currentSentenceIdx]);
  }, [sentences, currentSentenceIdx]);
  const play = () => {
    speechEngine.play();
    setCurrentSentenceIdx(currentSentenceIdx + 1)
  };
  const pause = () => {};

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };

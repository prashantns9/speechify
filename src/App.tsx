import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useEffect, useState } from "react";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentenceIdx, play, pause } = useSpeech(sentences);

  useEffect(() => {
    const callAPI = async () => {
      console.log("calling api");
      const content = await fetchContent();
      const sentences = parseContentIntoSentences(content);
      console.log(sentences);
      setSentences(sentences || []);
    };
    callAPI();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx}
        />
      </div>
      <div>
        <Controls play={play} pause={pause} />
      </div>
    </div>
  );
}

export default App;

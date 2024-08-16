const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.content;
  } catch (e) {
    console.log(e);
    return "<speak><s>There was an error</s></speak>";
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    return content.match(
        /<s>.*.<\/s>/
    )?.[0].replaceAll('</s>', '').split('<s>').filter(s=>!!s);
};

export { fetchContent, parseContentIntoSentences };

import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function Translator() {

  const[userInput , setUserInput] = useState("");
  const[languages,setLanguages] = useState([]);
  const[sourceLanguage , setSourceLanguage] = useState("");
  const[destinationLanguage , setDestinationLanguage] = useState("");
  const[translatedText , setTranslatedText] = useState("");

  async function fetchData(){
     const response = await fetch("https://text-translator2.p.rapidapi.com/getLanguages",{
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c17f4e1e76mshe616e0cb9ee4907p19bfa6jsn42a5f96ea71c',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      }
     });

    const result = await response.json();
     setLanguages(result.data.languages);
  }

  async function translateData(data){
    let response = await fetch("https://text-translator2.p.rapidapi.com/translate",{
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'c17f4e1e76mshe616e0cb9ee4907p19bfa6jsn42a5f96ea71c',
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
      },
      body: data
    });
    let results = await response.json();
    setTranslatedText(results.data.translatedText);

    
  }
  function translateText(){
    if(userInput === ''){
      alert("input field is required !!")
      return;
    }
   const data = new FormData();
   data.append("source_language", sourceLanguage);
   data.append("target_language", destinationLanguage);
   data.append("text", userInput);
    translateData(data);
    setUserInput("");
    setSourceLanguage("");
    setDestinationLanguage("")

  }

  useEffect(()=>{
    fetchData();
  },[])



  return (
    <>
    <div className="container">
      <h2>Text Translator</h2>
  
      <TextField
        id="outlined-basic"
        label="Type text to Translate..."
        variant="outlined"
        style={{ width: "100%", margin: "1rem 0rem" }}
        value={userInput}
        onChange={(e) => { setUserInput(e.currentTarget.value) }}
        required
      />
  
      <div className="option-container">
        <div className="options">
          <p>Pick the language you’re writing in:</p>
          <select onChange={(e) => { setSourceLanguage(e.currentTarget.value) }}>
            <option value="select language">Choose Language</option>
            {languages.map((item, index) => {
              return <option key={index} value={item.code}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="options">
          <p>Translated to:</p>
          <select onChange={(e) => { setDestinationLanguage(e.currentTarget.value) }}>
            <option value="selected language">Choose Translated Language</option>
            {languages.map((item, index) => {
              return <option key={index} value={item.code}>{item.name}</option>
            })}
          </select>
        </div>
      </div>
  
      <button onClick={(e) => { translateText() }}>click this to Translate</button>
  
      {translatedText.length > 0 ?
        <div className="output-container">
          <p className="head">Your Translation:</p>
          <p className="trans">{translatedText}</p>
        </div> : ""}
    </div>
  </>
  
  );
}

export default Translator;
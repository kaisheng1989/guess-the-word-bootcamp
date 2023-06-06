import words from "./words.json"

export const getRandomWord =() =>{
  // lowercase words for simplicity
  return words[Math.floor(Math.random()*words.length)].toLowerCase();
  
}
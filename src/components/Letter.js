import { useState, useEffect } from "react";

export const Letter = (props) =>{
  const { letter, typingSpeed, index } = props;
  const [showLetter, setShowLetter] = useState("none");
  useEffect(() => {
    const showTime = typingSpeed * index;
    const shower = setTimeout(()=>{
      setShowLetter("inline-block")
    },showTime)
    return () => {
      clearInterval(shower);
    }
  },[typingSpeed, index])

  const renderLetter = ()=>{
    if(letter === `\n`){
      return <br/>
    }
    if(letter === " "){
      return(<span key={index}>&nbsp;</span>)
    }
    return(<span style={{display:showLetter}}>{letter}</span>)
  }

  return(
    renderLetter()
  )
}
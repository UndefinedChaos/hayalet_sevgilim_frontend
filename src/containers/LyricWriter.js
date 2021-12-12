import React, { useState } from "react";
import { Letter } from "../components/Letter";
import { SpeedController } from "../components/SpeedController";
import "./LyricWriter.css";

export const LyricWriter = () =>{
  const [ typeSpeed , setTypeSpeed ] = useState(100);
  const renderSong = () =>{
    const lyrics = `Ceza mı bu
    Çektiğim çile mi
    Yıllardır tuttuğum nöbet bitmeyecek mi?
    Bir küçük kar tanesi gibiyim
    Avucunda eriyen dön bebeğim
    Gözyaşlarını görürsem
    Erir kanatlarım
    Uçamam rüyalarında yanına
    Sonsuzluk senle başladı
    O küçük dünyamda
    Unutma gittiğinde yarım kaldım
    Çöllerdeyim yanıyorum
    Kutuptayım üşüyorum
    Ceza benim çekiyorum ne olur dön
    Uzanıyorum tutamıyorum
    Özlüyorum ağlıyorum
    Yasak mısın anlamıyorum ne olur dön
    Sevmesen de beni özledim sesini
    Git desem de yine gitmesen
    Yıllardır çektiğim bu hasret mi çile mi?
    Haram mısın bana bi' bilsem
    Sevmesen de beni özledim sesini
    Git desem de yine gitmesen
    Yıllardır çektiğim bu hasret mi çile mi?
    Haram mısın bana bi' bilsem
    Bebeğim benim, hayalet sevgilim
    Bebeğim benim, hayalet sevgilim
    Hayalet sevgilim
    Çöllerdeyim yanıyorum
    Kutuptayım üşüyorum
    Ceza benim çekiyorum ne olur dön
    Uzanıyorum tutamıyorum
    Özlüyorum ağlıyorum
    Yasak mısın anlamıyorum ne olur dön
    Sevmesen de beni özledim sesini
    Git desem de yine gitmesen
    Yıllardır çektiğim bu hasret mi çile mi?
    Haram mısın bana bi' bilsem
    Sevmesen de beni özledim sesini
    Git desem de yine gitmesen
    Yıllardır çektiğim bu hasret mi çile mi?
    Haram mısın bana bi' bilsem
    Bebeğim benim hayalet sevgilim
    Bebeğim benim hayalet sevgilim
    Hayalet sevgilim
    Hayalet sevgilim`.replaceAll("    ","").split("");
    return (
      lyrics.map((_letter, index)=>{
        return <Letter key={`${_letter}_${index}`} typeSpeed={typeSpeed} letter={_letter} index={index} />
      })
    )
  }
  const handleSpeedChange = (e)=>{
    setTypeSpeed(parseInt(e.target.value));
  }
  return(
    <div className="lyric-writer">
      <div key={new Date()} className = "lyrics">
        {renderSong()}
      </div>
      <div key="controller" className = "controller">
        <SpeedController key="speedController" changeTypingSpeed={handleSpeedChange} value={typeSpeed} />
      </div>
    </div>
    
  )
}
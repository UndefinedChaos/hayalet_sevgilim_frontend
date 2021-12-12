import React, { useState, useEffect } from "react";
import axios from "axios";
import { LyricWriter } from "./LyricWriter";
import { Loading } from "./Loading";
import { Error } from "./Error";
import "./containers.css";

export const AppController = () =>{

  const [loading, setLoading] = useState(true);
  const [ error, setError ] = useState(false);
  const [ location, setLocation ] = useState(null);
  const [ loadingPhase, setLoadingPhase] = useState(0)
  useEffect(() => {
    if(loadingPhase === 0){
      setTimeout(()=>{
        setLoadingPhase(1);
      },500)
    }
    if ("geolocation" in navigator) {
      if(location === null){
        navigator.geolocation.getCurrentPosition((position=>{
          setLocation({lat: position.coords.latitude.toFixed(4), lng: position.coords.longitude.toFixed(4)});
          setTimeout(()=>{
            setLoadingPhase(2);
          },500)
        }));
      }else{
        //const reqLatLng = `${location[0]},${location[1]}`;
        axios.get('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
        .then(function (response) {
          if(response.status === 200){
            setLoadingPhase(3);
            setTimeout(()=>{
              setLoading(false);
            },1000)
          }
        })
        .catch(function (error) {
          setTimeout(()=>{
            setError(true);
          },500)
        })
      }
    } else {
      setTimeout(()=>{
        setError(true);
      },1000)
    }
  }, [location,loadingPhase])
  
  const renderLyricWriter = () =>{
    return(
      <React.Fragment>
        {loading && <Loading loadingPhase={loadingPhase}/>}
        {error && <Error/>}
        {(!loading && !error) && <LyricWriter/>}
      </React.Fragment>
    )
  }
  return(
    renderLyricWriter()
  )
}
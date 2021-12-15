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
      },700)
    }
    if ("geolocation" in navigator) {
      if(location === null){
        navigator.geolocation.getCurrentPosition((position=>{
          setLocation({lat: parseFloat(position.coords.latitude.toFixed(4)), lng: parseFloat(position.coords.longitude.toFixed(4))});
          setTimeout(()=>{
            setLoadingPhase(2);
          },500)
        }));
      }else{
        let storageChange = false;
        if(loadingPhase === 2){
          const [oldLat, oldLng] = [parseFloat(localStorage.getItem('lat')), parseFloat(localStorage.getItem('lng'))];
          if(isNaN(oldLat) || isNaN(oldLng)){
            storageChange=true
            localStorage.setItem("lat",location.lat);
            localStorage.setItem("lng",location.lng);
          }else{
            if(Math.abs(oldLat-location.lat) > 0.0001){
              storageChange = true;
              localStorage.setItem("lat",location.lat);
              localStorage.setItem("lng",location.lng);
            }else if(Math.abs(oldLng-location.lng) > 0.0001){
              storageChange = true;
              localStorage.setItem("lat",location.lat);
              localStorage.setItem("lng",location.lng);
            }
          }
        }
       if(loadingPhase === 2 && storageChange){
          axios.get(`https://hayalet-sevgilim-backend.herokuapp.com/foundStarbucks?lat=${location.lat}&long=${location.lng}`)
          .then(function (response) {
            console.log("NEW");
            if(response.status === 200){
              localStorage.setItem("locationFound",response.data.LocationFound);
              if(response.data.LocationFound){
                setLoadingPhase(3);
                setTimeout(()=>{
                  setLoading(false);
                },1000)
              }else{
                setTimeout(()=>{
                  setError(true);
                },1000)
              }
              
            }
          })
          .catch(function (error) {
            setTimeout(()=>{
              setError(true);
            },500)
          })
        }else if(loadingPhase===2){
          const oldLocationFound = localStorage.getItem('locationFound');
          console.log("OLD",localStorage);
          if(oldLocationFound === "true"){
            setTimeout(()=>{
              setLoadingPhase(3);
              setTimeout(()=>{
                setLoading(false);
              },1000)
            },1000)
          }else{
            setTimeout(()=>{
              setError(true);
            },1000)
          }
        }
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
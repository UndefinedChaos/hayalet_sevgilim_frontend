
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const Loading = (props) =>{
  const [ phase, setPhase ] = useState(0)
  const { loadingPhase } = props;

  useEffect(() => {
    setPhase(loadingPhase);
  },[phase,loadingPhase])

  const getIcon = (_controlPhase) =>{
    if(phase>_controlPhase){
      return <FontAwesomeIcon icon={faCheckCircle} />
    }
    return <FontAwesomeIcon icon={faCircleNotch} spin />
  }

  return(
    <div className="loading">
      {phase>-1 &&
        <div className="phase">
        {getIcon(0)}
        <span>Şarkı sözleri yükleniyor</span> 
      </div>
      }
      {phase>0 &&
        <div className="phase">
          {getIcon(1)}
          <span>Konum bilgisi kontrol ediliyor</span>
        </div> 
      }
      {phase>1 &&
         <div className="phase">
          {getIcon(2)}
          <span>Starbucks kontrol ediliyor</span>
        </div> 
      }
      {phase>2 &&
        <div className="phase">
        <FontAwesomeIcon icon={faCircleNotch} spin />
        <span>Yükleniyor...</span>
        </div> 
      } 
    </div>
  )
}
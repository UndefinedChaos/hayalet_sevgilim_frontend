import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export const Error = () => {

  return(
    <div className="error">
      <FontAwesomeIcon icon={faTimesCircle} />
      <span>Malesef konumunuzu doğrulayamadık</span> 
    </div>
  )

}
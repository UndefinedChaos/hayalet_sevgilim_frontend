import "./SpeedController.css";

export const SpeedController = (props)=>{

  return(
    <div className="speed-controller">
      <input type="number" 
        className="speed-controller-input"
        name ="SpeedController" 
        onChange={props.changeTypingSpeed} 
        value={props.value}
        step="50"
        min="0" max="1000"/>
      <label className="speed-controller-label" htmlFor="SpeedController">
          Harf Yazma Hızı (ms)
      </label> 
    </div>
  )
}
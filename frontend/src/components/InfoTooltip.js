import success from '../images/success.png';
import error from '../images/error.png';

function InfoTooltip({isVisible, isSuccess, onClose, text}) {

  return(
    <div className={`infoTooltip ${isVisible && "infoTooltip_opened"}`}>
      <div className="infoTooltip__container">
        <button type="button" className="infoTooltip__close" onClick={onClose}></button>
        <img src={isSuccess ? success : error} className="infoTooltip__icon" />
        <h2 className="infoTooltip__text">{text}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
import {  ClimbingBoxLoader } from "react-spinners";
import './Loader.css'

const Loader = ({description}) => {
return (
<div className="Loader">
<div className="Spinner">
      <ClimbingBoxLoader/>
      <p>Just a moment...</p>
    </div>
    </div>
)


}


export default Loader;
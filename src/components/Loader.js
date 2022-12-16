import {  ClimbingBoxLoader } from "react-spinners";
import './Loader.css'

const Loader = () => {
return (
<div className="Loader">
<div className="Spinner">
      <ClimbingBoxLoader/>
      <span>Loading...</span>
    </div>
    </div>
)


}


export default Loader;
import { Box,TextField,Checkbox,FormGroup,FormControlLabel  } from "@material-ui/core"
import React, {useState,useEffect} from "react";


const Navbar = () => {

  const [checked,setChecked] = useState(false);
  const handleChange = ((checked)=>{setChecked(checked)})
  
    return (
      <>
            <div>
  意外なつながり探し
      </div>
      </>

    )
  }
export default Navbar
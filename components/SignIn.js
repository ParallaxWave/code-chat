import React, { useEffect } from 'react'
import { useState} from "react"
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

 const StyledButton = withStyles({
  root: {
    background: 'black',
    borderRadius: 10,
    border: 0,
    color: 'white',
    fontSize:"30px",
    fontFamily:'sans-serif',
    height: 48,
    padding:"20px",
    transform:"translate(150%,600%)"
   // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  
})(Button);
const SignIn = () => {
    

    return (
        <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
     <StyledButton hover='color:"black"' variant="contained" >Sign In With Google</StyledButton>
    </>
    )

}

export default SignIn

import React, { useState } from "react";
import { Button} from "@mui/material";



export default function CheckoutButton({items}) {
    const handleClick = () => {
        
    }
  return (
      <Button variant="contained"
      onClick={handleClick()}
      >CheckOut</Button>
  );
}
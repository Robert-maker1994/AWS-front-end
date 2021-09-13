import React, { useState } from "react";
import "./box.scss";
import { TextField } from "@material-ui/core";

export default function DishName({handleDishName, dishName}) {
  const [state, setstate] = useState();
  const [success, setSuccess] = useState(false);
  
  function createDish() {
    if (dishName !== undefined) {
      setSuccess(true)
      setstate([dishName.DishName]);
  
} else {
      alert("You have to call the dish");
    }
  }


 
  return (
    <div>
      {!success ? (
        <div className="center">
          <TextField
            variant="outlined"
            label="Dish"
          
            onChange={handleDishName("DishName")}
            margin="dense"
          />

          <button onClick={createDish}>Create Dish.</button>
        </div>
      ) : null}
      {state
        ? state.map((x) => {
            return (
              <div key={x}>
                <p>{state}</p>
              </div>
            );
          })
        : undefined}
    </div>
  );
}

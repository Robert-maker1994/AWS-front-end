import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./box.scss";

export default function Ingredient({ handleDishComponents, dishComponents, Dish, valuesArr }) {
  const [components, setComponents] = useState([]);
  const [cost] = useState([]);
  const [gp, setGp] = useState();
 
  
  const addIngredient = () => {
    valuesArr.push(dishComponents);
    cost.push(dishComponents.amount);
    //ValuesArr has to be in an array for the map to work
    setComponents([...valuesArr]);
  };


  const CalculateGP = () => {
    const totalCost = cost.reduce((acc, stringVal) => {
      //Pasing the string to a Floatnumber
      //to fix to work out..toFixed(2)
      let num = parseFloat(stringVal)
      console.log(
        "The number is  => ",
        num.toFixed(2),
        "...The Accumlator is => ",
        acc
      );
      console.log(num)
      return acc + num;
    }, 0);
    let sellingPrice = 25;
    setGp((totalCost / sellingPrice) * 100);
    
    console.log("GP is", gp ,"to make a ");
  };


  return (
    <div className="">
      <div className="center ingredientContainer">
        <div className="valueInput">
          <TextField
            label="Ingredient"
            values={dishComponents}
            onChange={handleDishComponents("ingedient")}
            margin="dense"
          />
        </div>
        <div className="valueInput">
          <TextField
            label="Amount"
            type="number"
            values={dishComponents.amount}
            onChange={handleDishComponents("amount")}
          />
        </div>
      </div>
      {components
        ? components.map((x, index) => {
            return (
              <div className="componentList" key={index}>
                <p>
                  {x.ingedient !== undefined
                    ? `Product: ${x.ingedient} Price £${x.amount}`
                    : null}
                </p>
              </div>
            );
          })
        : undefined}
      <button onClick={addIngredient}> Add ingredient </button>
      <button onClick={() => window.location.reload()}>Refresh Page</button>
      <button onClick={CalculateGP}> Calculate GP</button>
      {!gp ? null : (
        <p>
          Selling the dish for £{gp.toFixed(2)} to make 75% profit.  
          <button onClick={Dish}> Save dish </button>
        </p>
      )}
    </div>
  );
}
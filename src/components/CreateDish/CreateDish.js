import React, { useContext, useState } from "react";
import "./box.scss";
import DishName from "./DishName";
import Ingredient from "./Ingredient";
import UserContext from "../../context/UserContext";
import { API } from "aws-amplify";

const CreateDish = ({ dish }) => {
  const { user } = useContext(UserContext);
  const [dishName, setDishName] = useState();
  const [dishComponents, setDishCompoents] = useState([]);
  const [valuesArr] = useState([]);

  const handleDishComponents = (prop) => (event) => {
    setDishCompoents({ ...dishComponents, [prop]: event.target.value });
  };
  const handleDishName = (prop) => (event) => {
    setDishName({ ...dishName, [prop]: event.target.value });
  };

  console.log(user);

  const Dish = () => {
    const init = {
      body: {
        email: user.email,
        userpoolid: user.pool.userPoolId,
        username: user.username,
        dish: {
            dishName: dishName,
            dishComponents: valuesArr
        }
      },
      headers: {},
    };
    console.log(init)
    // API.post("chefapp08", "/user", init)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => console.log(e));
  };

  return (
    <div>
      <h2 className="center">Create your Dish</h2>
      <div className="dishContainer">
        <DishName dishName={dishName} handleDishName={handleDishName} />
        <Ingredient
          handleDishComponents={handleDishComponents}
          dishComponents={dishComponents}
          valuesArr={valuesArr}
          Dish={Dish}
        />
      </div>
    </div>
  );
};

export default CreateDish;

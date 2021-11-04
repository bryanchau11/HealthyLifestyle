import React from "react";
import { useParams } from "react-router-dom";
import '../App.css';
function RecipeDetail() {
  const args = JSON.parse(document.getElementById('data').text);
  const list = args.list_of_item;
  const { foodName } = useParams();
  const thisFood = list.find((i) => i.food === foodName);

  return (
    <div>
      <h1>{thisFood.food}</h1>
      <img className="fixed_img" src={thisFood.image} alt="food pictures" />{' '}
    </div>
  );
}

export default RecipeDetail;

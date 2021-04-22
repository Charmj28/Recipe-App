import './App.css';
import Axios from "axios";
import { useState } from "react";
import RecipeTile from './RecipeTile';


require('dotenv').config();

function App() {


const [query, setquery] = useState("")
const [recipes, setrecipes] = useState([])
const [healthLabels, sethealthLabels] = useState("vegan")


  var url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&health=${healthLabels}`;

 async function getRecipes() { 
var result = await Axios.get(url);
setrecipes(result.data.hits)
console.log(result.data);
    }

    const onSubmit = (e) =>{
      e.preventDefault();
      getRecipes();
    }

  return (
    <div className = "main">
    <div className="app">
      <h1 onClick={getRecipes}>  Recipes    </h1>
      <form className="app_searchForm" onSubmit={onSubmit}>
        <input
          type="text"
          className="app_input"
          placeholder="enter ingredient"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app_submit" type="submit" value="Search" />
        <select className="app_healthLabels">
          <option onClick={() => sethealthLabels("vegetarian")}>Vegetarian</option>
          <option onClick={() => sethealthLabels("paleo")}>Paleo </option>
          <option onClick={() => sethealthLabels("vegan")}>Vegan </option>
          <option onClick={() => sethealthLabels("dairy-free")}>Dairy-free</option>
          <option onClick={() => sethealthLabels("gluten-free")}> Gluten-free</option>
          <option onClick={() => sethealthLabels("wheat-free")}>Wheat-free</option>
          <option onClick={() => sethealthLabels("pescatarian")}>Pescatarian</option>
          <option onClick={() => sethealthLabels("egg-free")}> Egg-free</option>
          <option onClick={() => sethealthLabels("peanut-free")}>Peanut-free</option>
          <option onClick={() => sethealthLabels("tree-nut-free")}>Tree-nut-free</option>
          <option onClick={() => sethealthLabels("soy-free")}>Soy-free</option>
          <option onClick={() => sethealthLabels("fish-free")}>Fish-free</option>
          <option onClick={() => sethealthLabels("shellfish-free")}>Shellfish-free</option>
        </select>
      </form>
      <div className="app_recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />;
        })}
      </div>
    </div>
    </div>
  );
}

export default App;

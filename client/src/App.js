import logo from './logo.svg';
import './App.css';
import Topbar from './components/Topbar';
import Makerecipe from './components/Makerecipe';
import {useState} from 'react'

function App() {
  const [recipeb,setRecipeb] = useState()
  const [search, setSearch] = useState(null)

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value)
      fetch("/api/recipe/"+e.target.value)
      .then(response => response.json())
      .then(json => setSearch(json))
      console.log(search)

    }
  }
  return (
    <div className="App">
      <Topbar recipeb={recipeb}/>
      <label> Search
        <input placeholder="search for recipe"type="string" id="search" onKeyDown={handleSearch}/>
      </label>
      <h1>{search?.name}</h1>
      <h2>{search ? "Instructions" : ""}</h2>
      {search?.instructions?.map((instruction) => (
        <h3>{instruction}</h3>
      ))}
      <h2>{search ? "Ingredients" : ""}</h2>
      {search?.ingredients?.map((ingredient) => (
        <h3>{ingredient}</h3>
      ))}
      <h2>{search ? "Categories" : ""}</h2>
      {search?.categories?.map((category) => (
        <h3>{category}</h3>
      ))}
      
      <Makerecipe/>
      
    </div>
  );
}

export default App;
//<h2>{search.instructions}</h2>
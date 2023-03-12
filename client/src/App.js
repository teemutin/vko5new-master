import logo from './logo.svg';
import './App.css';
import Topbar from './components/Topbar';
import Makerecipe from './components/Makerecipe';
import {useState} from 'react'


function App() {
  const [recipeb,setRecipeb] = useState()
  const [search, setSearch] = useState()
  const [searchimg, setSearchimg] = useState(null)
  const [image, setImage] = useState(null)


  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value)
      const response1 = await fetch("/api/recipe/"+e.target.value)
      const data = await response1.json()
      console.log(data)
      console.log("**************************handlesearch************************************")
      console.log(data.images._id)
      setSearch(data)
      let data2 = []
      data.images.map( async (image) => {
        let response2 = await fetch("/api/images/"+image._id)
        let data2 = await response2.json()
        console.log("looopissa:  "+image._id)
      })
      //const response2 = await fetch("/api/images/"+data.images._id)
      //const data2 = await response2.json()
      //console.log("kuva ois tässä"+data2)
      //console.log(data2.buffer)
      //const response2 = 
      /*
      .then(response => response.json())
      .then(json => setSearch(json))
      .then(console.log(search))
      */
      //console.log(e.target.value)
      /*
      const response1 = await fetch("/api/recipe/"+e.target.value)
      const data1 = await response1.json()
      */
     /*
      fetch("/api/recipe/"+e.target.value)
      .then(response => response.json())
      .then(json => setSearch(json))
      */
      //.then(console.log(search))
      /*
      .then(fetch("/api/images/"+search._id))
      .then(response => response.json())
      .then(json => setImage(json))
      */
    
      
      //console.log("nimi:"+search?.name)
      //console.log("tässä id: "+search?._id)
      /*
      await fetch("/api/images/"+search._id)
      .then(response => response.json())
      .then(json => setImage(json))
      */

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
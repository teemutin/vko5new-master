import {useEffect, useState} from 'react'

function Makerecipe() {
    const [userData,setUserData] = useState({})
    const [value, setValue] = useState("");
    const [entrylist, setEntry] = useState([]);
    const [entrylist2, setEntry2] = useState([]);
    const [name, setName] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [category, setCategory] = useState([])

    const handleChangeIngr = (e) => {
        setValue([value])
        console.log(value)
    }
    //keeps values updated
    
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    
    //nämä
    const readNWrite = (e) => {
        e.preventDefault()
        const updatedList = [...entrylist];
        updatedList.push(value);
        console.log(updatedList)
        setEntry(updatedList);
    }
    const readNWrite2 = (e) => {
        e.preventDefault()
        const updatedList = [...entrylist2];
        updatedList.push(value);
        console.log(updatedList)
        setEntry2(updatedList);
    }
    const nameChange = (e) => {
        e.preventDefault()
        setName(value)
        console.log(name)
    }

    const handleChanger = (e) => {
        setValue(e.target.value)
    }
    const handleChangen = (e) => {
        setValue(e.target.value)
    }
    //
    const submitIngredient = (e) => {
        e.preventDefault()
        setIngredients([ingredients])
        ingredients.push(value)
        console.log(ingredients)
        console.log("täällä pitäis tapahtua")

    }
    
    const submitRecipe = () => {
        const recipe = {"name":name, "ingredients": entrylist, "instructions": entrylist2, "categories": category}
        console.log(recipe)
        
        fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(recipe),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log("recipe created")
            })
        
       /*
        const thing = ""
        fetch("/hello")
        .then(response => response.json())
        .then(json => thing)
        
        
        console.log(thing)
        console.log("täällä mennään")
        */
    }
    
    //creates post call on submit
    function addCategory(cat) {
        const updatedList = [...category];
        updatedList.push(cat);
        console.log(updatedList)
        setCategory(updatedList);
    }
    const submitData = (e) => {
        console.log("tapahtuuko mitään")
        e.preventDefault()
        console.log(userData)
        /*
        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert("Post created")
            })
            */

    }
  return (
    <div className='Recipe'>

    <h1>Make a new recipe</h1>
        <form onSubmit={nameChange} onChange={handleChangen} className="App">
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <input type="submit" id="submit"/>
        </form> 
        <form onSubmit={readNWrite} onChange={handleChanger}> 
                <span>Add new ingredient:</span>
                <textarea  type="text" id="newEntryId" name="newEntryName" rows="4" cols="40"/>
                <label>
                    <input type="submit" id="submit"/>
                 </label>
           
        </form>
        <form onSubmit={readNWrite2} onChange={handleChanger}> 
                <span>Add instruction step:</span>
                <textarea  type="text" id="newEntryId" name="newEntryName" rows="4" cols="40"/>
                <label>
                    <input type="submit" id="submit"/>
                 </label>
           
        </form>
        <form>
            <label htmlFor="vip"><input id="gluten" name="gluten" type="checkbox" onChange={(e) => addCategory("Gluten-free")} /><span>Gluten-free</span></label>
            <label htmlFor="vip"><input id="ovo" name="ovo" type="checkbox" onChange={(e) => addCategory("Ovo")}/><span>ovo</span></label>
            <label htmlFor="vip"><input id="vegan" name="vegan" type="checkbox" onChange={(e) => addCategory("Vegan")}/><span>Vegan</span></label>
        </form>
        <button onClick={submitRecipe}>Submit recipe</button>
    </div>
  )
}
//            <label htmlFor="vip"><input id="vip" name="vip" type="checkbox" onChange={(e) => setVip(e.currentTarget.checked)} value={vip} checked={vip} /><span>Very important poem</span></label>

/*
        <form onChange={handleChangeIngr}>
            <label> Ingredients:
                <input type="string" id="ingredients"/>
            </label> 
            <button onClick={submitIngredient}>Add ingredient</button>
        </form>
*/
/*
<form onSubmit={submitData} onChange={handleChange} className="App">
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <label> Instructions:
                <input type="array" id="instructions"/>
            </label>
            <label>
                <input type="submit" id="submit"/>
            </label>
            <label> testi
                <textarea type="string" id="submit"/>
            </label>
        </form>
*/


export default Makerecipe
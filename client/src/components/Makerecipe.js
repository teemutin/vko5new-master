import {useEffect, useState} from 'react'

function Makerecipe() {
    const [userData,setUserData] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])

    const handleChangeIngr = (e) => {
        setIngredients({...ingredients, [e.target.id]: e.target.value})
    }
    //keeps values updated
    const handleChange = (e) => {
        setUserData({...userData, [e.target.id]: e.target.value})
    }
    const submitIngredient = (e) => {
        console.log(ingredients)
        console.log("täällä pitäis tapahtua")
    }
    //creates post call on submit
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
    <div >

    <h1>Make a recipe</h1>
        <form onSubmit={submitData} onChange={handleChange}>
            <label> Name:
                <input type="string" id="name"/>
            </label>
            <label> Ingredients:
                <input type="array" id="ingredients"/>
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
        <form onSubmit={submitIngredient} onChange={handleChangeIngr}>
            <label> Ingredients:
                <input type="string" id="ingredients"/>
            </label> 
            <label>
                <input type="submit" id="submit"/>
            </label>
        </form>
    </div>
  )
}

export default Makerecipe
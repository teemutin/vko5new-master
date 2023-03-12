import {useEffect, useState} from 'react'
import axios from 'axios';
import FileUploader from './FileUploader';


function Makerecipe() {
    const [userData,setUserData] = useState({})
    const [value, setValue] = useState("");
    const [entrylist, setEntry] = useState([]);
    const [entrylist2, setEntry2] = useState([]);
    const [name, setName] = useState("")
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [category, setCategory] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [pic, setPic] = useState({})

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
    const submitForm = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", selectedFile);
        /*
        axios
          .post(UPLOAD_URL, formData)
          .then((res) => {
            alert("File Upload success");
          })
          .catch((err) => alert("File Upload Error"));
          */
      };
      
    
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
                alert("recipe created")
                if(file !== null) {
                    console.log("löytyy kuva")
                    console.log(data._id)
                    sendpic(data._id)
                }
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
    
        
        /*
        fetch("/api/images", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(selectedFile),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        */
    
    const saveFile = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
        /*
        }
        else {
        setFile(...file, e.target.files[0]);
        }
        */
        /*
        const updatedList = [...file];
        updatedList.push(e.target.files[0]);
        console.log(updatedList)
        setFile(updatedList);
        setFileName(e.target.files[0].name);
        */
      };
    //const sendpic = async (e) => {
    const sendpic = async (id) => {
        console.log(file)
        //id = {id}
        console.log("onko tyhjä"+id)
        //e.preventDefault()
        const formData = new FormData();
        /*
        file.forEach(fil => {
            console.log(fil)
            formData.append("image", fil);
            formData.append("fileName", fil);
        })*/
        formData.append("image", file);
        formData.append("fileName", fileName);
        formData.append("id", id)
        console.log(formData)
        try {
            const res = await axios.post(
                "/api/images",
                formData,
                { headers: {'Content-Type': 'multipart/form-data'}}
            );
            console.log(res.data)
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }
        
    }
  return (
    <div className='Recipe'>
        <form onSubmit={sendpic}>
            <label> Image
                <input type="file" name="image" onChange= {saveFile}/>
            </label>
            <input type="submit" id="submit" />

        </form>

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
// <FileUploader/>
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
/*
            <label> Image name
            <input
                type="text"
                value={filename}
                onChange={(e) => setfileName(e.target.value)}
                />
            </label>
*/

/*
<FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
*/
export default Makerecipe
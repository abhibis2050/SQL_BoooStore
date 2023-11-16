import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Add = () => {
    const navigate = useNavigate()
    const [bookInput,setBookInput] = useState({
        title:"",
        description:"",
        price:null,
        cover:"",
    })

    const handleChange = (e)=>{
        setBookInput((prev)=>({...prev,[e.target.name]: e.target.value}))
    }

    const handleClick =async (e)=>{
        e.preventDefault()
        try {
           const res = await axios.post(`http://localhost:8800/createBooks`,bookInput);
           console.log(res);
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="form">
      <h1>Add New Book</h1>  
      <input type="text" placeholder="Title" name="title" onChange={handleChange}/>
      <input type="text" placeholder="Description" name="description"  onChange={handleChange}/>
      <input type="number" placeholder="Price" name="price"  onChange={handleChange}/>
      <input type="text" placeholder="Cover" name="cover"  onChange={handleChange}/>

      <button className="formButton" onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add
import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Update = () => {
    const navigate = useNavigate()
    const params = useParams()

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
           const res = await axios.put(`http://localhost:8800/books/${params?.id}`,bookInput);
           console.log(res);
           if(res.status===200){
            navigate("/")
           }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="form">
      <h1>Update The Book</h1>  
      <input type="text" placeholder="Title" name="title" onChange={handleChange}/>
      <input type="text" placeholder="Description" name="description"  onChange={handleChange}/>
      <input type="number" placeholder="Price" name="price"  onChange={handleChange}/>
      <input type="text" placeholder="Cover" name="cover"  onChange={handleChange}/>

      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update


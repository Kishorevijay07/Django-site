import React from "react";
import { useState} from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import { useNavigate } from "react-router-dom";
import './../styles/form.css';
import api from "../api";
import Loadingspinner from "../components/Loadingspinner";
function Form({route, method}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();


    const name = method === "Login" ? "Login" : "Register";

    const handlesunbmit = async (e)=>{
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route,{username, password});
            console.log ("res",res.status)

            if(method === "Login"){

                try {
                    
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                Navigate('/')

                } catch (error) {
                    alert("Invalid Username Or Password")
                }

            }
            else{
                console.log("User registered successfully");
                alert("please login");
                Navigate('/login');
            }
        } catch (error) {
            alert(`${method} unsuccessfully check username and password again`)
            console.error("Error during form submission:", error);
            
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
    <h1>{name}</h1>
    <form onSubmit={handlesunbmit} >
        <input 
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        {loading && <Loadingspinner/>}
        <button type="submit" disabled={loading}>
            {loading ? "Loading..." : name}
        </button>
        {}
    </form>
    </>
  );
}

export default Form;
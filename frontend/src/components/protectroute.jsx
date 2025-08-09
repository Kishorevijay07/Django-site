import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api  from '../api';
import {REFRESH_TOKEN,ACCESS_TOKEN} from './../constant';
import {useEffect, useState} from 'react';

function Protectroute({children}){

    const [isAuthorized, setIsAuthorized] = useState(null);


    useEffect( () => {
        auth().catch(()=>{setIsAuthorized(false)})
    } , [])

    const refreshToken = async()=>{
        const refreshToken = localStorage.getItem('refresh');
        try{
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken   
            })
            if(res.status ===200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false); 
            }
        }
        catch(error){
            console.error("Error refreshing token:", error);
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem('refresh');
            setIsAuthorized(false);
        }

    }

    const auth = async()=>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
        setIsAuthorized(true);
        return;

    }
    const decoded = jwtDecode(token);
    const tokenExpiry = decoded.exp;
    const currenttime = Date.now()/1000;

    if (tokenExpiry < currenttime){
        await refreshAccessToken();        
    }
    else{
        setIsAuthorized(true);
    }
    }
    
    if(isAuthorized === null){
        return <div>Loading.....</div>
    }
    
    return isAuthorized ? children : <Navigate to ="/login"/>
}

export default Protectroute;

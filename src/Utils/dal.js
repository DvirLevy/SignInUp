import axios from 'axios'
import authService from './authService'


axios.interceptors.request.use(req =>{
    
    const token = authService.getToken()
    if(token != null)
        req.headers = {...req.headers , "x-access-token" : token, "Content-type" : "application/json"} 
    
    return req
})


const resetPass = async (obj) =>{
    try{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/resetpassword`,obj)
        
    }
    catch(error){
        return error.response
        
    }
}




const createNewUser = async (obj) =>{
    try{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`,obj)
    }
    catch(error){
        return (error)
    }
}

const verifyUser = async (obj) =>{
    try{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signin`,obj)
        
    }
    catch(error){
        return error.response
    }
}



const changePassword = async (obj) =>{
    try{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/changePassword`,obj)
        
        
    }
    catch(error){
        return error.response
    }
}

const isAuthenticated = async () =>{
    try{
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth`)
    }
    catch(error){
        return error.response
    }
}



// eslint-disable-next-line
export default { createNewUser , verifyUser , resetPass, changePassword , isAuthenticated} 
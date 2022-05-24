import axios from 'axios'


const createNewUser = async (obj) =>{
    console.log("fron createUser\n" + obj)
    try{
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`,obj)
    }
    catch(error){
        console.error(error)
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

const resetPass = async (obj) =>{
    try{
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/resetpassword`,obj)
        
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




// eslint-disable-next-line
export default { createNewUser , verifyUser , resetPass, changePassword } 
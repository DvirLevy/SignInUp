const setToken = (token) =>{
    sessionStorage.setItem("token" , token)
    // sessionStorage["token"] = token
}

const getToken = () =>{
    const token = sessionStorage.getItem("token")
    if(token == null)
        return null
    else
        return token
}

// eslint-disable-next-line
export default { setToken , getToken }
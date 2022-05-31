
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import DAL from '../Utils/DAL'
// import { Navigate  } from 'react-router-dom'




const ProtectedRoutes =  () =>{
    
    const navigate = useNavigate()
    const [au , setAu ] = useState()
    
    useEffect( ()=>{
        const useAuth = async () => {
            try{
                const auth = await DAL.isAuthenticated()
                console.log(auth)
                if(auth.data.result)
                    setAu(true)
                else
                    setAu(false)
            }
            catch(error){
                return error
            }
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useAuth().catch(console.error)
    },[] )

    return(
        <div>
            {
                au ? <Outlet /> : navigate('/')
            }

        </div>
    )
}

export default ProtectedRoutes
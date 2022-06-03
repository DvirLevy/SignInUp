import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DAL from '../Utils/DAL'
import { Alert } from '@mui/material';
import authService from '../Utils/authService';
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'


function Copyright(props) { 
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Dvir Levy FullStack Developer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




export default function SignUp() {

  const [email , setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [allowPromotions, setAlowPromotions] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState()
  const [textErrorFN , setTextErrorFN] = useState()
  const [textErrorLN , setTextErrorLN] = useState()
  const [textErrorEmail , setTextErrorEmail] = useState()
  const [textErrorPwd , setTextErrorPwd] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [textType , setTextType] = useState("password")

  let promotionHandler = ()=>{
    allowPromotions ? setAlowPromotions(false) : setAlowPromotions(true)
  }
  
  const createUser = async (e) =>{
    e.preventDefault()
    const obj = {
      firstName : firstName,
      lastName : lastName,
      email : email,
      password : password,
      allowPromotions : allowPromotions
    }
    const response = await DAL.createNewUser(obj)
    console.log(response.data)
    
    if(response.data.result){
      setAlert(false)
      authService.setToken(response.data.token)
      e.view.location.pathname = '/MainPage'
    }
    else{
      setAlertText(response.data.msg)
      setAlert(true)
    }
  }

  const validEmail = (mail)=>{
    // eslint-disable-next-line no-useless-escape
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(regex.test(mail))
      return false
    else
      return true
  }
  const validTextHandler = async (id) =>{
    // debugger
    switch (id) {
      case "firstName":
        setTextErrorFN(await validText(firstName))
        break;
      case 'lastName':
        setTextErrorLN(await validText(lastName))
        break;

      case "email":
        setTextErrorEmail(await validEmail(email))
        break;
      case "password":
          setTextErrorPwd(await validPwd(password))
          break;

      default:
        break;
    }
  }

  const validText = (text) =>{
    if(text.length > 0)
      return false
    else
      return true
  }

  const validPwd = (pwd) =>{
    const regex = new RegExp(/[a-zA-Z0-9]{6,}/)
    if(regex.test(pwd))
      return false
    else
      return true
  }
  const showPwd = () =>{
    if(showPassword){
      setTextType("password")
      setShowPassword(false)
    }
    else{
      setTextType("text")
      setShowPassword(true)
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  label = "First Name"
                  id="firstName"
                  onChange = {e => setFirstName(e.target.value)}
                  onBlur= {e => validTextHandler(e.target.id)}
                  error = {textErrorFN}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label = "Last Name"
                  id="lastName"
                  autoComplete="family-name"
                  onChange = {e => setLastName(e.target.value)}
                  onBlur= {e => validTextHandler(e.target.id)}
                  error = {textErrorLN}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label = "Email"
                  id="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  onBlur= {e => validTextHandler(e.target.id)}
                  error = {textErrorEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type={textType}
                  fullWidth
                  label = "Password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {e => setPassword(e.target.value)}
                  onBlur= {e => validTextHandler(e.target.id)}
                  error = {textErrorPwd}
                  helperText={"Must contain at least one lower case, upper case and 4 digits"}
                  InputProps ={{
                    endAdornment :
                      <InputAdornment position='end'>
                        <IconButton onClick={showPwd} edge="end">
                          {
                            showPassword ? <VisibilityOff /> : <Visibility />
                          }
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value ={allowPromotions} color="primary"/>}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                  onClick={promotionHandler}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} 
              onClick={createUser}
              disabled = {textErrorFN || textErrorLN || textErrorEmail || textErrorPwd}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          {
          alert ?
          <Alert severity='error'>{`${alertText}`}</Alert> : null
          }
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
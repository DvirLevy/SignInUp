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
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {


  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState()
  
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState()
  const [textErrorPwd , setTextErrorPwd] = useState()
  const [textErrorEmail , setTextErrorEmail] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const [textType , setTextType] = useState("password")
  
  const verifyUser = async (e) =>{
      const obj = {
        email : userName,
        password : password,
      }
      const response = await DAL.verifyUser(obj)
        console.log(response.data.result)
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
    switch (id) {
      case "email":
        setTextErrorEmail(await validEmail(userName))
        break;
      case "password":
        setTextErrorPwd(await validPass(password))
        break;
      default:
        break;
    }
  }
  const validPass = ()=>{
    if(password.length > 3)
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label = "email"
              id="email"
              autoComplete="email"
              onChange={e => setUserName(e.target.value)}
              onBlur = {e => validTextHandler(e.target.id)}
              error = {textErrorEmail}
            />
            <TextField
              type={textType}
              margin="normal"
              fullWidth
              label = "Password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              onBlur = {e => validTextHandler(e.target.id)}
              error = {textErrorPwd}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={verifyUser}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled = {textErrorEmail || textErrorPwd}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/ResetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {
          alert ?
          <Alert severity='error'>{`${alertText}`}</Alert> : null
        }
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
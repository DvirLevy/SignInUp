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

export default function ChangePassword(props) {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState(false)
    const [verifyPassword, setVerifyPassword] = useState(false)
    
    const [showPassword, setShowPassword] = useState(false)
    const [textType , setTextType] = useState("password")
    const [currPwdError , setCurrPwdError] = useState(false)
    const [newPwdError , setNewPwdError] = useState(false)
    const [veriPwdError , setVeriPwdError] = useState(false)
    
  const changePassword = async (e) =>{
    
    const obj = {
        password : currentPassword,
        email : props.data,
        newPassword : newPassword,
    }
    const updated = await DAL.changePassword(obj)
    
    if(updated.data.result)
      e.view.location.pathname = '/'
    else
      e.view.location.pathname = '/resetpassword'
  }

  const passwordMatcher = () =>{
      if(newPassword === verifyPassword)
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

  const validCurrPwd = ()=>{
    if(currentPassword.length < 8)
      return true
    else
      return false
  }

  const validTextHandler = async (id) =>{
    // debugger
    switch (id) {
      case "currentPwd":
        setCurrPwdError(await validCurrPwd(currentPassword))
        break;
        
      case "verifyPassword":
        setVeriPwdError(passwordMatcher)
        // eslint-disable-next-line no-fallthrough
      case "newPassword":
        setNewPwdError(((await validPwd(newPassword) || await passwordMatcher)))
        break;
        


      default:
        break;
    }
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
            Change Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              type ="password"
              margin="normal"
              id="currentPwd"
              fullWidth
              label = "Current Password"
              autoComplete="current-password"
              onChange={e => setCurrentPassword(e.target.value)}
              onBlur = {e => validTextHandler(e.target.id)}
              error = {currPwdError}
            />
            <TextField
              type = {textType}
              margin="normal"
              fullWidth
              label = "New Password"
              id="newPassword"
              onChange={e => setNewPassword(e.target.value)}
              onBlur = {e => {validTextHandler(e.target.id)}}
              error = {newPwdError}
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
             <TextField
              type = "password"
              margin="normal"
              required
              fullWidth
              label = "Verify Password"
              id="verifyPassword"
              onChange={e => setVerifyPassword(e.target.value)}
              onBlur={e => {validTextHandler(e.target.id)}}
              error = {veriPwdError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {changePassword}
              disabled = {currPwdError || newPwdError || veriPwdError}
            >
              Change Password
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
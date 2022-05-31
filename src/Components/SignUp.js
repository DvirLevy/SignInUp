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

  const [email , setEmail] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [password, setPassword] = useState()
  const [allowPromotions, setAlowPromotions] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState()

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
                  required
                  fullWidth
                  label = "First Name"
                  id="firstName"
                  autoFocus
                  onChange = {e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label = "Last Name"
                  id="lastName"
                  autoComplete="family-name"
                  onChange = {e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label = "Email"
                  id="email"
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label = "Password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {e => setPassword(e.target.value)}
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
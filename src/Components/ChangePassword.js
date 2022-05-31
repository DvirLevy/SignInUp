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

    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [verifyPassword, setVerifyPassword] = useState()
    const [textError, setTextError] = useState(false)
    
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
      if(!(newPassword === verifyPassword)){
        setTextError(true)
        return false
      }
      else{
        setTextError(false)
        return true
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
              margin="normal"
              required
              fullWidth
              label = "Current Password"
              autoComplete="current-password"
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label = "New Password"
              id="newPassword"
              onChange={e => setNewPassword(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              label = "Verify Password"
              id="verifyPassword"
              onChange={e => setVerifyPassword(e.target.value)}
              onBlur={passwordMatcher}
              error = {textError}
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
              disabled = {textError}
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
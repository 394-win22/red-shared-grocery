import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { signInWithGoogle, useUserState, signOut } from "../utilities/firebase.js";


const SignInButton = () => (
    <Button color="inherit"
      className="btn btn-secondary btn-sm"
      onClick={() => signInWithGoogle()}
    >
      Sign In
    </Button>
  );

  const SignOutButton = () => (
	<Button color="inherit" className="btn btn-secondary btn-sm"
		onClick={() => signOut()}>
	  Sign Out
	</Button>
  );


export default function ButtonAppBar() {
  const [user] = useUserState();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shared List
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          { user ? <SignOutButton /> : <SignInButton /> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
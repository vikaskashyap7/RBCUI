import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static"  sx={{ backgroundColor: '#0A3981' }}>
      <Toolbar >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RBAC Management
        </Typography>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/roles"  >
          Roles
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

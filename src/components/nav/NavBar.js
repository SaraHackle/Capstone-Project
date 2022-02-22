import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { User } from "../game/User"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListIcon from '@mui/icons-material/List';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const NavBar= () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{color: "#000000" ,fontSize:"xx-large", background:"#f7b9a1", padding:"10px"}}
        id="basic-button"
        className="menuButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <ListIcon fontSize="large" />
        Menu
      </Button>
      <Menu
        
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><User/></MenuItem>
        <MenuItem component={Link} to="/"onClick={handleClose}><HomeIcon/>&nbsp;&nbsp;Home</MenuItem>
        <MenuItem component={Link} to="/newgame"onClick={handleClose}><FiberNewIcon/>&nbsp;&nbsp; New Game</MenuItem>
        <MenuItem component={Link} to="/allgames"onClick={handleClose}><AllInclusiveIcon/>&nbsp;&nbsp;All Games</MenuItem>
        <MenuItem component={Link} to="/previousgames"onClick={handleClose}><ArrowBackIcon/>&nbsp;&nbsp;Previous Games</MenuItem>
        <MenuItem component={Link} to="#"onClick={() => {localStorage.removeItem("betcha_user")}}><LogoutIcon />&nbsp;&nbsp;Logout</MenuItem>
      </Menu>
    </div>

  );
}


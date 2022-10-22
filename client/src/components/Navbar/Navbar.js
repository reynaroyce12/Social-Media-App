import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

// import memoriesLogo from '../../images/memoriesLogo.png';
import logoText from '../../images/logoText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';
import DarkMode from '../darkMode/darkMode';


const Navbar = (props) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();


  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={logoText} alt="icon" height="55px" />
        {/* <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" /> */}
      </Link>

      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <DarkMode />
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button style={{ border: '2px solid #0F3057', borderRadius: 25 }} variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button style={{ borderRadius: 25 }} disabled={!posts.length && isLoading} component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

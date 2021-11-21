import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import { DrizzleContext } from "@drizzle/react-plugin";

export default function Bar() {
  const [account0,setAccount0] = useState();
  const drizzleData = useContext(DrizzleContext.Context);
    const {drizzle,drizzleState} = drizzleData;
    useEffect(()=> {

      const Account0 = drizzleState.accounts[0];
      setAccount0(Account0);

    },[])

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(25),
  },
  title: {
    flexGrow: 1,
  },
}));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h2" className={classes.title} style={{color: "blanchedalmond"}}>
            AQ Pet Shop
          </Typography><br/>
  <Button color="inherit">{account0 ? `Account: ${(account0).substring(0, 7).concat("...",(account0).substring(38,42))}` : "loading..."}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

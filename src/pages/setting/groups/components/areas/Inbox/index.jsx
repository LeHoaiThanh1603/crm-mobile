import React from 'react';
import { makeStyles } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css'
// const useStyles = makeStyles({
//   messagesContainer: {
//     height: 'calc(100% - 64px)',
//     overflowY: 'scroll',
//   },
//   messageContainer: {
//     display: 'flex',
//     alignItems: 'flex-start',
//   },
//   messageAuthor: {
//     fontWeight: 'bold',
//   },
// });

function Inbox() {
    // const classes = useStyles();
  return (
    <div className="chat-messaging">
      <List className="messagesContainer">
        <ListItem className="messageContainer">
          <Typography className="messageAuthor">Alice</Typography>
          <ListItemText primary="Hello!" />
        </ListItem>
        <ListItem className="messageContainer">
          <Typography className="messageAuthor">Bob</Typography>
          <ListItemText primary="Hi Alice, how are you?" />
        </ListItem>
      </List>
      <form className="chat-input">
        <TextField placeholder="Type a message..." />
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}

export default Inbox;

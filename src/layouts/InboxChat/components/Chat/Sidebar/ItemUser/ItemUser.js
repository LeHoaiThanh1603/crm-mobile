import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import './ItemUser.css'



function ItemUser() {
    return (
        <>
            <List sx={{
                width: '100%',
                // maxWidth: 460,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                padding: '0'

            }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/219/219983.png?w=360" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Nick Name"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    <span className='mess'>
                                        <span className='no-read'>Tin nhắn chưa được đọc</span>
                                        {/* <span className='read'>Tin nhắn chưa được đọc</span> */}
                                    </span>
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <div>
                    <div className='mode'>
                        <img src='https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png' />
                    </div>
                    <div className='time'>
                        15 phút
                    </div>
                </div>
            </List>
        </>
    );
}

export default ItemUser;
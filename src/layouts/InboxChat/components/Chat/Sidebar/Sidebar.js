
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import ItemUser from './ItemUser/ItemUser';

import './Sidebar.css';

function Sidebar() {
    return (
        <>
            <div className="wrapper">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Tìm kiếm..."
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                </Paper>
                <div className="body-user">
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                    <ItemUser />
                </div>
                <div className="footer">
                </div>
            </div>
        </>
    );
}

export default Sidebar;
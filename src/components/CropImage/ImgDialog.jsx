import React from 'react'
import { withStyles } from '@mui/styles'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    imgContainer: {
        position: 'relative',
        flex: 1,
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
    },
}

class ImgDialog extends React.Component {
    state = {
        open: false,
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes } = this.props
        return (
            <Dialog
                fullScreen
                open={!!this.props.img}
                onClose={this.props.onClose}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className='d-flex flex-row align-items-center'>
                        <IconButton
                            color="inherit"
                            onClick={this.props.onClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <span className={'p-0 m-0' + { ...classes.flex }}
                        >
                            Cropped image
                        </span>
                    </Toolbar>
                </AppBar>
                <div className={classes.imgContainer}>
                    <img src={this.props.img} alt="Cropped" className={classes.img} />
                </div>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ImgDialog)

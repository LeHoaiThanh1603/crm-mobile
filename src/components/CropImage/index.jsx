import React, { useState, useCallback, useEffect } from 'react'
import { FormattedMessage } from 'umi';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import ImgDialog from './ImgDialog'
import getCroppedImg from './cropImage'
import { styles } from './styles'

const useStyles = makeStyles(styles);

const CropImage = ({ srcImg, onComplete, close, open }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(4 / 4)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const classes = useStyles();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        srcImg,
        croppedAreaPixels,
        rotation
      )
      onComplete(croppedImage);
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])

  useEffect(() => {
    if (!open) {
      setCrop({ x: 0, y: 0 })
      setRotation(0)
      setZoom(1)
      setCroppedAreaPixels(null)
    }
  }, [open])

  return (
    <Dialog
      fullWidth={true}
      maxWidth='sm'
      open={open}
      onClose={close}
      scroll='paper'
    >
      <AppBar position="relative" elevation={2} className='d-flex flex-row justify-content-between align-items-center' style={{ backgroundColor: '#fff' }}>
        <Toolbar className='p-1'>
          <IconButton onClick={close} aria-label="Close">
            <IoMdClose size={30} />
          </IconButton>
        </Toolbar>
        <h3 className='p-0 m-0' style={{ fontWeight: '700' }}>
          <FormattedMessage id='component.cropimage.title' defaultMessage='Crop Image' />
        </h3>
        <Toolbar>
          <IconButton aria-label="Close">
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.cropContainer}>
          <Cropper
            image={srcImg}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              <FormattedMessage id='component.cropimage.zoom' defaultMessage='Zoom' />
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              <FormattedMessage id='component.cropimage.rotate' defaultMessage='Rotate' />
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ root: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
          {/*<div className={ classes.sliderContainer }>*/}
          {/*  <Typography*/}
          {/*    variant="overline"*/}
          {/*    classes={ { root: classes.sliderLabel } }*/}
          {/*  >*/}
          {/*    Tỷ lệ*/}
          {/*  </Typography>*/}
          {/*  <Radio.Group size="large" value={ aspect } onChange={ (e) => setAspect(e.target.value) }>*/}
          {/*    <Radio.Button value={ 4 / 4 }>4/4</Radio.Button>*/}
          {/*    <Radio.Button value={ 3 / 4 }>3/4</Radio.Button>*/}
          {/*    <Radio.Button value={ 4 / 6 }>4/6</Radio.Button>*/}
          {/*  </Radio.Group>*/}
          {/*</div>*/}
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            <FormattedMessage id='component.cropimage.apply' defaultMessage='Apply' />
          </Button>
        </div>
        <ImgDialog img={croppedImage} onClose={onClose} />
      </div>
    </Dialog>

  )
}

export default CropImage

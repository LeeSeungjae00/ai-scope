import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export default function ImgAlert() {
  const [open, setOpen] = React.useState(true);

  return (
      <Collapse className = "img-alert" in={open}>
        <Alert variant="outlined" severity="warning"
        style = {{
            backgroundColor : '#e6ad4485',
            color : 'white',
            fontSize : '1rem'
        }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Please drag or insert <strong>only lesions</strong> suspected of <strong>AGC, EGC</strong> and <strong>BGU</strong>
        </Alert>
      </Collapse>
  );
}
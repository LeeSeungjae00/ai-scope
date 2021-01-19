import React from 'react'
import { Typography} from '@material-ui/core';
import './Header.css'
export default function Hedaer({title}) {
    return (
        <header className="side-header">
            <Typography align="center" variant="overline" display="block">
                {title}
            </Typography>
        </header>
    )
}
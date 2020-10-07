import React from 'react';
import cursor from '../../assets/cursor.svg';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    buttonGroup: {
      width: '100%',
    },
    button: {
      width: '50%',
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '1px',
      paddingTop: '14px',
      paddingBottom: '14px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      border: '1px solid #DFE5EC',
      color: '#4A4A4A',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.623)',
        cursor: `url(${cursor}), pointer`
      }
    },
    buttonActive: {
      border: '1px solid #2196F3',
      color: '#fff',
      backgroundColor: '#2196F3',
      '&:hover': {
        backgroundColor: '#007fe7',
      }
    }
}));
  
function Sort(props) {
    const classes = useStyles();
    const handleSortChange = (text) => {
      props.setSort(text);
    }
    return(
      <ButtonGroup disableElevation className={classes.buttonGroup}>
        <Button 
          className={classnames(classes.button, (props.sort == 'cost') ? classes.buttonActive : '')} 
          onClick={() => handleSortChange('cost')} 
          variant="outlined">Самый дешевый</Button>
        <Button 
          className={classnames(classes.button, (props.sort == 'speed') ? classes.buttonActive : '')} 
          onClick={() => handleSortChange('speed')} 
          variant="outlined">Самый быстрый</Button>
      </ButtonGroup>
    )
}

export default Sort;
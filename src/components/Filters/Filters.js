import React, { useEffect } from 'react';
import cursor from '../../assets/cursor.svg';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    h2: {
      fontSize: '12px',
      lineHeight: '12px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    formControl: {
      paddingTop: '12px',
      width: '100%',
    },
    checkboxLine: {
      paddingLeft: '9px',
      paddingRight: '20px',
      marginLeft: 0,
      marginRight: 0,
      '&:hover': {
        backgroundColor: '#F1FCFF',
        cursor: `url(${cursor}), pointer`
      }
    },
    label: {
      fontSize: '13px',
      lineHeight: '20px'
    },
    checkbox: {
      '&:hover': {
        backgroundColor: '#F1FCFF',
        cursor: `url(${cursor}), pointer`
      },
    },
    icon: {
      borderRadius: 2,
      width: 20,
      height: 20,
      border: '1px solid #9ABBCE',
      backgroundColor: 'transparent',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$checkbox.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
    },
    checkedIcon: {
      backgroundColor: 'transparent',
      border: '1px solid #2196F3',
      backgroundImage: '',
      '&:before': {
        display: 'block',
        width: 20,
        height: 20,
        backgroundImage:
          `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='rgb(33, 150, 243)'/%3E%3C/svg%3E")`,
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: 'transparent',
      },
    },
}));
  
function Filters(props) {
    const classes = useStyles();
    const [filters, setFilter] = React.useState({
      all: false,
      noTransfers: false,
      transfer: false,
      twoTransfers: false,
      threeTransfers: false,
    });
    const handleChange = (target, checked) => {
      if(target == 'all'){
        setFilter({
          all: checked,
          noTransfers: checked,
          transfer: checked,
          twoTransfers: checked,
          threeTransfers: checked,
        });
        props.setFilters({
          noTransfers: checked,
          transfer: checked,
          twoTransfers: checked,
          threeTransfers: checked,
        })
      }else{
        setFilter({ ...filters, [target]: checked });
        props.setFilters({noTransfers, transfer, twoTransfers, threeTransfers, [target]: checked})
      }
    };
    const { all, noTransfers, transfer, twoTransfers, threeTransfers } = filters;
    
    useEffect(() => {
      if(noTransfers && transfer && twoTransfers && threeTransfers && (!all)){
        handleChange('all', true)
      }
    }, [filters])
    return(
      <>
        <Typography component="h2" className={classes.h2} >
        Количество пересадок
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
                <FormControlLabel 
                classes={{
                    root: classes.checkboxLine,
                    label: classes.label
                }}
                control={<Checkbox
                    className={classes.checkbox}
                    checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={all}
                    onChange={event => handleChange(event.target.name, event.target.checked)}
                    name="all" 
                />}
                label="Все"
                />
                <FormControlLabel 
                classes={{
                    root: classes.checkboxLine,
                    label: classes.label
                }}
                control={<Checkbox
                    className={classes.checkbox}
                    checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={noTransfers}
                    onChange={event => handleChange(event.target.name, event.target.checked)}
                    name="noTransfers" 
                />}
                label="Без пересадок"
                />
                <FormControlLabel 
                classes={{
                    root: classes.checkboxLine,
                    label: classes.label
                }}
                control={<Checkbox
                    className={classes.checkbox}
                    checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={transfer}
                    onChange={event => handleChange(event.target.name, event.target.checked)}
                    name="transfer" 
                />}
                label="1 пересадка"
                />
                <FormControlLabel 
                classes={{
                    root: classes.checkboxLine,
                    label: classes.label
                }}
                control={<Checkbox
                    className={classes.checkbox}
                    checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={twoTransfers}
                    onChange={event => handleChange(event.target.name, event.target.checked)}
                    name="twoTransfers" 
                />}
                label="2 пересадки"
                />
                <FormControlLabel 
                classes={{
                    root: classes.checkboxLine,
                    label: classes.label
                }}
                control={<Checkbox
                    className={classes.checkbox}
                    checkedIcon={<span className={classnames(classes.icon, classes.checkedIcon)} />}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={threeTransfers}
                    onChange={event => handleChange(event.target.name, event.target.checked)}
                    name="threeTransfers" 
                />}
                label="3 пересадки"
                />
            </FormGroup>
        </FormControl>
      </>
    )
}

export default Filters;
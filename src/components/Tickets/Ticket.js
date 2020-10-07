import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
        paddingRight: '50px',
        color: '#4A4A4A',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
    },
    ticket: {
        marginTop: '20px',
    },
    ticketPrice: {
        color: '#2196F3',
        fontWeight: '600',
        fontSize: '24px',
        lineHeight: '24px',
        letterSpacing: '1px'
    },
    ticketCurrency: {
        paddingLeft: '10px',
    },
    companyLogo: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
    },
    ticketInfoLine: {
        marginTop: '10px',
        '&:nth-child(2)': {
            marginTop: '20px',
        }
    },
    ticketInfoTitle: {
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '18px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: '#A0B0B9',
    },
    ticketInfoValue: {
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '21px',
        // letterSpacing: '0.5px',
        color: '#4A4A4A',
    },
}));
  
function Ticket({ticket}) {
    const classes = useStyles();
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };
    function format(n) {
        return n.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
    }
    function dateFromString(data, duration) {
        let date = new Date(data)
        let startH = date.getHours();
        let startM = date.getMinutes();

        let fullTime = startH*60 + startM + duration;
        let endH = Math.trunc(fullTime/60);
        if(endH/24 >= 1) endH = endH - 24*Math.trunc(endH/24);
        let endM = fullTime % 60;
        if (endH < 10) endH = '0' + endH;
        if (endM < 10) endM = '0' + endM;
        let endTime= endH+':'+endM;

        if (startH < 10) startH = '0' + startH;
        if (startM < 10) startM = '0' + startM;
        let startTime = startH+':'+startM;

        let time = startTime+' - '+endTime;
        return time
    }
    return(
      <>
        <Paper className={classnames(classes.paper, classes.ticket)}>
            <Grid container>
                <Grid container item xs={12} justify="space-between" alignItems="center">
                    <Grid item >
                        <Typography component="p" className={classes.ticketPrice}>
                            {format(ticket.price)}
                            <Typography component="span" className={classnames(classes.ticketCurrency, classes.ticketPrice)}>
                                P
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img alt="Company Logo" src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} className={classes.companyLogo} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify="space-between" className={classes.ticketInfoLine}>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>{ticket.segments[0].origin} – {ticket.segments[0].destination}</Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>{dateFromString(ticket.segments[0].date, ticket.segments[0].duration)}</Typography> 
                    </Grid>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>В пути</Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>{getTimeFromMins(ticket.segments[0].duration)}</Typography> 
                    </Grid>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>
                            {ticket.segments[0].stops.length} 
                            {ticket.segments[0].stops.length == 0 ? ' пересадок' 
                            : ticket.segments[0].stops.length == 1 ? ' пересадка' 
                            : ' пересадки'}
                        </Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>
                            {(ticket.segments[0].stops.length != 0) 
                            ? ticket.segments[0].stops.join(', ')
                            : <></>}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify="space-between" className={classes.ticketInfoLine}>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>{ticket.segments[1].origin} – {ticket.segments[1].destination}</Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>{dateFromString(ticket.segments[1].date, ticket.segments[1].duration)}</Typography>
                    </Grid>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>В пути</Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>{getTimeFromMins(ticket.segments[1].duration)}</Typography>
                    </Grid>
                    <Grid item >
                        <Typography compoent="p" className={classes.ticketInfoTitle}>
                            {ticket.segments[1].stops.length}
                            {ticket.segments[1].stops.length == 0 ? ' пересадок' 
                            : ticket.segments[1].stops.length == 1 ? ' пересадка' 
                            : ' пересадки'}
                            </Typography>
                        <Typography compoent="p" className={classes.ticketInfoValue}>
                            {(ticket.segments[1].stops.length != 0) 
                            ? ticket.segments[1].stops.join(', ')
                            : <></>}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
      </>
    )
}

export default Ticket;
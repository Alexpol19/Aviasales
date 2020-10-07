import React from 'react';
import { Avatar, Container, createMuiTheme, Grid, makeStyles, Paper, ThemeProvider } from '@material-ui/core';
import Filters from './Filters/Filters';
import Sort from './Sort/Sort';
import Tickets from './Tickets/Tickets';
import logo from '../assets/logo.svg';
import { connect } from 'react-redux';
import { setFilters, setSort } from '../redux/tickets';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Open Sans', 'sans-serif'
      ].join(','),
    },
});
const useStyles = makeStyles((theme) => ({
    App: {
        flexGrow: 1,
        paddingTop: theme.spacing(7),
    },
    paper: {
      paddingTop: '20px',
      paddingBottom: '20px',
      color: '#4A4A4A',
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
    },
    large: {
      height: '89px',
      width: '82px',
      paddingBottom:  theme.spacing(4),
    },
  }));
function Main(props) {
    const classes = useStyles();
    return(
        <ThemeProvider theme={theme}>
            <div className={classes.App}>
                <Container maxWidth="md">
                    <Grid container spacing={3}>
                        <Grid container justify="center">
                            <Avatar alt="Aviasales" src={logo} className={classes.large} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Paper className={classes.paper}>
                                <Filters setFilters={props.setFilters} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Sort sort={props.sort} setSort={props.setSort} />
                            <Tickets />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}

let mapStateToProps = (state) => {
    return{
        sort: state.tickets.sortBy,
    }
}
export default connect(mapStateToProps, {setSort, setFilters})(Main);
import React from 'react';
import { connect, Provider } from 'react-redux';
import './assets/App.sass';
import store from './redux/store';
import { BrowserRouter} from "react-router-dom";
import Main from './components/Main';
import { initializeApp } from './redux/tickets';
import { CircularProgress, Grid } from '@material-ui/core';

class MainApp extends React.Component{
  componentDidMount(){
    this.props.initializeApp()
  }
  render(){
    if(!this.props.initialized){
      return <Grid container justify="center" style={{ paddingTop: 100 }}><CircularProgress /></Grid>
    }
    return(
      <BrowserRouter>
          <Provider store={store}>
            <Main />
          </Provider>
      </BrowserRouter>
    )
  }
}

let mapStateToProps = (state) => {
  return{
    initialized: state.tickets.initialized
  }
}

let AppContainer = connect(mapStateToProps, { initializeApp })(MainApp);

const App = (props) => {
  return (
      // <BrowserRouter basename={process.env.PUBLIC_URL}>
      <BrowserRouter>
          <Provider store={store}>
              <AppContainer />
          </Provider>
      </BrowserRouter>
  )
}

export default App;
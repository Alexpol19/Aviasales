import React from 'react';
import { connect } from 'react-redux';
import { getTickets } from '../../redux/selectors/tickets-selectors';
import Ticket from './Ticket';

function Tickets(props) {
    return(
        <>
            {props.tickets.map((ticket, i) => {
                return <Ticket key={i} ticket={ticket}  />
            })}
        </>
    );
}

let mapStateToProps = (state) => {
    return{
        tickets: getTickets(state)
    }
}
export default connect(mapStateToProps, {})(Tickets);
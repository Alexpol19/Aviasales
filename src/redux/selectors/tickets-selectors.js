import { createSelector } from 'reselect';

const getAllTickets = (state) => {
    return state.tickets.tickets;
}
const getSort = state => {
    return state.tickets.sortBy
}
const getFilters = state => {
    return state.tickets.filters
}

export const getTickets = createSelector( [getAllTickets, getSort, getFilters], (tickets, sort, filters) => {
    let filtered = filterTickets(tickets, filters);
    let sorted = sortTickets(filtered, sort);
    return sorted.slice(0, 5)
})


function filterTickets(tickets, filters){
    let newTickets = tickets;

    const { noTransfers, transfer, twoTransfers, threeTransfers } = filters;

    let filtered1 = [];
    let filtered2 = [];
    let filtered3 = [];
    let filtered4 = [];
    if(noTransfers){
        filtered1 = newTickets.filter(function (t) {
            return (t.segments[0].stops.length + t.segments[1].stops.length == 0);
        });
    }
    if(transfer){
        filtered2 = newTickets.filter(function (t) {
            return (t.segments[0].stops.length + t.segments[1].stops.length == 1);
        });
    }
    if(twoTransfers){
        filtered3 = newTickets.filter(function (t) {
            return (t.segments[0].stops.length + t.segments[1].stops.length == 2);
        });
    }
    if(threeTransfers){
        filtered4 = newTickets.filter(function (t) {
            return (t.segments[0].stops.length + t.segments[1].stops.length == 3);
        });
    }

    if(Object.values(filters).indexOf(true) != -1){
        newTickets = filtered1.concat(filtered2, filtered3, filtered4)
    }
    return newTickets;
}

function sortTickets(tickets, sortParam) {
    let newTickets = tickets;
    if(sortParam == 'cost'){
        newTickets.sort(function(a, b){
            return a.price-b.price
        });
    }
    else{
        newTickets.sort(function(a, b){
            let durationA = a.segments[0].duration + a.segments[1].duration
            let durationB = b.segments[0].duration + b.segments[1].duration
            return durationA-durationB
        });
    }

    return newTickets;
}
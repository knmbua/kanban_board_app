import axios from 'axios';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

const retrieveTickets = async () => {
  try {
    const res = await axios.get('/api/tickets/');

    if (res.status !== 200) {
      throw new Error('invalid API response, check network tab!');
    }

    return res.data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const res = await axios.get(`/api/tickets/${id}`);

    if (res.status !== 200) {
      throw new Error('Could not invalid API response, check network tab!');
    }

    return res.data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular ticket');
  }
}

const createTicket = async (body: TicketData) => {
  try {
    const res = await axios.post('/api/tickets/', body);

    if (res.status !== 200) {
      throw new Error('invalid API response, check network tab!');
    }

    return res.data;

  } catch (err) {
    console.log('Error from Ticket Creation: ', err);
    return Promise.reject('Could not create ticket');
  }
}

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const res = await axios.put(`/api/tickets/${ticketId}`, body);

    if (res.status !== 200) {
      throw new Error('invalid API response, check network tab!');
    }

    return res.data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const res = await axios.delete(`/api/tickets/${ticketId}`)

    if (res.status !== 200) {
      throw new Error('invalid API response, check network tab!');
    }

    return res.data;
  } catch (err) {
    console.error('Error in deleting ticket', err);
    return Promise.reject('Could not delete ticket');
  }
};


export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket};

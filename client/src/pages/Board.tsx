import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { LoginProps } from '../interfaces/LoginProps';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const { user } = useOutletContext<LoginProps>();

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();

      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {
        !user ? (
          <div className='login-notice'>
            <h1>
              Login to create & view tickets
            </h1>
          </div>
        ) : (
          <div className='board'>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane
                    title={status}
                    key={status}
                    tickets={filteredTickets}
                    deleteTicket={deleteIndvTicket}
                  />
                );
              })}
            </div>
          </div>
        )
      }
    </>
  );
};

export default Board;

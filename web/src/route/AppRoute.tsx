import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HomePage } from '../pages/HomePage';
import { WelcomePage } from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { EventsPage } from '../pages/EventsPage';
import { AllEvents } from '../components/PageComponents/Events/AllEvents';
import { AddEvent } from '../components/PageComponents/Events/AddEvent';
import ProfilePage from '../pages/ProfilePage';
import { UserPage } from '../pages/UserPage';
import { EditUser } from '../components/PageComponents/Users/EditUser';
import { EditEvents } from '../components/PageComponents/Events/EditEvents';
import { TicketsPage } from '../pages/TicketsPage';
import { TicketsEdit } from '../components/PageComponents/Tickets/TicketsEdit';
import { TicketAdd } from '../components/PageComponents/Tickets/TicketsAdd';
import { TicketsAll } from '../components/PageComponents/Tickets/TicketsAll';
import { ReservationPage } from '../pages/ReservationPage';
import { ReservationAll } from '../components/PageComponents/Reservations/AllReservations';
import { EditReservations } from '../components/PageComponents/Reservations/EditReservations';
import { AllUsers } from '../components/PageComponents/Users/AllUsers';
import { EditVerify } from '../components/PageComponents/Users/EditVerify';
import { SearchEvent } from '../components/PageComponents/Events/SearchEvent';
import { EventTicketReservations } from '../components/PageComponents/Events/EventTicketReservations';

const AppRoute: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <>
          <Route path='/' element={<Navigate to='/welcome' />} />
          <Route path='/welcome' element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </>
      ) : (
        <>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/events/all'
            element={
              <EventsPage>
                <AllEvents />
              </EventsPage>
            }
          />
          <Route
            path='/event/add'
            element={
              <EventsPage>
                <AddEvent />
              </EventsPage>
            }
          />
          <Route
            path='/event/edit/:id'
            element={
              <EventsPage>
                <EditEvents />
              </EventsPage>
            }
          />
          <Route
            path='/search'
            element={
              <EventsPage>
                <SearchEvent />
              </EventsPage>
            }
          />
          <Route
            path='/event/:eventId/tickets&reservations'
            element={
              <EventsPage>
                <EventTicketReservations />
              </EventsPage>
            }
          />

          <Route
            path='/ticket/all'
            element={
              <TicketsPage>
                <TicketsAll />
              </TicketsPage>
            }
          />
          <Route
            path='/ticket/edit'
            element={
              <TicketsPage>
                <TicketsEdit />
              </TicketsPage>
            }
          />
          <Route
            path='/ticket/add'
            element={
              <TicketsPage>
                <TicketAdd />
              </TicketsPage>
            }
          />
          <Route
            path='/ticket/edit/:id'
            element={
              <TicketsPage>
                <TicketsEdit />
              </TicketsPage>
            }
          />
          <Route
            path='/reservations/all'
            element={
              <ReservationPage>
                <ReservationAll />
              </ReservationPage>
            }
          />
          <Route
            path='/reservations/edit'
            element={
              <ReservationPage>
                <TicketsEdit />
              </ReservationPage>
            }
          />
          <Route
            path='/reservation/edit/:id'
            element={
              <ReservationPage>
                <EditReservations />
              </ReservationPage>
            }
          />
          <Route
            path='/users'
            element={
              <UserPage>
                <AllUsers />
              </UserPage>
            }
          />
          <Route
            path='/admin/:id'
            element={
              <UserPage>
                <EditUser />
              </UserPage>
            }
          />
          <Route
            path='/admin/verify/:id'
            element={
              <UserPage>
                <EditVerify />
              </UserPage>
            }
          />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoute;

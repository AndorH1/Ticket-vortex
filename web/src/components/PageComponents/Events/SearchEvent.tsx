import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getEventSearch } from '../../../api/eventApi';
import { EventCard } from '../../../atoms/EventCard';
import { useAuth } from '../../../context/AuthContext';
import { Event } from '../../../type/eventInterface';

export const SearchEvent: React.FC = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Event[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;
  const searchTerm = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getEventSearch(searchTerm);
        const filteredResults = results.filter((event: Event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  const handleOnClick = (eventId: string) => {
    if (userRole === 'admin') {
      navigate(`/event/edit/${eventId}`);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Search Results for "{searchTerm}"</h1>
      {searchResults.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {searchResults.map((event) => (
            <EventCard
              key={event.eventId}
              event={event}
              onClick={() => handleOnClick(event.eventId)}
              clickable={userRole === 'admin'}
            />
          ))}
        </div>
      ) : (
        <p>No events found for "{searchTerm}".</p>
      )}
    </div>
  );
};

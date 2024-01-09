import React, { useState, useEffect } from 'react';

const Scratchpad = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call to fetch notes
    setTimeout(() => {
      const fetchedNotes = ['Note 1', 'Note 2', 'Note 3'];
      setNotes(fetchedNotes);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scratchpad;


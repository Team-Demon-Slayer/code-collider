'use client';

import { createContext, useState, useMemo } from 'react';

export const CommunityContext = createContext();

export function CommunityProvider({ children }) {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('');
  const [spots, setSpots] = useState(2);
  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [openMentor, setOpenMentor] = useState(false);

  const value = useMemo(
    () => ({
      keyword,
      setKeyword,
      language,
      setLanguage,
      spots,
      setSpots,
      startDate,
      setStartDate,
      openMentor,
      setOpenMentor
    }),
    [keyword, language, spots, startDate, openMentor]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

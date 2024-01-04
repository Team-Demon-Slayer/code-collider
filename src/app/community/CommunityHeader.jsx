'use client';

import { useState, useEffect, useCallback } from 'react';
import useCommunityContext from './useCommunityContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const filteredLanguages = (languages, language) => {
  if (!language) return [];
  return languages.filter(({ name }) =>
    name.toLowerCase().includes(language.toLowerCase())
  );
};

export default function CommunityHeader() {
  const {
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
  } = useCommunityContext();

  const supabase = createClientComponentClient();

  const getAllLanguages = useCallback(async () => {
    const allLanguages = await supabase.from('languages').select();
    return allLanguages;
  }, [supabase]);

  const [languages, setLanguages] = useState([]);
  const [languageSelected, setLanguageSelected] = useState(false);

  useEffect(() => {
    getAllLanguages().then(languages => {
      setLanguages(languages.data);
    });
  }, [getAllLanguages]);

  return (
    <div className="search-header">
      <input
        className="search-input"
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="serch keyword"
      />
      <div>
        <input
          className="search-input"
          type="text"
          value={language}
          onChange={e => {
            setLanguage(e.target.value);
            setLanguageSelected(false);
          }}
          placeholder="language"
        />
        <ul className="languages-selection">
          {!languageSelected &&
            filteredLanguages(languages, language).map(({ name }) => (
              <li onClick={() => {
                setLanguage(name);
                setLanguageSelected(true);
              }} key={name}>{name}</li>
            ))}
        </ul>
      </div>
      <input
        className="search-input"
        type="number"
        value={spots}
        onChange={e => setSpots(e.target.value)}
      />
      <input
        className="search-input"
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={openMentor}
          onChange={e => setOpenMentor(e.target.checked)}
        />
        openMentor
      </label>
    </div>
  );
}

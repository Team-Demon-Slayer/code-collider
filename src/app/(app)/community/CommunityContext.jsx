"use client";

import { createContext, useState, useMemo, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import supabase from "../api/_db/index.js";

export const CommunityContext = createContext();

export function CommunityProvider({ children }) {
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("");
  const [spots, setSpots] = useState("");
  const [startDate, setStartDate] = useState("");
  const [openMentor, setOpenMentor] = useState(true);
  const [user, setUser] = useState(null);
  const [languageSelected, setLanguageSelected] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, []);

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
      setOpenMentor,
      user,
      languageSelected,
      setLanguageSelected,
      debouncedKeyword,
      selectedLanguage,
      setSelectedLanguage,
    }),
    [
      keyword,
      language,
      spots,
      startDate,
      openMentor,
      user,
      languageSelected,
      debouncedKeyword,
      selectedLanguage,
      setSelectedLanguage,
    ]
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

'use client';
import useCommunityContext from "./useCommunityContext";

export default function CommunityHeader() {
  const { keyword, setKeyword, language, setLanguage, spots, setSpots, startDate, setStartDate, openMentor, setOpenMentor } = useCommunityContext();
  return (
    <div className="search-header">
      <input className="search-input" type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="serch keyword" />
      <input className="search-input" type="text" value={language} onChange={e => setLanguage(e.target.value)} placeholder="language"/>
      <input className="search-input" type="number" value={spots} onChange={e => setSpots(e.target.value)} />
      <input className="search-input" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      <label>
      <input type="checkbox" checked={openMentor} onChange={e => setOpenMentor(e.target.checked)} />
      openMentor
      </label>
    </div>
  )
}

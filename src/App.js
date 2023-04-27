import './App.css';
import Quran from './quran-files/Quran';
import Sound from './quran-files/Sound';
import React, {useState, useEffect} from 'react';

function App() {
  const [selectedSurah, setSelectedSurah] = useState({})

  return (

    <div>
      <h2>Quran App</h2>
      <Quran selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}/>
      <Sound selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}/>
      
      
    </div>
  );
}

export default App;

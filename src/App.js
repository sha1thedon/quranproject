import './App.css';
import Quran from './quran-files/Quran';
import Sound from './quran-files/Sound';
import Translation from './quran-files/Translation';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom'
import RouteButton from './components/RouteButton';
import Homepage from './views/Homepage';


function App() {
  const [selectedSurah, setSelectedSurah] = useState({})

  return (

  
  <BrowserRouter>
    <div>
    
     <Routes>
      <Route path = "/" element={<Homepage selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}/>}/>
      <Route path = "/translation" element={<Translation/>}/>
     </Routes>
     
      
      
      
      
      
    </div>
    </BrowserRouter>
   
  );
}

export default App;
// selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}

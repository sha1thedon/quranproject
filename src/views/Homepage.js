import React from "react";
import Quran from "../quran-files/Quran";
import Sound from "../quran-files/Sound";

const Homepage = ({selectedSurah, setSelectedSurah}) => {
    return (
        <div>
            <Quran selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}/>
      <Sound selectedSurah={selectedSurah} setSelectedSurah={setSelectedSurah}/>
        </div>



    )
}

export default Homepage

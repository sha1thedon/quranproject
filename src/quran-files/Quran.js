import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Quran = ({selectedSurah, setSelectedSurah}) => {
  const [surahs, setSurahs] = useState([])
  const[ayahs, setAyahs] = useState([])
  const[audioUrl, setAudioUrl] = useState(null)
  // console.log('ayahs array is ', ayahs)
  // console.log('surahs is ', surahs)

  const [selectedAyahs, setSelectedAyahs] = useState([]);
  const [audioSrc, setAudioSrc] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleSurahChange = (event) => {
    console.log('event.target.value is ', event.target.value)
    setSelectedSurah(JSON.parse(event.target.value))
    // setSelectedSurah(event.target.value)
    setSelectedAyahs([])
  }

  const handleAyahChange = (event) => {
    const selectedAyah = event.target.value;
    if (selectedAyahs.includes(selectedAyah)) {
      const filteredAyahs = selectedAyahs.filter((ayah) => ayah !== selectedAyah);
      setSelectedAyahs(filteredAyahs);
    } else {
      setSelectedAyahs([...selectedAyahs, selectedAyah]);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
          setIsRecording(false);
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioSrc(audioUrl);
        });
      });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
  };

  const handlePlayAudio = () => {
    setIsPlaying(true);
    setIsPaused(false);
    this.audioRef.current.play();
  };

  const handlePauseAudio = () => {
    setIsPlaying(false);
    setIsPaused(true);
    this.audioRef.current.pause();
  };

  useEffect(() => {
    const fetchSurahs = async () => {
      const response = await axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani');
      // console.log('response is ', response)
      // console.log('response.data is ', response.data)
      // console.log('response.data.data is ', response.data.data.surahs)
     
      let result =[]

      for(var i in response.data.data.surahs){
        result.push([i, response.data.data.surahs[i]])
      }
      setSurahs(result);
      // console.log('result is', result)
      setAyahs(result[1].ayahs)
      // console.log('ayahs array is ', ayahs)
    };
    fetchSurahs();
   
    
  }, [ayahs]);

  

  // fetch('http://api.alquran.cloud/v1/quran/ar.alafasy')
  //   .then(response => response.json())
  //   .then(json => {
  //       setAudioUrl(json.data.audio_url)
  //   })
  //   .catch(error => console.error(error))
 

  return(
    <div>
        
      <label htmlFor="surah-select">Select a surah:</label>
      <select id="surah-select" value={selectedSurah.englishName} onChange={handleSurahChange}>
        <option value="">--{selectedSurah.englishName}--</option>
        {surahs.map((surah) => {
          // console.log('surah is ', surah[1].ayahs[0].text)
          // console.log('surah ayahs is ', surah[1].ayahs)
          // console.log('surahs.ayahs is', surahs[1][1].ayahs[285].text)
          // console.log('surahs[] is', surahs)
          // console.log('surah[1]', surah[1])
          console.log(selectedSurah, 'selectedSurah')
          
          return <option key={surah[1].number} value={JSON.stringify(surah[1])}>{surah[1].englishName}</option>
        })}
        
      </select>

      {selectedSurah && ( 
        <div>
            <h2>{`Surah ${selectedSurah.englishName}`}</h2>
            <label htmlFor="ayah-select">Select ayah(s) to memorize:</label>
            <select id="ayah-select" multiple value={selectedAyahs} onChange={handleAyahChange}>
            { selectedSurah.ayahs?.map((ayah) => {
              // console.log('ayahs is ', surahs[1].ayahs)
              //   console.log('ayah is ', ayah)
              //   console.log('ayah[1]', ayah.value)
              //   console.log('ayah text is',ayah.text)
                return <option key={ayah.number} value={`${ayah.number}`}>{`${ayah.number} ${ayah.text}`}</option>
})}


            </select>
        </div>

      )}
       {audioUrl && (
            <audio src={audioUrl} controls autoPlay />
          )}

    </div>

 )
        }
export default Quran;

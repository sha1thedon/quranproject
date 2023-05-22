import React, {useState, useEffect, useRef} from 'react'

const Sound = ({surahNumber, selectedSurah, setSelectedSurah}) => {
    const [selectedVerse, setSelectedVerse] = useState(null)
    const[audioUrl, setAudioUrl] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef();

    const handleVerseSelect = (verse) => {
        setSelectedVerse(verse)
    }
  

    useEffect(() => {
      const handleAudioEnded = () => {
        if (currentIndex + 1 < audioUrl[selectedSurah.number-1][1].ayahs.length) {
          console.log('incrementing currentIndex', currentIndex)
          
          setCurrentIndex(currentIndex + 1);
        }
      }

      // const handleTogglePlay = () => {
      //   if (isPlaying) {
      //     audioRef.current.pause();
      //   } else {
      //     audioRef.current.play();
      //   }
      //   setIsPlaying(!isPlaying);
      // }
      
      
      if (isPlaying){
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleAudioEnded);
        }
      const audio = new Audio(audioUrl[selectedSurah.number-1][1].ayahs[currentIndex].audio);
      audioRef.current = audio
      audio.play();
  

      audio.addEventListener('ended', handleAudioEnded)
       
     
    
  
      return () => {
        if (audioRef.current) {
          console.log('ayah finished')
        // setIsPlaying(false)
        
        // setCurrentIndex(0)

          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleAudioEnded);
        }
      }}
     

     

    }, [audioUrl, selectedSurah, currentIndex, isPlaying]);

    const handleTogglePlay = () => {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }

  
   
    const fetchAudioFile = async () => {
      const response = await fetch(`http://api.alquran.cloud/v1/quran/ar.alafasy`)

      const data = await response.json();
      console.log('data is ', data)
      setAudioUrl(data.data.surahs);
      

      let result =[]

      for (var i in data.data.surahs){
        result.push([i, data.data.surahs[i]])
      }
      setAudioUrl(result)
      console.log('audioUrl', audioUrl)

    }
 

    const handlePlay =  () => {
      // const audioPlayer = document.getElementById("audio-player");
      // console.log('audioPlayer is ',audioPlayer)
      // audioUrl.map((ayah) => {
      // //  ayah[1].ayahs.audio.play()
      //  console.log('ayah[1].ayahs.audio', ayah[1].ayahs.audio)
      //  console.log('ayah[1].ayahs', ayah[1].ayahs)
      //  ayah[1].ayahs.map((verse) => {
      //   console.log('verse.audio', verse.audio)
       
       
        
      //  })
       
      // })
      // console.log('audioUrl[0][1].ayahs[0]', audioUrl[0][1].ayahs[0])
      // await new Audio (audioUrl[selectedSurah.number-1][1].ayahs[1].audio).play()
      // console.log(audioUrl[0], 'audioUrl[0]')

     

      setIsPlaying(true)


  

    }

    const handlePause = () => {
      setIsPlaying(false)
      
    };
  
    const handleStop = () => {
      const audioPlayer = document.getElementById("audio-player");
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    };



    // fetch('http://api.alquran.cloud/v1/quran/ar.alafasy')
    // .then(response => response.json())
    // .then(json => {
    //     setAudioUrl(json.data.audio_url)
    // })
    // .catch(error => console.error(error))

    return (
      <div>
        <button onClick={fetchAudioFile}>Load Audio</button>
        <audio id="audio-player" src={audioUrl} />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        
        <button onClick={handleStop}>Stop</button>
        
      </div>
    );

}

export default Sound

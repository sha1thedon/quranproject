import React, {useState, useEffect} from "react";

const Translation = () => {
    const [englishQuranData, setEnglishQuranData] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try{
            const response = await fetch('http://api.alquran.cloud/v1/quran/en.asad')
            const data = await response.json()
            setEnglishQuranData(data)
        } catch (error) {
            console.error('Error fetching English Quran data:' , error)
        }
    }

    return (
       <div>
        <h1>English Quran</h1>
        {englishQuranData ? (
            <div>
                
            </div>
        ) : (
            <p>Loading</p>
        )}
       </div>
    )

}

export default Translation

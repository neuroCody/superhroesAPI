import React, { useState, useEffect } from 'react'


export default function HeroList () {
    //Hook to contorl error response
    const [error, setError] = useState(null)
    //Hook to check loading state
    const [isLoaded, setIsLoaded] = useState(false)
    //Hook to render hero data
    const [heros, setHeros] = useState([])

    useEffect(() => {
        fetch("https://akabab.github.io/superhero-api/api/all.json")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setHeros(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else{
        return(
            <ul>
                {heros.map(hero => (
                <li key={hero.id}>
                    {hero.biography.aliases}
                </li>
                ))}
            </ul>
        )
    }
}
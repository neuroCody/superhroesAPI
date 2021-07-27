import React, { useState, useEffect } from 'react'



export default function HeroList (props) {
    //Hook to contorl search terms
    const [searchTerm, setSearchTerm] = useState('')
    //Hook to contorl error response
    const [error, setError] = useState(null)
    //Hook to check loading state
    const [isLoaded, setIsLoaded] = useState(false)
    //Hook to render hero data
    const [heroes, setheroes] = useState([])

    //Fetch request and promises when connecting to API
    useEffect(() => {
        fetch("https://akabab.github.io/superhero-api/api/all.json")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setheroes(result)
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
            <div className="bg">
                <div style={{display: 'flex', alignItems: "center", justifyContent: "Center", backgroundImage: 'url(comic-background.jpg)'}} >
                    <h1 style={{fontSize:50}}> Heroes List </h1>
                </div>
                <div style={{paddingBottom: 25, display: 'flex', alignItems: "center", justifyContent: "Center"}} >
                    {/* Search input and conntrols */}
                    <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}></input> 
                </div>
                <div style={{display: 'flex', alignItems: "center", justifyContent: "Center",}} >
                    <h2 > Search for your favorite heros </h2>
                </div>
                <div className='row' style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                
                {heroes.filter((val) => {
                    if (searchTerm === ""){
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val
                    }
                }).map(hero => (
                    <div key={hero.id}>
                        <div style={{ padding: 10, margin: 10  }}>
                            <img src={hero.images.md} style={{borderRadius: 0}} className="heroImage" />
                            <div style={{backgroundColor: "rgba(0, 18, 25, 0.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{ fontSize:25, color: "#FFE5CC"}}>{hero.name}</p>
                            </div>
                        </div>
                        
                    </div>    
                ))}
                <div>
                </div>
                </div>

                   
                
            </div>
            
        )
    }
}


import React, { useState, useEffect } from 'react'

import { Card, CardBody, CardText, CardTitle, CardImg, Collapse, Button } from "reactstrap"


export default function HeroList () {
    //Hook to contorl error response
    const [error, setError] = useState(null)
    //Hook to check loading state
    const [isLoaded, setIsLoaded] = useState(false)
    //Hook to render hero data
    const [heroes, setheroes] = useState([])
    //Hook for collapsing data
    const [isOpen, setIsOpen] = useState(false);
    //Function for toggling collapsing data
    const toggle = () => setIsOpen(!isOpen);

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
            <div>
                <h1> Heroes List </h1>
                {/* Mapping API information to a card for each individual hero */}
                {heroes.map(hero => (
                <Card style={{ width: '25rem', backgroundColor: "#303030" }}>
                <CardImg variant="left" src={hero.images.md} />
                    <CardTitle style={{color: "EBEBEB"}}>{hero.name}</CardTitle>
                    <CardBody className='d-flex align-items-center justify-content-center' style={{backgroundColor: 'gray'}}>
                        <Collapse isOpen={isOpen} >
                            {/* Stats Details: Start */}
                            <CardText style={{color: 'black',}}>
                                Powerstats:
                            </CardText>
                            <CardText style={{color: 'black', fontSize: 20}}>
                                <strong>intelligence:</strong> {hero.powerstats.intelligence}<br />
                                <strong>strength:</strong> {hero.powerstats.strength}<br />
                                <strong>speed:</strong> {hero.powerstats.speed}<br />
                                <strong>durability:</strong> {hero.powerstats.durability}<br />
                                <strong>power:</strong> {hero.powerstats.power}<br />
                                <strong>combat:</strong> {hero.powerstats.combat}
                            </CardText>
                            {/* Stats Details: End */}

                            {/* Appearance Details: Start */}
                            <CardText style={{color: 'black'}}>
                                Appearance:
                            </CardText>
                            <CardText style={{color: 'black', fontSize: 20}}>
                            <strong>gender:</strong> {hero.appearance.gender}<br />
                            <strong>race:</strong> {hero.appearance.race}<br />
                            <strong>height:</strong> {hero.appearance.height}<br />
                            <strong>weight:</strong> {hero.appearance.weight}<br />
                            <strong>eyeColor:</strong> {hero.appearance.eyeColor}<br />
                            <strong>hairColor:</strong> {hero.appearance.hairColor}
                            </CardText>
                            {/* Appearance Details: End */}

                            {/* Bio Details: Start */}
                            <CardText style={{color: 'black'}}>
                                Biography:
                            </CardText>
                            <CardText style={{color: 'black', fontSize: 20}}>
                            <strong>fullName:</strong> {hero.biography.fullName}<br />
                            <strong>alterEgos:</strong> {hero.biography.alterEgos}<br />
                            <strong>aliases:</strong> {hero.biography.aliases}<br />
                            <strong>placeOfBirth:</strong> {hero.biography.placeOfBirth}<br />
                            <strong>firstAppearance:</strong> {hero.biography.firstAppearance}<br />
                            <strong>publisher:</strong> {hero.biography.publisher}<br />
                            <strong>alignment:</strong> {hero.biography.alignment}
                            </CardText>
                            {/* Bio Details: End */}

                            {/* Work Details: Start */}
                            <CardText style={{color: 'black'}}>
                                Work:
                            </CardText>
                            <CardText style={{color: 'black', fontSize: 20}}>
                            <strong>occupation:</strong> {hero.work.occupation}<br />
                            <strong>base:</strong> {hero.work.base}
                            </CardText>
                            {/* Work Details: End */}

                            {/* Work Details: Start */}
                            <CardText style={{color: 'black'}}>
                            Connections:
                            </CardText>
                            <CardText style={{color: 'black', fontSize: 20}}>
                            <strong>groupAffiliation:</strong> {hero.connections.groupAffiliation}<br />
                            <strong>relatives:</strong> {hero.connections.relatives}
                            </CardText>
                            {/* Work Details: End */}
                        </Collapse>
                        
                    </CardBody>
                    {/* Toggle Hero Details open and close */}
                    <Button color="primary" size="lg" onClick={toggle}>Show Details</Button>
                </Card>
                ))}
            </div>
            
        )
    }
}


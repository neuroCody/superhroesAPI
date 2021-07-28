import React, { useState, useEffect } from 'react'
import Modal from "react-modal"
import { Button } from "reactstrap"



export default function HeroList (props) {
    //Hook to contorl search terms
    const [searchTerm, setSearchTerm] = useState('')
    //Hook to contorl error response
    const [error, setError] = useState(null)
    //Hook to check loading state
    const [isLoaded, setIsLoaded] = useState(false)
    //Hook to render hero data
    const [heroes, setheroes] = useState([])
    //Hook to contorl Modal
    const [modal, setModal] = useState(false)
    //Hook to populate modal data
    const [modalData, setModalData] = useState([])

    function openModal() {
        setModal(true)
    }

    function closeModal() {
        setModal(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "40%",
            paddingLeft: 10, 
        },
    };

    //Fetch request and promises when connecting to API
    useEffect(() => {
        
        fetch("https://akabab.github.io/superhero-api/api/all.json")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setheroes(result)
                setModalData(result)
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
            
            )
    }, [])
console.log(modalData)
    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
        // Page rendering if modal is closed
    } else if (modal === false){
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
                            <button style={{ padding:0}}>
                                <img src={hero.images.md} style={{borderRadius: 0}} className="heroImage" onClick={() => {openModal(); setModalData(hero)}} />
                            </button>
                            <div style={{backgroundColor: "rgba(0, 18, 25, 0.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{ fontSize:25, color: "#FFE5CC"}}>{hero.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <Modal
                    isOpen={modal}
                    onRequestClose={() => {closeModal(); setModalData([])}}
                    style={customStyles}
                    contentLabel={modalData.name}
                >
                
                    <h1>{modalData.name}</h1>
                    <h2 style={{color: 'black',}}>
                        Powerstats:
                    </h2>
                    <p style={{color: 'black', fontSize: 20}}>
                        {/* <strong>intelligence:</strong> {modalData.powerstats.intelligence}<br /> */}
                    </p>
                </Modal>
            </div>
            
        )
        // Page rendering if modal is open
    }else if (modal === true){
        return (
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
                            <button style={{ padding:0}}>
                                <img src={hero.images.md} style={{borderRadius: 0}} className="heroImage" onClick={() => {openModal(); setModalData(hero)}} />
                            </button>
                            <div style={{backgroundColor: "rgba(0, 18, 25, 0.9)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{ fontSize:25, color: "#FFE5CC"}}>{hero.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <Modal
                    isOpen={modal}
                    onRequestClose={() => {closeModal(); setModalData([])}}
                    style={customStyles}
                    contentLabel={modalData.name}
                    
                >
                    {/* Modal Title */}
                    <h1>{modalData.name}</h1>
                    <div className="row" style={{padding:10,}}>
                        {/* Hero Powerstats title */}
                        <h2 style={{color: 'black', fontSize: 15, pading: 10, paddingRight: "10%"}}>
                            Powerstats:
                        </h2>
                        {/* Hero Apperance title*/}
                        <h2 style={{color: 'black', fontSize: 15}}>
                            Appearance:
                        </h2>
                    </div>
                    {/* Powerstats and apperance row */}
                    <div className="row">
                    {/* Hero Powerstats Details */}
                        <p style={{color: 'black', fontSize: 10, padding:10, paddingTop:3, paddingRight: "10%"}}>
                            <strong>Intelligence:</strong> {modalData.powerstats.intelligence}<br />
                            <strong>Strength:</strong> {modalData.powerstats.strength}<br />
                            <strong>Speed:</strong> {modalData.powerstats.speed}<br />
                            <strong>Durability:</strong> {modalData.powerstats.durability}<br />
                            <strong>Power:</strong> {modalData.powerstats.power}<br />
                            <strong>Combat:</strong> {modalData.powerstats.combat}
                        </p>

                        {/* Hero Apperance stats*/}
                        <p style={{color: 'black', fontSize: 10}}>
                            <strong>Gender:</strong> {modalData.appearance.gender}<br />
                            <strong>Race:</strong> {modalData.appearance.race}<br />
                            <strong>Height:</strong> {modalData.appearance.height}<br />
                            <strong>Weight:</strong> {modalData.appearance.weight}<br />
                            <strong>Eye Color:</strong> {modalData.appearance.eyeColor}<br />
                            <strong>Hair Color:</strong> {modalData.appearance.hairColor}
                        </p>
                    </div>

                    
                    {/* Hero Biography title */}
                    <h2 style={{color: 'black', fontSize: 15, pading: 10, }}>
                        Biography:
                    </h2>
                    <p style={{color: 'black', fontSize: 10, paddingTop:3, }}>
                        <strong>Full Name:</strong> {modalData.biography.fullName}<br />
                        <strong>Alter Egos:</strong> {modalData.biography.alterEgos}<br />
                        <strong>Aliases:</strong> {modalData.biography.aliases}<br />
                        <strong>Place Of Birth:</strong> {modalData.biography.placeOfBirth}<br />
                        <strong>f\First Appearance:</strong> {modalData.biography.firstAppearance}<br />
                        <strong>Publisher:</strong> {modalData.biography.publisher}<br />
                        <strong>Alignment:</strong> {modalData.biography.alignment}
                    </p>

                    {/* Hero Work Details */}
                    <h2 style={{color: 'black', fontSize: 10}}>
                        Work:
                    </h2>
                    <p style={{color: 'black', fontSize: 10}}>
                        <strong>Occupation:</strong> {modalData.work.occupation}<br />
                        <strong>Base:</strong> {modalData.work.base}
                    </p>
                        
                    

                    {/* Hero Connections */}
                    <h2 style={{color: 'black', fontSize: 15,}}>
                        Connections:
                    </h2>
                    <p style={{color: 'black', fontSize: 10}}>
                    <strong>Group Affiliation:</strong> {modalData.connections.groupAffiliation}<br />
                    <strong>Relatives:</strong> {modalData.connections.relatives}
                    </p>
                    <Button onClick={closeModal}>Close Modal</Button>
                
                </Modal>
            </div>
            
        )
        
    }
}



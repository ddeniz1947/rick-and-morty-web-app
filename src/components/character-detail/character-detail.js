import React, { useEffect,useState } from "react";
import fetchData from '../../fetchData';
import "./character-detail.css";
import {
    BrowserRouter as Router,
    Link,
    Redirect
  } from 'react-router-dom';
const CharacterDetail = (props) => {

    const [characterEpisodes , setCharacterEpisodes] = useState([]);
    useEffect(() => {
        if (props.location.characterData != undefined) {
            props.location.characterData.episode.map((data,index) => {
                fetchData(data).then(data => {
                    setCharacterEpisodes(characterEpisodes => [...characterEpisodes, 
                    
                        <tr>
                            <td className="episodeLink"><Link to={{
                            pathname:'/episodeDetail',
                            episodeData:data }}>
                                    {data.name}
                            </Link></td>
                            <td className="episodeLink"><Link to={{
                            pathname:'/episodeDetail',
                            episodeData:data }}>
                                    {data.episode}
                            </Link></td>

                             
                        </tr>]);
                });
        
                
            })
        }
    

}, []);

if (props.location.characterData != undefined) {
    return(
            <div  className="characterDetailContainer">
                <br />
                <div className="characterProfile">
                    <div className="imgcontainer">
                        <img className="characterImg" src={props.location.characterData.image}/>
                    </div>
                    <div className="info">
                        <p>Name : <u><b>{props.location.characterData.name}</b></u></p>
                        <p>Status : {props.location.characterData.status}</p>
                        <p>Species : {props.location.characterData.species}</p>
                        <p>Type : {props.location.characterData.type}</p>
                        <p>Gender: {props.location.characterData.gender}</p>
                        <p>Location : {props.location.characterData.location.name}</p>
                    </div>
                </div>
                <div>
                <table className="episodesTable">
                    <thead>
                        <tr className="sortable">
                            <th>Name </th>
                            <th>Episode </th>
                        </tr>
                    </thead>
                    <tbody>
                        {characterEpisodes}
                    </tbody>

                </table>
                </div>

                <br />
                <br />
            </div>
    );

}else{
    return (
        <Redirect to="/characters" />
    )
}
}

export default CharacterDetail;
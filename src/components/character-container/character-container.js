import React from 'react';
import "./character-container.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

const CharacterContainer = (props) => {
    let list = [];
    props.characterData.map((data, index) => {
        list.push(
                <Link to={{
                    pathname:'/characterDetail',
                    characterData:data
                }} key={index}>
                   <div key={index} className="characterCard">
                     <p> {data.name} </p>
                     <h6> {data.status} </h6>
                     <img className="characterContainerImg" src={data.image} />
                    </div>
                </Link>
        );
    })

    return (
        <div className="detailCardContainer">
            {list}
        </div>
    )
}

export default CharacterContainer;
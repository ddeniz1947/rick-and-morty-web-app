import React from 'react';
import "./episode-container.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
const EpisodeContainer = (props) => {
    let list = [];
    props.episodeData.map((data, index) => {
        list.push(
                <Link to={{
                    pathname:'/episodeDetail',
                    episodeData:data
                }}  key={index}>
                   <div key={index} className="card">
                     <p>{data.name}</p>
                     <h6> {data.episode} </h6>
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

export default EpisodeContainer;
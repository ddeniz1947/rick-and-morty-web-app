import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import fetchData from '../../fetchData';
import "./episode-detail.css";
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from 'react-router-dom';

const EpisodeDetail = (props) => {

    const [nameSortIcon, setNameSortIcon] = useState("down");
    const [statusSortIcon, setStatusSortIcon] = useState("down");
    const [speciesSortIcon, setSpeciesSortIcon] = useState("down");
    const [genderSortIcon, setGenderSortIcon] = useState("down");

    const [episodeData, setEpisodeData] = useState(props.location.episodeData == undefined ? [] : props.location.episodeData);
    const [charactersArray, setCharactersArray] = useState(props.location.episodeData == undefined ? [] : props.location.episodeData.characters);
    const [charactersPropertyArray, setCharactersPropertyArray] = useState([]);
    const [charactersPropertyFilteredArray, setCharactersPropertyFilteredArray] = useState([]);
    const [characterItemsFilterArray, setCharacterItemsFilterArray] = useState([]);

    useEffect(() => {
        console.log(charactersArray, "charactersArray");
        charactersArray.map((data, index) => {
            fetchData(data).then(data => {
                setCharactersPropertyArray(charactersPropertyArray => [...charactersPropertyArray, data]);
            });

            fetchData(data).then(data => {
                setCharactersPropertyFilteredArray(charactersPropertyArray => [...charactersPropertyArray, data]);
            });

            fetchData(data).then(data => {
                setCharacterItemsFilterArray(characterItemsFilterArray => [...characterItemsFilterArray, <tr key={index}>

                    <td className="characterLink">
                        <Link to={{
                            pathname: '/characterDetail',
                            characterData: data
                        }}>
                            {data.name}
                        </Link>
                    </td>
                    <td>{data.status}</td>
                    <td>{data.species}</td>
                    <td>{data.gender}</td>
                </tr>]);
            });
        });
    }, []);


    const inputFilterFunc = (e) => {
        setCharacterItemsFilterArray([]);
        setCharactersPropertyFilteredArray([]);

        charactersPropertyArray.map((data, index) => {
            if (data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                setCharacterItemsFilterArray(characterItemsFilterArray => [...characterItemsFilterArray, <tr key={index}>
                    <td className="characterLink">
                        <Link to={{
                            pathname: '/characterDetail',
                            characterData: data
                        }}>
                            {data.name}
                        </Link>
                    </td>
                    <td>{data.status}</td>
                    <td>{data.species}</td>
                    <td>{data.gender}</td>
                </tr>]);

                setCharactersPropertyFilteredArray(charactersPropertyFilteredArray => [...charactersPropertyFilteredArray, data]);
            }

        });
    }

    const sortFunc = (sortType) => {
        switch (sortType) {
            case "Name":
                if (nameSortIcon == "down") {
                    setNameSortIcon("up");

                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( a["name"].toString().toLowerCase() > b["name"].toString().toLowerCase()) ? 1 : ((b["name"].toString().toLowerCase() > a["name"].toString().toLowerCase()) ? -1 : 0))));  
                   
                } else {
                    setNameSortIcon("down");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( b["name"].toString().toLowerCase() > a["name"].toString().toLowerCase()) ? 1 : ((a["name"].toString().toLowerCase() > b["name"].toString().toLowerCase()) ? -1 : 0))));
                }
                
                break;
            case "Status":
                if (statusSortIcon == "down") {
                    setStatusSortIcon("up");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( a["status"].toString().toLowerCase() > b["status"].toString().toLowerCase()) ? 1 : ((b["status"].toString().toLowerCase() > a["status"].toString().toLowerCase()) ? -1 : 0))));  
                } else {
                    setStatusSortIcon("down");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( b["status"].toString().toLowerCase() > a["status"].toString().toLowerCase()) ? 1 : ((a["status"].toString().toLowerCase() > b["status"].toString().toLowerCase()) ? -1 : 0))));
                }

                break;
            case "Species":
                if (speciesSortIcon == "down") {
                    setSpeciesSortIcon("up");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( a["species"].toString().toLowerCase() > b["species"].toString().toLowerCase()) ? 1 : ((b["species"].toString().toLowerCase() > a["species"].toString().toLowerCase()) ? -1 : 0))));  
                } else {
                    setSpeciesSortIcon("down");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( b["species"].toString().toLowerCase() > a["species"].toString().toLowerCase()) ? 1 : ((a["species"].toString().toLowerCase() > b["species"].toString().toLowerCase()) ? -1 : 0))));
                }

                break;
            case "Gender":
                if (genderSortIcon == "down") {
                    setGenderSortIcon("up");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( a["gender"].toString().toLowerCase() > b["gender"].toString().toLowerCase()) ? 1 : ((b["gender"].toString().toLowerCase() > a["gender"].toString().toLowerCase()) ? -1 : 0))));  
                } else {
                    setGenderSortIcon("down");
                    setCharactersPropertyFilteredArray(charactersPropertyFilteredArray.sort((a, b) => (( b["gender"].toString().toLowerCase() > a["gender"].toString().toLowerCase()) ? 1 : ((a["gender"].toString().toLowerCase() > b["gender"].toString().toLowerCase()) ? -1 : 0))));
                }

                break;
        }

        sortedMethod();
    }

    const sortedMethod = () => {
        setCharacterItemsFilterArray([]);
        console.log(charactersPropertyFilteredArray,"charactersPropertyFilteredArray");
        charactersPropertyFilteredArray.map((data,index) => {
            
            setCharacterItemsFilterArray(characterItemsFilterArray => [...characterItemsFilterArray, <tr key={index}>
            <td className="characterLink">
                <Link to={{
                    pathname: '/characterDetail',
                    characterData: data
                }}>
                    {data.name}
                </Link>
            </td>
            <td>{data.status}</td>
            <td>{data.species}</td>
            <td>{data.gender}</td>
        </tr>]);
        })
    }

    if (props.location.episodeData != undefined) {

        return (
            <div className="episodeDetailContainer">
                <div className="episodeDetailFirstRow">
                    <p><u>{episodeData.name}</u></p>
                    <p>{episodeData.episode}</p>
                    <p><u>Characters</u></p>
                    <input placeholder="Search" className="filterInout" onChange={(e) => { inputFilterFunc(e) }} />
                </div>

                <table className="charactersTable">
                    <thead>
                        <tr className="sortable">
                            <th onClick={() => { sortFunc("Name") }}>Name&nbsp;<div className={nameSortIcon}></div></th>
                            <th onClick={() => { sortFunc("Status") }}>Status&nbsp;<div className={statusSortIcon}></div></th>
                            <th onClick={() => { sortFunc("Species") }}>Species&nbsp;<div className={speciesSortIcon}></div></th>
                            <th onClick={() => { sortFunc("Gender") }}>Gender&nbsp;<div className={genderSortIcon}></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            characterItemsFilterArray
                        }
                    </tbody>

                </table>
            </div>

        );
    }
    else {
        return (
            <Redirect to="/" />
        )
    }


}

export default EpisodeDetail;
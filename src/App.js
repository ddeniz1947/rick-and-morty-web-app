import logo from './assets/img/rick-and-morty.png';
import './App.css';
import { useEffect, useState } from 'react';
import fetchData from './fetchData';
import EpisodeContainer from './components/episode-container/episode-container';
import CharacterContainer from './components/character-container/character-container';
import EpisodeDetail from './components/episode-detail/episode-detail';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CharacterDetail from './components/character-detail/character-detail';


function App() {
  const [episodeArray,setEpisodeArray] = useState([]);
  const [characterArray,setCharacterArray] = useState([]);
  const [menuButtonText,setMenuButtonText] = useState("EPISODES");
  const [menuContainerDisplay,setMenuContainerDisplay] = useState(false);

  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/episode").then(data=> {
      setEpisodeArray(data.results)
    });
    fetchData("https://rickandmortyapi.com/api/character").then(data=> {
      setCharacterArray(data.results)
    });

    
  },[])


  const cssCls = menuContainerDisplay && "show";

  return (
    <div className="App">
      
      <Router>
        <div className="navBar">
            <img className="logo" src={logo} />
            <h1 className="navBarText">Rick And Morty Episodes And Characters</h1> 
            <div className="hamburgerMenu">
              <button className="menuButton" onClick={()=>{
                setMenuContainerDisplay(!menuContainerDisplay);
              }}
              >  
                <span>MENU</span>
                <div className="menuCircleIcon">
                  <div className={menuContainerDisplay ? "menuIconUp" : "menuIconDown"}></div>
                </div>
              </button>
              <div className={`menuDropdown ${cssCls}`}>
                  <button onClick={() => {setMenuButtonText("EPISODES")}}>
                       <Link to="/"> 
                          Episodes
                       </Link>
                  </button>
                  <button onClick={()=> {setMenuButtonText("CHARACTERS")}}>
                       <Link to="/characters"> 
                          Characters
                       </Link>
                  </button>
              </div>
            </div>
           
        </div>
        <Switch>
              <Route exact path="/" component={() => <EpisodeContainer episodeData={episodeArray} />}/>
              <Route exact path="/characters" component={() => <CharacterContainer characterData={characterArray} />}/>
              <Route exact path="/episodeDetail" component={EpisodeDetail}/>
              <Route exact path="/characterDetail" component={CharacterDetail}/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

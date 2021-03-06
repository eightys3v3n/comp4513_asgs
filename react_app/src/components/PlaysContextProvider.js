import React, {createContext, useState, useEffect} from 'react';


export const PlaysContext = createContext([]);

function PlaysProvider({children}) {
  const LOCAL_STORAGE_KEY = 'plays';
  const [plays, setPlays] = useState([]);
  const [filter, setFilter] = useState(() => () => true);
  //let url = "http://server.eighty7.ca:8082/api/list";
  let url = "http://localhost:8082/api/list";
  
  useEffect(() => {
    let localPlays = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    if (localPlays != null) {
      try {
        localPlays = localStorage.getItem(LOCAL_STORAGE_KEY);
        localPlays = JSON.parse(localPlays);
        if (localPlays.length > 0) {
          console.log(`Retrieved ${localPlays.length} plays from local storage`);
          setPlays(localPlays);
          return;
        }
      } catch (e) {
        console.warn("Failed to parse locally stored plays. Value is:");
        console.log(localPlays);
        console.log(e);
      }
    }
    
    console.log("Fetching plays from API...");
    fetch(url, {credentials: "include"})
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (typeof data != "object" && typeof data != "function") {
       console.warn("User is not logged in for this API");
       console.log(data);
     } else {
       data.forEach( (play) => {
        play.genre = play.genre.charAt(0).toUpperCase() + play.genre.substr(1).toLowerCase();
      } )
       setPlays(data);
       console.log(`Fetched ${data.length} plays from API`);
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
     }
   })
    .catch( err => {
      console.log("Failed to fetch plays: "+err);
    });
  }, [url]);

  function getByID(id) {
    for (const play of plays) {
      if (play.id === id) {
        return play;
      }
    }
    return {};
  }

  function getGenres() {
    let genres = new Set();

    for (let p of plays) {
      genres.add(p.genre);
    }

    genres = Array.from(genres);
    
    return genres;
  }

  return (
          <PlaysContext.Provider value={{plays, getByID, getGenres, filter, setFilter}}>
          {children}
          </PlaysContext.Provider>
          );
}

export default PlaysProvider;

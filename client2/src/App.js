import * as React from 'react';
import { useState,useEffect } from 'react';
import ReactMapGL ,{ Marker,Popup} from 'react-map-gl';
import {logEntry} from './API'
import LogEntryform from './logEntryform'
const App = ()=> {
  const [logEntries,setlogEntries] = useState([])
  const [showPopup , setshowPopup] = useState({})
  const [addLocation , setLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.0902,
    longitude: -95.665,
    zoom: 4
  });
  const getEntries = async ()=>{
    const logEntries  =  await logEntry();
       console.log(logEntries);
       setlogEntries(logEntries);

  }
  useEffect( ()=>{
    getEntries();
 
    
  },[])

  const addMarker = (event)=>{
    const [longitude,latitude] = event.lngLat;
    setLocation({
      latitude,
      longitude,

    })
    console.log(event);
  }
  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/notamanbag/ckea9p3ky02xv19qhmox0mcki'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick ={addMarker}
    >
    {
      logEntries.map(entry=>(
        <React.Fragment key = {entry._id}>
        <Marker 
            
            latitude={entry.latitude} 
            longitude={entry.longitude}
            offsetLeft={-12}
            offsetTop={-24}
            >
              <div
              onClick = {()=>setshowPopup({
              //...showPopup,
              [entry._id]:true,})}
              >
                    <svg viewBox="0 0 24 24"
                    className = "marker"
                    style = {{
                      width: '24px',
                      height:'24x',
                      
                    }}
                    width="30" height="30" 
                    stroke="orange" 
                    stroke-width="2" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="css-i6dzq1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle></svg>
               </div>
        </Marker>
        {
          showPopup[entry._id] ? (
            <Popup
          latitude={entry.latitude} 
          longitude={entry.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition = {true}
          doubleClickZoom ={true}
          dragRotate ={true}
          onClose={() => setshowPopup({})}
          anchor="top" >
          <div className = "popup">
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
            <p>{entry.comments}</p>
            <small>Visted on :- {new Date(entry.visitDate).toLocaleDateString()}</small>
            <br/>
          {entry.image && <img src ={entry.image} alt = {entry.title}></img>}

          </div>
        </Popup>
        

          ): null
        }
        </React.Fragment>//because we have 2 elements in root thatwhy we have to wrap in fragment wee could aslo use div
        
      ))

    }
    {
      addLocation?(
        <>
        <Marker 
            
            latitude={addLocation.latitude} 
            longitude={addLocation.longitude}
            offsetLeft={-12}
            offsetTop={-24}
            >
              <div>
                    <svg viewBox="0 0 24 24"
                    className = "marker"
                    style = {{
                      width: '24px',
                      height:'24x',
                      
                    }}
                    width="30" height="30" 
                    stroke="red" 
                    stroke-width="2" 
                    fill="none" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="css-i6dzq1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle></svg>
               </div>
        </Marker>
        <Popup
          latitude={addLocation.latitude} 
          longitude={addLocation.longitude}
          closeButton={true}
          closeOnClick={false}
          dynamicPosition = {true}
          doubleClickZoom ={true}
          dragRotate ={true}
          onClose={() => setLocation(null)}
          anchor="top" >
          <div className = "popup">
            <LogEntryform location ={addLocation} onClose ={()=>{
              setLocation(null);
              getEntries();
            }}/>
          </div>
        </Popup>
        </>
      ):null
    }
    
    </ReactMapGL>
  );
}

export default App;
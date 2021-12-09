import React, { useState, useEffect } from "react";
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars';
import ListItems from "./ListItems";

// const data = { data: {"code":"SUCCESS","message":[{"id":2,"lat":"37.42513212210951","lng":"-122.08844527602196","seatsAllowed":6,"seatsTaken":1,"name":"footbal avec popo","dateCreation":"2021-10-21T15:05:35.000Z","dateEvent":"2021-10-06T15:05:27.000Z","sport":"Football","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"},{"id":4,"pseudo":"Mathieu","profilePicPath":"./profilepicture.png"}]},{"id":4,"lat":"37.426528903310476","lng":"-122.08657443523408","seatsAllowed":6,"seatsTaken":1,"name":"foot au parc","dateCreation":"2021-10-21T15:13:25.000Z","dateEvent":"2021-10-06T15:12:20.000Z","sport":"Football","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":5,"lat":"48.69392580430736","lng":"6.189378350973129","seatsAllowed":6,"seatsTaken":1,"name":"Bonjour Thomas","dateCreation":"2021-10-21T15:14:08.000Z","dateEvent":"2021-10-06T19:13:28.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":6,"lat":"48.682309920465975","lng":"6.173613667488098","seatsAllowed":6,"seatsTaken":0,"name":"Soirée chez benou","dateCreation":"2021-10-21T15:16:58.000Z","dateEvent":"2021-10-08T12:01:11.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[]},{"id":7,"lat":"37.41824901299005","lng":"-122.08259303122759","seatsAllowed":4,"seatsTaken":0,"name":"balayage de paul brunner","dateCreation":"2021-10-21T15:18:54.000Z","dateEvent":"2021-10-06T15:18:22.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[]},{"id":8,"lat":"48.697314160108455","lng":"6.186669655144215","seatsAllowed":5,"seatsTaken":1,"name":"Test","dateCreation":"2021-10-21T15:22:22.000Z","dateEvent":"2021-10-02T17:22:49.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":10,"lat":"48.81770636","lng":"2.3754985","seatsAllowed":10,"seatsTaken":1,"name":"Foot ipsa","dateCreation":"2021-10-28T13:45:13.000Z","dateEvent":"2021-10-06T15:45:39.000Z","sport":"Football","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":12,"lat":"37.4253137104644","lng":"-122.08055622875692","seatsAllowed":6,"seatsTaken":1,"name":"event test paulin","dateCreation":"2021-11-12T11:19:52.000Z","dateEvent":"2021-11-07T04:18:37.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"},{"id":8,"pseudo":"popo","profilePicPath":"./profilepicture.png"}]},{"id":13,"lat":"37.42307471126208","lng":"-122.08109736442567","seatsAllowed":9,"seatsTaken":1,"name":"etst","dateCreation":"2021-11-12T12:03:36.000Z","dateEvent":"2021-11-08T12:03:17.000Z","sport":"Volleyball","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":14,"lat":"37.421998333333335","lng":"-122.08400000000002","seatsAllowed":6,"seatsTaken":1,"name":"ee","dateCreation":"2021-11-12T12:05:25.000Z","dateEvent":"2021-11-07T18:04:28.000Z","sport":"Basketball","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]},{"id":15,"lat":"37.41933570759411","lng":"-122.09011159837246","seatsAllowed":4,"seatsTaken":1,"name":"ghfjfj","dateCreation":"2021-11-14T14:09:00.000Z","dateEvent":"2021-11-02T14:08:27.000Z","sport":"Football","description":null,"createdBy":1,"participants":[{"id":1,"pseudo":"Paul","profilePicPath":"./profilepicture.png"}]}]}}


export default function Events() {    
    const [list, setList] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    
    async function activities(sessionId, refreshToken, lat, lng) {
      try {
          const value = await axios.post("https://sportheaven.herokuapp.com/getActivities", {"sessionId": sessionId, "refreshToken": refreshToken, "lat": lat, "lng": lng});
          setList(value);
          console.log(value);
      } catch (error) {
          console.log(error);
          setError(error);
      } finally {
        setLoading(false);
      }
  }
    useEffect(() => {
      activities(1, "oij", "67.31169", "-139.10211");
    }, []);
      return ( 
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: "30em"
      }}>
        <h3>
          <span> Liste des événements </span>
        </h3>
      <div>
      {
        
        loading && !error ? <span>{!error ? 'loading' : error}</span> : list.data.message.sort((a, b) => {return new Date(a.dateEvent) - new Date(b.dateEvent)}).map(elem => {
          return (
            <ListItems key={elem.id} day={getDay(elem.dateEvent)} month={monthLetters(elem.dateEvent)} date={formatTime(elem.dateEvent)} seats={elem.seatsTaken} maxSeats={elem.seatsAllowed} title={elem.name} sport={elem.sport}/>
            )
          })
      }
      </div>
      </div>
    );
}

function getDay(time) {
  var date = new Date(time);
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  return day;
}

function formatTime(time) {
  var date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
      month = '0' + month;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  return `${day}-${month}-${year} ${hour}:${minutes}`
}

function monthLetters(time) {
  var date = new Date(time);
  let month = date.getMonth()+1;
  switch (month) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";   
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "TAMERE"
    }
}
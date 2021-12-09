import React from "react";

export default function ListItems(props) {
    const emoji = {
        Basketball: '🏀',
        Volleyball: '🏐',
        Football: '⚽',
        Tennis: '🎾',
        Rugby: '🏉',
        Badminton: '🏸',
        Cyclisme: '🚴',
        Skateboard: '🛹',
        PingPong: '🏓',
        Boxe: '🥊',
        Bowling: '🎳',
        Lutte: '🤼',
        Natation: '🏊',
        Escrime: '🤺',
        Equitation: '🏇',
        Haltérophilie: '🏋️', 
        FootAmericain: '🏈',
        Baseball: '⚾',
        Golf: '⛳'
    };
    return (
      <div style={{marginTop: "5px", display: "flex", backgroundColor: "#f8f8f8", minHeight: "4em", flexDirection: "row", textAlign: "center", alignItems: "center", justifyContent: "space-evenly", borderRadius: "15px"}}>
        <div style={{backgroundColor: "#deb443",borderRadius: "5px",flexDirection: "column",minHeight: "30px",minWidth: "15px",margin: "15px",padding: "15px"}}>
          <span style={{fontWeight: "bold", fontSize: 20, display: "flex"}}>{props.day}</span>
          <span style={{fontSize: 16, display: "flex"}}>{props.month}</span>
        </div>
        <div style={{display: "flex", flexDirection: "column", margin: "15px", padding: "5px", width: "15%", textAlign: "left"}}>
          <span style={{fontWeight: "bold", fontSize: 20, display: "flex"}}>{props.title}</span>
          <span style={{fontSize: 16, display: "flex", color: "#838b8f"}}>{props.sport} {emoji[props.sport]}</span>
        </div>
        <div style={{display: "flex", flexDirection: "row", margin: "15px", padding: "8px", backgroundColor: getSeatsColor(props.seats, props.maxSeats), borderRadius: "20px"}}>
          <span style={{fontSize: 20, display: "flex", width: "40px"}}>{props.seats}/{props.maxSeats}</span>
          <span style={{fontSize: 20, display: "flex", paddingLeft: "3px"}}>seats taken</span>
        </div>
        <div style={{display: "flex", flexDirection: "row", margin: "15px", padding: "8px"}}>
          <span style={{fontSize: 20, display: "flex", color: "#838b8f"}}>📆 {props.date}</span>
        </div>
      </div>
    );
  }

function getSeatsColor(seats, maxSeats) {
    if (isNaN(seats) || isNaN(maxSeats))
        return "#E3E3E3"
    if (parseInt(seats) < parseInt(maxSeats))
        return "#7bc278"
    return "#e64963"    
}
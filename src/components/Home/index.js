import React from 'react';
import '../../bulma.css';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';
import logo from '../../image/logo.jpg';
import niti from '../../image/niti.png';
import tang from '../../image/Tang.png';
import nut from '../../image/Nut.png';
import ban from '../../image/banner5.png';
import SideBar from "../Home/slidebar";
import { StickyContainer, Sticky } from 'react-sticky';
import firebase from "firebase";
import {Animated} from "react-animated-css";
const HomePage = () => (
  <StickyContainer>

  <div id="App">
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
          <Sticky>
          {({
            style,
            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
        <header className="header" style={style}>
        <div class="columns is-multiline ">
              <div className="column  is-offset-3">
              <img src={logo} alt='logo' width='110px' className="has-text-centered" />
               </div>  

               {/* <div className="column is-1">
                <h5>{firebase.auth().currentUser.displayName}</h5>
               </div>    
                       */}
               {/* <button onClick={() => firebase.auth().signOut()}>Sign out!</button> */}
               <div class="column is-2 ">
               <p className="textcard2">{firebase.auth().currentUser.displayName}</p>
               <SignOutButton />
               </div> 
                      
               <div className="column is-1">
               <img alt="profilepic"src={firebase.auth().currentUser.photoURL}/>
               </div> 
                
              </div>
        </header>
     )}
     </Sticky>
{/* **************************************************************************** */}

       <div className="backgrounddash">

          <div className="columns">

          <img src={ban} alt='ban' width='45%'/>
     
         
          </div> 
  
       </div>
       
{/* **************************************************************************** */}  
      <br />      <br />      <br />
      <p className="textcard">Insira Team</p>
      <br />      <br />      <br />
       <div className="header">
          <div className="columns is-0">
            <div className="column">
  
            <img src={niti} alt='niti' width='200px' />
            <br />
            <br />
            <p className="textcard3">NITI BUESAMAE </p>    <br />
            <p className="textcard3">Computer Engineering </p>
            <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>
 
            </div>
            <div className="column">
            <img src={tang} alt='tang' width='200px' />
            <br />
            <br />
            <p className="textcard3">WIRANPATCHARA HOMKAEN</p>    <br />
            <p className="textcard3">Computer Engineering </p> 
            <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>
            </div>
            <div className="column">
            <img src={nut} alt='nut' width='200px' />
            <br />
            <br />
            <p className="textcard3">NATTAPAT YUVASUTA</p>    <br />
            <p className="textcard3">Computer Engineering </p>
            <p className="textcard3">King Mongkut’s University of Technology Thonburi</p>
            </div>
          </div>
       </div>
{/* **************************************************************************** */}

    </div>    
  </div>
  
  </StickyContainer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);




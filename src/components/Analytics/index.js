import React from 'react';
import '../../bulma.css';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';
import logo from '../../image/logo.jpg';
import SideBar from "../Home/slidebar";
import { StickyContainer, Sticky } from 'react-sticky';
import firebase from "firebase";
import D3Bar from "../Graph/D3Bar";
import Ranktable from '../Graph/Ranktable';
import { Animated } from "react-animated-css";
const Analytic = (props) => (
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
                                    <div class="column is-2 ">
                                        <p className="textcard2">{firebase.auth().currentUser.displayName}</p>
                                        <SignOutButton />
                                    </div>

                                    <div className="column is-1">
                                        <img alt="profilepic" width={50} height={50} src={firebase.auth().currentUser.photoURL} />
                                    </div>

                                </div>
                            </header>
                        )}
                </Sticky>
                <div className="Tablegraph">
                    <Ranktable />
                    <D3Bar />
                </div>
            </div>
        </div>

    </StickyContainer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Analytic);




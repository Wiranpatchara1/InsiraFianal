import React from "react";
import '../../bulma.css';
import SignOutButton from '../SignOut';
import logo from '../../image/logo.jpg';
import { Sticky } from 'react-sticky';
import firebase from "firebase";

export default props => {
    return (
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
                            <div className="columns is-multiline ">
                                <div className="column  is-offset-3">
                                    <img src={logo} alt='logo' width='110px' className="has-text-centered" />
                                </div>
                                <div class="column is-2 ">
                                    <p className="textcard2">{firebase.auth().currentUser.displayName}</p>
                                    <SignOutButton />
                                </div>

                                <div className="column is-1">
                                    <img alt="profilepic" style={{ borderRadius: '50%' }} width={50} height={50} src={firebase.auth().currentUser.photoURL} />
                                </div>

                            </div>
                        </header>
                    )}
            </Sticky>
    );
};
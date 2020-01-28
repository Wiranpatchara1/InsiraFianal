import React from 'react';
<<<<<<< HEAD
import '../../bulma.css';
=======

>>>>>>> f12f5ff249ebeeb05140dfdb09c103171c2aa24a
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);

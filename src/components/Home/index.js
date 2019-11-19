import React from 'react';
import SignOutButton from '../SignOut';
import { withAuthorization } from '../Session';
import logo from '../../image/logo.jpg';
const HomePage = () => (
  <div>
    <div className="header">
        <img src={logo} alt='logo' width = '110px' className="has-text-centered"/>
         <div className="header-right">
         <SignOutButton />
         </div>
     </div>
     {/* **************************************************************************** */}
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);

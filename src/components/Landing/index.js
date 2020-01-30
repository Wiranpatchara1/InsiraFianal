import React from 'react';
import '../../bulma.css';
// import logo from '../../image/logo.jpg';
import graph from '../../image/graph.jpg';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';
class Landing extends React.Component {

  render() {

    return (
      <div>
        {/*<button class="button is-primary" id='showModal' onClick={this.handleClick}>click</button>*/}
      
        {/* **************************************************************************** */}
        <div className="background">
          <div className="carduploard ">
            <div className="columns">
              <div className="column is-half">
                <div className="bolck ">
                  <p className="textcard">Automated Insight</p>
                  <p className="textcard">& Visualization</p>
                  <br />
                  <p className="textcard2">Insira is a new tool for Automated Visualization including generate Thai language description.</p>
                  <br /> <br /> <br />
                  <p className="textcard2 has-text-centered">Join with us now</p>
                  <p className="textcard2 has-text-centered">Plesase Sign in into the system</p><br />
    
                  <div className="has-text-centered">
                  <Link to={ROUTES.SIGN_IN}>
                    <button className="button is-info" >Sign in</button>
                  </Link>
                  </div>

                    <br />    
                    <SignUpLink />
                </div>

              </div>
              <div className="column ">
                <img src={graph} alt='graph' width='350px' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }



}





export default Landing;

import React from 'react';
import '../../bulma.css';
import { withAuthorization } from '../Session';
import SideBar from '../Slidebar ';
import Header from '../Header';
import D3Bar from "../Graph/D3Bar";
import Ranktable from '../Graph/Ranktable';
<<<<<<< HEAD
=======
import { StickyContainer} from 'react-sticky';
>>>>>>> e6b674e96544c84d9f86ce86db94bacc4efd09f9
const Analytic = (props) => (
    <StickyContainer>
        <div id="App">
                  <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap">
                <Header />
                <div className="Tablegraph">
                    <Ranktable />
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <D3Bar />
                </div>
            </div>
        </div>
    </StickyContainer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Analytic);




import React from 'react';
import '../../bulma.css';
import { withAuthorization } from '../Session';
import SideBar from '../Slidebar ';
import Header from '../Header';
import { StickyContainer} from 'react-sticky';
const Analytic = (props) => (
    <StickyContainer>
        <div id="App">
                  <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap">
                <Header />
                <div style={{margin:'0 auto'}}>
                    <h1>ON MAINTAIN</h1>
                </div>
            </div>
        </div>
    </StickyContainer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Analytic);




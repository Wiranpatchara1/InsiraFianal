import React from "react";
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";

const override = css`
    position: absolute;
    width: 300px;
    height: 200px;
    z-index: 15;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -150px;
`;
 
export default class Loadprogress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
    <div style={{position:'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'white',
                }} className="sweet-loading">
        <HashLoader
          css={override}
          size={150}
          //size={"150px"} this also works
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
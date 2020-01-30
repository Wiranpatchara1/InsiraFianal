import React from 'react';
import '../../slider-animation.css';
import "react-animated-slider/build/horizontal.css";
import Slider from "react-animated-slider";


const content = [
  {
    title: "What is Insira ? ",
    description:
      "Insira is the new tool for Automated Visualization including generate Thai language description. This tool is the valuable assistant for data sciencetist with the most efficiency",
    image: "https://i.imgur.com/4rcpnly.jpg",

  },
  {
    title: "Autometed Vusaulization",
    description:
      "Our system will begin with data collection, to the data analysis process and to evaluate the best results with provide graphs and figures. For the purpose of utilize your data analysis to make improvement of your work",
    image: "https://i.imgur.com/0B6gFGe.jpg",
  
  },
  {
    title: "Thai language Description",
    description:
      "In addition to the best graph results, will generate the statement report with description to clarify the graphing results in bilingual language. For a user to easily export result files from our system. To describe the work your organization more easily. ",
    image: "https://i.imgur.com/xAVPg4Y.png",

  }
];

const Banner = () => (
  <div>
   
    <Slider className="slider-wrapper">
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Slider>
  </div>
);


export default Banner;
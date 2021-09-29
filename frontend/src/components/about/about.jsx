import React from "react";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import './about.css'

const About = () => {
  return (
      <> 
      <div>
      <h3 className="headline">Meet Our Team Members</h3>
      </div>
    <div className="about">
      <motion.div whileHover={{ scale: 1.1 }} className="team-member">
        <div className="ous-img"></div>
        <p>Oussama Elarabi</p>
        <div className="about-links">
        <a href="https://www.linkedin.com/in/oussama-el-arabi-b67b1686/" target="_blank">
          {" "}
          <LinkedInIcon />{" "}
        </a>
        <a href="https://github.com/OussamaElar" target="_blank">
        
          {" "}
          <GitHubIcon />{" "}
        </a>
        </div>
      </motion.div>
      <br />
      <motion.div whileHover={{ scale: 1.1 }} className="team-member">
        <div className="mike-img"></div>
        <p>Michael Amicucci</p>
        <div className="about-links">
        <a href="https://www.linkedin.com/in/michael-amicucci-428bb9122/" target="_blank">
          {" "}
          <LinkedInIcon />{" "}
        </a>
        <a href="https://github.com/mikeamicucci34" target="_blank">
          {" "}
          <GitHubIcon />{" "}
        </a>
        </div>
      </motion.div>
      <br />
        
      <motion.div whileHover={{ scale: 1.1 }} className="team-member">
      <div className="chris-img"></div>
        <p>Christopher Vidic</p>
        <div className="about-links">
        <a href="https://www.linkedin.com/in/christopher-vidic/" target="_blank">
          {" "}
          <LinkedInIcon />{" "}
        </a>
        <a href="https://github.com/ctvidic" target="_blank">
          {" "}
          <GitHubIcon />{" "}
        </a>
        </div>
      </motion.div>
      <br />
      <motion.div whileHover={{ scale: 1.1 }} className="team-member">
        <div className="omar-img"></div>
        <p>Omar Luqman</p>
        <div className="about-links">
        <a href="https://www.linkedin.com/in/omar-luqman-147011183/" target="_blank">
          {" "}
          <LinkedInIcon />{" "}
        </a>
        <a href="https://github.com/omarluq" target="_blank">
          {" "}
          <GitHubIcon />{" "}
        </a>
        </div>
      </motion.div>
    </div>

    </>
  );
};

export default About;

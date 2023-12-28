"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import truncateString from "../_utils/truncateString.js";
import "../_stylesheets/carouselStyle.css";
// import Card from "./Card.jsx";

export default function Carousel({ projects, getProject, header }) {
  const [display, setDisplay] = useState(null);
  const [firstPointer, setFirstPointer] = useState(0);
  const [secondPointer, setSecondPointer] = useState(1);
  const [thirdPointer, setThirdPointer] = useState(2);

  const handleNext = () => {
    if (!projects[thirdPointer + 1]) {
      setFirstPointer(firstPointer + 1);
      setSecondPointer(secondPointer + 1);
      setThirdPointer(0);
      return;
    } else if (!projects[secondPointer + 1]) {
      setFirstPointer(firstPointer + 1);
      setSecondPointer(0);
      setThirdPointer(thirdPointer + 1);
      return;
    } else if (!projects[firstPointer + 1]) {
      setFirstPointer(0);
      setSecondPointer(secondPointer + 1);
      setThirdPointer(thirdPointer + 1);
      return;
    }

    setFirstPointer(firstPointer + 1);
    setSecondPointer(secondPointer + 1);
    setThirdPointer(thirdPointer + 1);
    return;
  };

  // previous

  const handlePrev = () => {
    if (!projects[thirdPointer - 1]) {
      setFirstPointer(firstPointer - 1);
      setSecondPointer(secondPointer - 1);
      setThirdPointer(projects.length - 1);
      return;
    } else if (!projects[secondPointer - 1]) {
      setFirstPointer(firstPointer - 1);
      setSecondPointer(projects.length - 1);
      setThirdPointer(thirdPointer - 1);
      return;
    } else if (!projects[firstPointer - 1]) {
      setFirstPointer(projects.length - 1);
      setSecondPointer(secondPointer - 1);
      setThirdPointer(thirdPointer - 1);
      return;
    }

    setFirstPointer(firstPointer - 1);
    setSecondPointer(secondPointer - 1);
    setThirdPointer(thirdPointer - 1);
    return;
  };

  useEffect(() => {
    const data = [
      projects[firstPointer],
      projects[secondPointer],
      projects[thirdPointer],
    ];
    setDisplay(data);
  }, [firstPointer]);

  return (
    display && (
      <div className="carousel-main">
        <FaChevronLeft className="prev-project-btn" onClick={handlePrev} />

        {display.map((project) => {
          const text = truncateString(project.description, 50);
          const openSpots = project.max_size - project.team;
          return (
            <div
              key={project.project_id}
              className="carousel-item-main"
              onClick={() => getProject(project)}
            >
              <div className="carousel-header">{header}</div>

              <div className="carousel-item-title">{project.title}</div>
              <div className="carousel-item-owner">@{project.owner}</div>
              <div className="carousel-item-languages">
                {project.languages.map((language) => {
                  return (
                    <img
                      src={language}
                      className="carousel-language-icon"
                      key={language}
                    />
                  );
                })}
              </div>
              <div className="carousel-item-description">{text}</div>
              {project.active && (
                <div className="carousel-item-status">
                  {openSpots} spots available
                </div>
              )}
            </div>
          );
        })}

        <FaChevronRight className="next-project-btn" onClick={handleNext} />
      </div>
    )
  );
}

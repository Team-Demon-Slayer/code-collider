"use client";
import { useState, useEffect } from "react";
import "../globals.css";
// import Card from "./Card.jsx";

export default function Carousel({ resetProjects, projects, header }) {
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


  useEffect( () => {
    const data = [
      projects[firstPointer],
      projects[secondPointer],
      projects[thirdPointer]];
    setDisplay(data)
  }, [firstPointer]);

  return display && (
    <main id="">

      <div className="carousel-button">
        <button onClick={handlePrev}> {'<'}</button>
      </div>

      {display.map((project) =>
        <div key={project.title} className="carousel-item">
          <div className='carousel-header'>{header}</div>
          <div className="carousel-item">
            <div className="carousel-item-title">{project.title}</div>
            <div className="carousel-item-owner">{project.owner}</div>
            <div className="carousel-item-languages">{project.languages[0]}</div>
            <div className="carousel-item-description">{'project.description'}</div>
            <div className="carousel-item-status">{project.status}</div>
          </div>
          <br />
        </div>
      )}

      <div className="carousel-button">
        <button onClick={handleNext}> {'>'}</button>
      </div>

    </main>
  );
}
"use client";
import { FaTimes } from "react-icons/fa";
import formatDate from "../_utils/formatDate.js";
import "../_stylesheets/projectModalStyle.css";

export default function ProjectModal({ project, closeModal }) {
  const handleCloseModal = () => {
    closeModal();
  };
  const date = formatDate(project.start);
  const spotsLeft = project.max_size - project.team;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <FaTimes className="close-modal-btn" onClick={handleCloseModal} />
        <div className="modal-header">
          <div className="modal-header-title-date">
            <div className="modal-header-title">{project.title}</div>
          </div>
          <div className="modal-header-description">{project.description}</div>
        </div>
        <div className="modal-body">
          <div className="modal-body-languages">
            {project.languages.map((language) => {
              return (
                <img
                  key={language}
                  src={language}
                  className="modal-body-language-img"
                />
              );
            })}
          </div>
          {project.active && (
            <>
              <div className="modal-body-start-date">Project starts {date}</div>
              <div className="modal-body-scope">
                Duration of {project.scope} days
              </div>
              <div className="modal-body-engineers">
                {spotsLeft} of {project.max_size} spots available
              </div>
            </>
          )}

          <div className="modal-btn-placement">
            {project.active ? (
              <button className="modal-footer-join-btn">JOIN PROJECT</button>
            ) : (
              <a
                href={project.repo_link}
                target="_blank"
                className="modal-footer-join-btn"
              >
                VIEW PROJECT
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

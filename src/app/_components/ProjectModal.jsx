"use client";
import { FaTimes } from "react-icons/fa";

export default function ProjectModal({ project, closeModal }) {
  const handleCloseModal = () => {
    // e.stopPropagation();
    closeModal();
  };
  return (
    <div className="modal">
      <FaTimes className="close-modal-btn" onClick={handleCloseModal} />
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-title">{project.title}</div>
        </div>
        <div className="modal-body">
          <div className="modal-body-description">{project.description}</div>
          <div className="modal-body-language">
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
        </div>
        <div className="modal-footer">
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
  );
}

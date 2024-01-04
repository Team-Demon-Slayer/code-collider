"use client";
import { FaTimes } from "react-icons/fa";
import formatDate from "../_utils/formatDate.js";
import "../_stylesheets/projectModalStyle.css";
import supabase from "../api/_db/index.js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { joinProject } from "../api/_db/_models/projectsModels.js";

export default function ProjectModal({ project, closeModal }) {
  const handleCloseModal = () => {
    closeModal();
  };

  const router = useRouter();

  // const supabaseClient = createClientComponentClient();

  // const getUser = async () => {
  //   const { data, error } = await supabase.auth.getSession();
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   const { data: userData, error: errorData } = await supabaseClient
  //     .from("users")
  //     .select("id")
  //     .eq("email", data.session.user.email);
  //   if (errorData) {
  //     console.error(errorData);
  //     return;
  //   }
  //   return userData[0].id;
  // };

  const handleJoinProject = async () => {
    // const userId = await getUser();
    joinProject(project.id)
      .then(() => router.push(`/project/${project.id}`))
      .catch((err) => console.error(err));
    // const { data, error } = await supabaseClient
    //   .from("projects_users")
    //   .insert({ user_id: userId, project_id: project.id });
    // if (error) {
    //   console.error(error);
    //   return;
    // }
    // router.push(`/project/${project.id}`);
  };

  const spotsLeft = project.max_developers - project.users.length;
  const date1 = new Date(project.finish_date);
  const date2 = new Date(project.start_date);
  const date = formatDate(date2);

  const differenceInTime = date1.getTime() - date2.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
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
                  key={language.url}
                  src={`https://skillicons.dev/icons?i=${language.url}`}
                  className="modal-body-language-img"
                />
              );
            })}
          </div>
          {project.active && (
            <>
              <div className="modal-body-start-date">Project starts {date}</div>
              <div className="modal-body-scope">
                Duration of {differenceInDays} days
              </div>
              <div className="modal-body-engineers">
                {spotsLeft} of {project.max_developers} spots available
              </div>
            </>
          )}

          <div className="modal-btn-placement">
            {project.active ? (
              <button
                className="modal-footer-join-btn"
                onClick={handleJoinProject}
              >
                JOIN PROJECT
              </button>
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

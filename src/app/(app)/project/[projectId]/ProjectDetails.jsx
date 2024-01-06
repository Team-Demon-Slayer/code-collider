"use client";

import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import getUserColor from "../../_utils/getUserColor.js";
import supabase from "../../../api/_db/index.js";
import "./style.css";

export default function ProjectDetails({ project_meta, username, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [onlineMember, setOnlineMember] = useState({});
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const roomOne = supabase.channel(`${project_meta.id}online`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    const updateOnlineMembers = (newState) => {
      if (mounted) {
        setOnlineMember((prevMembers) => {
          // Create a new object to ensure React recognizes the state change
          return { ...prevMembers, ...newState };
        });
      }
    };

    const subscribeToPresence = async () => {
      await roomOne.subscribe((status) => {
        if (status === "SUBSCRIBED" && mounted) {
          // Now we're connected to the channel, let's track presence
          const userStatus = {
            userId: userId,
            username: username,
            online_at: new Date().toISOString(),
          };

          roomOne.track(userStatus).catch(console.error);
        }
      });

      roomOne
        .on("presence", { event: "sync" }, () => {
          const newState = roomOne.presenceState();
          updateOnlineMembers(newState);
        })
        .on("presence", { event: "join" }, ({ key, newPresences }) => {
          updateOnlineMembers(newPresences);
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          setOnlineMember((prevMembers) => {
            const updatedMembers = { ...prevMembers };
            delete updatedMembers[key];
            return updatedMembers;
          });
        });

      await subscribeToPresence().catch(console.error);
    };

    // Subscribe when the component mounts
    subscribeToPresence();

    return () => {
      mounted = false;
      roomOne.unsubscribe().catch(console.error);
    };
  }, [project_meta.id, userId, username]);

  return (
    project_meta && (
      <div className="project-details-info">
        <div className="project-details-title">
          {!project_meta.active && <FaLock className="project-close-icon" />}
          <h2>{project_meta.title}</h2>
          <p>@{project_meta.owner.username}</p>
        </div>
        <div className="languages">
          {project_meta.languages.map((language) => {
            return (
              <img
                src={`https://skillicons.dev/icons?i=${language.url}`}
                key={language.name}
                className="language-icon"
              />
            );
          })}
        </div>
        <div className="project-details-description">
          {project_meta.description}
        </div>
        <div className="project-details-team">
          {project_meta.users.map((member, index) => {
            const isOnline = onlineMember[member.id] ? true : false;
            const userIndex = project_meta.users.findIndex(
              (user) => user.username === member.username
            );
            const color = getUserColor(userIndex);
            return (
              <div className="team-member" key={member.id}>
                {isOnline && (
                  <div className={`online-indicator-${color}`}></div>
                )}
                @{member.username}
                <span style={{ marginLeft: "15px" }}>
                  {index === project_meta.users.length - 1 ? "" : "|"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

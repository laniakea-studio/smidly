import React, { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";
import {
  getProjects,
  getModel,
  getParentFields,
  getModels,
} from "../../db/queryData";
import { Button } from "../_components/Button";
import { AccountLayout } from "./Layout";
import { RichTextEditor } from "../_components/RichTextEditor";
import { useModal } from "../../hooks/useModal";
import { CreateProject } from "./_components/CreateProject";
import { Modal } from "../_components/Modal";
import { readableStatus } from "../_components/readableStatus";
// @ts-ignore
import Fade from "react-reveal/Fade";

type ProjectsData = Array<{
  _id: string;
  admins_id: Array<any>;
  editors_id: Array<any>;
  models_id: Array<any>;
  projectName: string;
  owner_id: string;
  plan: string;
  status: string;
  timestamp_created: any;
  timestamp_last_published: any;
  timestamp_updated: any;
}>;

export const Account: FC<{}> = () => {
  const [loading, setLoading] = useState(true);
  const [projectsData, setProjectsData] = useState<ProjectsData | undefined>(
    undefined
  );
  const { isShown, toggle } = useModal();

  async function fetchData() {
    const data = await getProjects();
    setProjectsData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal
        isShown={isShown}
        closeModal={toggle}
        modalContent={
          <CreateProject closeModal={toggle} onSucces={fetchData} />
        }
      />
      <AccountLayout>
        <Main>
          <header>
            <h1>Websites</h1>
            <Button onClick={toggle}>
              <SvgAdd />
              New Project
            </Button>
          </header>

          {typeof projectsData !== "undefined" && (
            <>
              {projectsData?.map((i, index) => (
                <Fade key={i.projectName} duration={400} delay={50 * index}>
                  <ProjectItem>
                    <Link to={`/project/${i._id}`}>
                      <div className="imgBox">
                        <SvgPlaceholder />
                      </div>
                      <div className="contentBox">
                        <h2>{i.projectName}</h2>
                        <div>
                          <p>
                            Last publish:{" "}
                            {i.timestamp_last_published &&
                              i.timestamp_last_published
                                .toDate()
                                .toLocaleString("fi", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })}{" "}
                            <br />
                            Plan: {i.plan}
                          </p>
                        </div>
                        <p>{readableStatus(i.status)}</p>
                      </div>
                    </Link>
                  </ProjectItem>
                </Fade>
              ))}
            </>
          )}
        </Main>
      </AccountLayout>
    </>
  );
};

const ProjectItem = styled.div`
  width: 100%;
  min-height: 160px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  transition: all 0.2s;
  margin: 20px 0;
  &:hover {
    border-color: rgba(34, 161, 201, 0.3);
  }
  > a {
    display: flex;
    height: 100%;

    p {
      font-size: 14px;
      color: #979797;
    }
  }
  .imgBox {
    flex-basis: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 60px;
      height: 60px;
      path {
        fill: #dadada;
      }
    }
  }
  .contentBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
  }
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 160px 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  h1 {
    font-weight: 400;
    font-size: 24px;
  }
  header {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    button {
      margin-left: auto;
      padding-left: 10px;
      padding-right: 10px;
      svg {
        margin-right: 5px;
      }
    }
  }
  .react-reveal {
    width: 100%;
  }
  .slate {
    margin-bottom: 40px;
    border: 1px solid #a1a1a1;
    padding: 20px;
    border-radius: 4px;
    min-width: 300px;
  }
  button {
    margin: 20px 0;
  }
  h1 {
    color: #000;
  }
`;

const SvgPlaceholder = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24.2 12.8375L15 20L5.7875 12.8375L3.75 11.25L15 2.5L26.25 11.25L24.2 12.8375ZM5.775 16.0125L14.9875 23.175L24.2125 16L26.25 17.5875L15 26.3375L3.75 17.5875L5.775 16.0125Z" />
  </svg>
);

const SvgAdd = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 9C1.5 4.86 4.86 1.5 9 1.5C13.14 1.5 16.5 4.86 16.5 9C16.5 13.14 13.14 16.5 9 16.5C4.86 16.5 1.5 13.14 1.5 9ZM9.75 9.75H12.75V8.25H9.75V5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75Z"
      fill="#fff"
    />
  </svg>
);

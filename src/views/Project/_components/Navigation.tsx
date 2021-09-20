import { FC, InputHTMLAttributes, useState } from "react";
import { css } from "styled-components/macro";
import theme from "../../../theme/theme.js";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "../../_components/Icon";
import { useProject } from "../../../context/ProjectContext.js";
import { readableStatus } from "../../_components/readableStatus";
import { useModal } from "../../../hooks/useModal";
import { CreateModel } from "./CreateModel";
import { Modal } from "../../_components/Modal";
import { useHistory, useLocation } from "react-router-dom";
import { useParams, matchPath } from "react-router";

export const Navigation: FC<{}> = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  let initialNavTab = "";
  const matchModel = matchPath(pathname, {
    path: "/project/:id/model",
    exact: false,
    strict: false,
  });
  if (matchModel) {
    initialNavTab = "model";
  } else {
    initialNavTab = "content";
  }

  const { currentProject, currentProjectId } = useProject();
  const { isShown, toggle } = useModal();
  const [createModelType, setCreateModelType] = useState<string | null>(null);

  const { modelId }: { modelId: string; projectId: string } = useParams();

  const handleNavTab = (e: React.FormEvent) => {
    e.preventDefault();
    let name = e.currentTarget.getAttribute("data-to");
    console.log(name);
  };

  const pages = currentProject.models.filter(
    (i: any) => i.modelType === "page"
  );
  const posts = currentProject.models.filter(
    (i: any) => i.modelType === "post"
  );
  const globals = currentProject.models.filter(
    (i: any) => i.modelType === "global"
  );

  const newPage = () => {
    setCreateModelType("page");
    toggle();
  };
  const newPostTemplate = () => {
    setCreateModelType("post");
    toggle();
  };
  const newGlobalComponent = () => {
    setCreateModelType("global");
    toggle();
  };
  const goToNewModel = (modelUid: string) => {
    history.push(`/project/${currentProjectId}/model/${modelUid}`);
  };

  return (
    <>
      <Modal
        isShown={isShown}
        closeModal={toggle}
        modalContent={
          <CreateModel
            modelType={createModelType}
            closeModal={toggle}
            onSucces={goToNewModel}
          />
        }
      />
      <Aside>
        <div className="header">
          <Link to={`/project/${currentProjectId}`}>
            <SvgLogo />
          </Link>
          <span className="siteLink">{currentProject.projectName}</span>
        </div>
        <div className="records">
          <div className="tabs">
            <NavLink
              activeClassName="active"
              to={`/project/${currentProjectId}/content/${modelId}`}
            >
              Content
            </NavLink>
            <NavLink
              activeClassName="active"
              to={`/project/${currentProjectId}/model/${modelId}`}
            >
              Model
            </NavLink>
          </div>
          <div className="page">
            <header>
              <span>Page</span>
              {initialNavTab === "model" && (
                <button onClick={() => newPage()}>
                  <SvgAdd />
                </button>
              )}
            </header>
            {pages.map((i: any) => (
              <NavLink
                key={i.modelUid}
                activeClassName="active"
                to={`/project/${currentProjectId}/${
                  initialNavTab === "model" ? "model" : "content"
                }/${i.modelUid}`}
              >
                <Icon icon={i.modelIcon} />
                <span>{i.modelName}</span>
              </NavLink>
            ))}
          </div>
          <div className="posts">
            <header>
              <span>Posts</span>
              {initialNavTab === "model" && (
                <button onClick={() => newPostTemplate()}>
                  <SvgAdd />
                </button>
              )}
            </header>
            {posts.map((i: any) => (
              <NavLink
                key={i.modelUid}
                activeClassName="active"
                to={`/project/${currentProjectId}/${
                  initialNavTab === "model" ? "model" : "content"
                }/${i.modelUid}`}
              >
                <Icon icon={i.modelIcon} />
                <span>{i.modelName}</span>
              </NavLink>
            ))}
          </div>
          <div className="global">
            <header>
              <span>Global</span>
              {initialNavTab === "model" && (
                <button onClick={() => newGlobalComponent()}>
                  <SvgAdd />
                </button>
              )}
            </header>
            {globals.map((i: any) => (
              <NavLink
                key={i.modelUid}
                activeClassName="active"
                to={`/project/${currentProjectId}/${
                  initialNavTab === "model" ? "model" : "content"
                }/${i.modelUid}`}
              >
                <Icon icon={i.modelIcon} />
                <span>{i.modelName}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="menu">
          <Link to="">
            <SvgMedia />
            <span>Media</span>
          </Link>
          <Link to="">
            <SvgForms />
            <span>Forms</span>
          </Link>
          <Link to={`/project/${currentProjectId}/site-settings`}>
            <SvgSettings />
            <span>Settings</span>
          </Link>
        </div>
        <div className="bottom">{readableStatus(currentProject.status)}</div>
      </Aside>
    </>
  );
};

const Aside = styled.aside`
  background: ${theme.bgAside};
  min-width: 320px;
  display: flex;
  flex-direction: column;
  > div {
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    .siteLink {
      margin-top: 10px;
      font-family: poppins;
      font-size: 14px;
      color: #939393;
    }
  }
  .records a,
  .menu a,
  .bottom a {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    height: 42px;
    position: relative;
    color: #a4a6b3;
    svg {
      margin-right: 15px;
      width: 16px;
      path {
        fill: #a4a6b3;
      }
    }
    &.active {
      background: #282933;
      color: #e5e5e5;
      svg path {
        fill: #e5e5e5;
      }
    }
    &:hover {
      background: #2829337d;
    }
  }
  .records {
    margin: 20px 0 20px;
    display: flex;
    flex-direction: column;
    .tabs {
      display: flex;
      a {
        flex: 1;
        color: #939393;
        height: 32px;
        position: relative;
        justify-content: center;
        font-size: 15px;
        &.active {
          color: #939393;
          background: none;
        }
        &.active:after {
          position: absolute;
          bottom: 0;
          left: 50%;
          right: 50%;
          content: "";
          width: 30px;
          height: 2px;
          margin-left: -15px;
          background: #dbdbdb;
        }
      }
    }
    .page {
      display: flex;
      flex-direction: column;
    }
    .page header,
    .posts header,
    .global header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #6e6e6e;
      height: 52px;
      font-family: poppins;
      padding: 25px 20px 5px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 12px;
      button {
        opacity: 0.5;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .menu {
    border-top: 1px solid #2e2e30;
    a {
      height: 52px;
    }
  }
  .bottom {
    margin-top: auto;
    .status {
      display: flex;
      align-items: center;
      padding: 5px 20px;
      height: 52px;
      color: #a4a6b3;
      p {
        font-size: 15px;
      }
    }
  }
`;

const SvgLogo = () => (
  <svg
    width="62"
    height="20"
    viewBox="0 0 62 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.56013 12.156C8.48813 8.502 2.96213 9.636 2.96213 7.818C2.96213 7.242 3.44813 6.864 4.38413 6.864C5.37413 6.864 5.98613 7.386 6.05813 8.16H8.47013C8.32613 6.18 6.86813 4.866 4.45613 4.866C1.99013 4.866 0.514125 6.198 0.514125 7.854C0.514125 11.508 6.14813 10.374 6.14813 12.156C6.14813 12.732 5.60813 13.182 4.61813 13.182C3.61013 13.182 2.90813 12.606 2.81813 11.85H0.280125C0.388125 13.704 2.13413 15.162 4.63613 15.162C7.06613 15.162 8.56013 13.866 8.56013 12.156ZM24.5787 15H27.0987V9.15C27.0987 6.396 25.4067 4.884 23.0127 4.884C21.5547 4.884 20.2407 5.658 19.5927 6.792C18.9087 5.55 17.6307 4.884 16.0827 4.884C14.8407 4.884 13.7787 5.406 13.1487 6.234V5.028H10.6287V15H13.1487V9.492C13.1487 7.908 14.0307 7.08 15.3987 7.08C16.7307 7.08 17.6127 7.908 17.6127 9.492V15H20.1327V9.492C20.1327 7.908 21.0147 7.08 22.3647 7.08C23.6967 7.08 24.5787 7.908 24.5787 9.492V15ZM29.49 15H32.01V5.028H29.49V15ZM30.768 3.84C31.65 3.84 32.316 3.192 32.316 2.364C32.316 1.536 31.65 0.887999 30.768 0.887999C29.868 0.887999 29.22 1.536 29.22 2.364C29.22 3.192 29.868 3.84 30.768 3.84ZM33.8518 9.978C33.8518 13.092 35.8678 15.162 38.4058 15.162C39.9718 15.162 41.0878 14.442 41.6818 13.524V15H44.2378V1.68H41.6818V6.414C40.9978 5.478 39.7378 4.866 38.4238 4.866C35.8678 4.866 33.8518 6.864 33.8518 9.978ZM41.6998 10.014C41.6998 11.904 40.4398 12.948 39.0538 12.948C37.7038 12.948 36.4258 11.868 36.4258 9.978C36.4258 8.088 37.7038 7.08 39.0538 7.08C40.4398 7.08 41.6998 8.124 41.6998 10.014ZM46.699 15H49.219V1.68H46.699V15ZM55.9568 11.994L53.3828 5.028H50.5568L54.5528 14.748L52.3928 19.716H55.0748L61.2488 5.028H58.5668L55.9568 11.994Z"
      fill="#E5E5E5"
    />
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
      fill="#B4B4B4"
    />
  </svg>
);

const SvgMedia = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.6667 2C13.4 2 14 2.6 14 3.33333V12.6667C14 13.4 13.4 14 12.6667 14H3.33333C2.60001 14 2 13.4 2 12.6667V3.33333C2 2.6 2.60001 2 3.33333 2H12.6667ZM7.33333 11.0067L5.66667 9L3.33333 12H12.6667L9.66667 8L7.33333 11.0067Z"
      fill="#525360"
    />
  </svg>
);

const SvgForms = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.34001 14L15.3333 8L1.34001 2L1.33334 6.66667L11.3333 8L1.33334 9.33333L1.34001 14Z"
      fill="#525360"
    />
  </svg>
);

const SvgSettings = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M15.2312 9.86558L13.9 9.09683C14.0344 8.37183 14.0344 7.62808 13.9 6.90308L15.2312 6.13433C15.3844 6.04683 15.4531 5.86558 15.4031 5.69683C15.0562 4.58433 14.4656 3.57808 13.6937 2.74058C13.575 2.61246 13.3812 2.58121 13.2312 2.66871L11.9 3.43746C11.3406 2.95621 10.6969 2.58433 9.99998 2.34058V0.806206C9.99998 0.631206 9.87811 0.478081 9.70623 0.440581C8.55936 0.184331 7.38436 0.196831 6.29374 0.440581C6.12186 0.478081 5.99999 0.631206 5.99999 0.806206V2.34371C5.30624 2.59058 4.66249 2.96246 4.09999 3.44058L2.77186 2.67183C2.61874 2.58433 2.42811 2.61246 2.30936 2.74371C1.53749 3.57808 0.946865 4.58433 0.59999 5.69996C0.546865 5.86871 0.61874 6.04996 0.771865 6.13746L2.10311 6.90621C1.96874 7.63121 1.96874 8.37496 2.10311 9.09996L0.771865 9.86871C0.61874 9.95621 0.54999 10.1375 0.59999 10.3062C0.946865 11.4187 1.53749 12.425 2.30936 13.2625C2.42811 13.3906 2.62186 13.4218 2.77186 13.3343L4.10311 12.5656C4.66249 13.0468 5.30624 13.4187 6.00311 13.6625V15.2C6.00311 15.375 6.12499 15.5281 6.29686 15.5656C7.44374 15.8218 8.61874 15.8093 9.70936 15.5656C9.88124 15.5281 10.0031 15.375 10.0031 15.2V13.6625C10.6969 13.4156 11.3406 13.0437 11.9031 12.5656L13.2344 13.3343C13.3875 13.4218 13.5781 13.3937 13.6969 13.2625C14.4687 12.4281 15.0594 11.4218 15.4062 10.3062C15.4531 10.1343 15.3844 9.95308 15.2312 9.86558ZM7.99999 10.5C6.62186 10.5 5.49999 9.37808 5.49999 7.99996C5.49999 6.62183 6.62186 5.49996 7.99999 5.49996C9.37811 5.49996 10.5 6.62183 10.5 7.99996C10.5 9.37808 9.37811 10.5 7.99999 10.5Z"
      fill="#9FA2B4"
    />
  </svg>
);

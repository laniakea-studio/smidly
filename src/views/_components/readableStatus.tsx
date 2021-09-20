import styled from "styled-components";

export const readableStatus = (status: string) => {
  if (status === "isUpToDate") {
    return (
      <Box className="status">
        <p>
          <span className="greenIndicator" />
          Everthing is up to date
        </p>
      </Box>
    );
  }
  if (status === "waitForFirstDeploy") {
    return (
      <Box className="status">
        <p>
          <span className="greyIndicator" />
          Waiting for first deploy
        </p>
      </Box>
    );
  }
};

const Box = styled.div`
  span.greenIndicator {
    display: inline-flex;
    border-radius: 5px;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background: #19c795;
  }
  span.greyIndicator {
    display: inline-flex;
    border-radius: 5px;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    background: #81888d;
  }
`;

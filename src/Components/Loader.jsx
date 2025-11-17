import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper className="flex justify-center items-center mt-25 md:mt-50">
      <div className="loader"></div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 60px;
    height: 60px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #6b46c1; /* Purple-800 color */
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;

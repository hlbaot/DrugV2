// import styled from 'styled-components';

// const Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="newtons-cradle">
//         <div className="newtons-cradle__dot" />
//         <div className="newtons-cradle__dot" />
//         <div className="newtons-cradle__dot" />
//         <div className="newtons-cradle__dot" />
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .newtons-cradle {
//    --uib-size: 50px;
//    --uib-speed: 1.2s;
//    --uib-color: #474554;
//    position: relative;
//    display: flex;
//    align-items: center;
//    justify-content: center;
//    width: var(--uib-size);
//    height: var(--uib-size);
//   }

//   .newtons-cradle__dot {
//    position: relative;
//    display: flex;
//    align-items: center;
//    height: 100%;
//    width: 25%;
//    transform-origin: center top;
//   }

//   .newtons-cradle__dot::after {
//    content: '';
//    display: block;
//    width: 100%;
//    height: 25%;
//    border-radius: 50%;
//    background-color: var(--uib-color);
//   }

//   .newtons-cradle__dot:first-child {
//    animation: swing var(--uib-speed) linear infinite;
//   }

//   .newtons-cradle__dot:last-child {
//    animation: swing2 var(--uib-speed) linear infinite;
//   }

//   @keyframes swing {
//    0% {
//     transform: rotate(0deg);
//     animation-timing-function: ease-out;
//    }

//    25% {
//     transform: rotate(70deg);
//     animation-timing-function: ease-in;
//    }

//    50% {
//     transform: rotate(0deg);
//     animation-timing-function: linear;
//    }
//   }

//   @keyframes swing2 {
//    0% {
//     transform: rotate(0deg);
//     animation-timing-function: linear;
//    }

//    50% {
//     transform: rotate(0deg);
//     animation-timing-function: ease-out;
//    }

//    75% {
//     transform: rotate(-70deg);
//     animation-timing-function: ease-in;
//    }
//   }`;

// export default Loader;
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="typing-indicator">
        <div className="typing-circle" />
        <div className="typing-circle" />
        <div className="typing-circle" />
        <div className="typing-shadow" />
        <div className="typing-shadow" />
        <div className="typing-shadow" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .typing-indicator {
    width: 60px;
    height: 30px;
    position: relative;
    z-index: 4;
  }

  .typing-circle {
    width: 8px;
    height: 8px;
    position: absolute;
    border-radius: 50%;
    background-color: #000;
    left: 15%;
    transform-origin: 50%;
    animation: typing-circle7124 0.5s alternate infinite ease;
  }

  @keyframes typing-circle7124 {
    0% {
      top: 20px;
      height: 5px;
      border-radius: 50px 50px 25px 25px;
      transform: scaleX(1.7);
    }

    40% {
      height: 8px;
      border-radius: 50%;
      transform: scaleX(1);
    }

    100% {
      top: 0%;
    }
  }

  .typing-circle:nth-child(2) {
    left: 45%;
    animation-delay: 0.2s;
  }

  .typing-circle:nth-child(3) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }

  .typing-shadow {
    width: 5px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 30px;
    transform-origin: 50%;
    z-index: 3;
    left: 15%;
    filter: blur(1px);
    animation: typing-shadow046 0.5s alternate infinite ease;
  }

  @keyframes typing-shadow046 {
    0% {
      transform: scaleX(1.5);
    }

    40% {
      transform: scaleX(1);
      opacity: 0.7;
    }

    100% {
      transform: scaleX(0.2);
      opacity: 0.4;
    }
  }

  .typing-shadow:nth-child(4) {
    left: 45%;
    animation-delay: 0.2s;
  }

  .typing-shadow:nth-child(5) {
    left: auto;
    right: 15%;
    animation-delay: 0.3s;
  }`;

export default Loader;

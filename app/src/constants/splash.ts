export const splashStyles = `

    body{
        display: block;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: #95a5a6;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #D32F2F;
    }

    #globalLoader{
        position: fixed;
        z-index: 1700;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
        left: 0,
        right: 0;
        width: 100%;
        // width: 100vw;
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .loader {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        border: 10px solid;
        border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }
      
      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      } 
`;

import React from 'react';

const GlowVectors: React.FC = () => {
    return (
        <>
            <div
                className="glowVector absolute pointer-events-none"
                style={{
                    top: '883.48px',
                    left: '286px',
                    width: '906px',
                    height: '850px',
                    zIndex: 10,
                }}
            >
                <div
                    className="absolute vector1"
                    style={{
                        top: '0px',
                        left: '0px',
                        width: '410px',
                        height: '410px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 1) 0%,
                rgba(78, 78, 118, 0.8) 20%,
                rgba(78, 78, 118, 0.6) 40%,
                rgba(78, 78, 118, 0.4) 60%,
                rgba(78, 78, 118, 0.25) 75%,
                rgba(78, 78, 118, 0.15) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(120px)',
                    }}
                />

                <div
                    className="absolute vector2"
                    style={{
                        top: '582.18px',
                        left: '78.5px',
                        width: '410px',
                        height: '410px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 1) 0%,
                rgba(78, 78, 118, 0.8) 20%,
                rgba(78, 78, 118, 0.6) 40%,
                rgba(78, 78, 118, 0.4) 60%,
                rgba(78, 78, 118, 0.25) 75%,
                rgba(78, 78, 118, 0.15) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(120px)',
                    }}
                />

                <div
                    className="absolute vector3"
                    style={{
                        top: '411.39px',
                        left: '693.62px',
                        width: '410px',
                        height: '410px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 0.55) 0%,
                rgba(78, 78, 118, 0.45) 20%,
                rgba(78, 78, 118, 0.35) 40%,
                rgba(78, 78, 118, 0.25) 60%,
                rgba(78, 78, 118, 0.175) 75%,
                rgba(78, 78, 118, 0.125) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(120px)',
                    }}
                />
            </div>

            <div
                className="glowVector2 absolute pointer-events-none"
                style={{
                    top: '46px',
                    left: '438px',
                    width: '634.811279296875px',
                    height: '572.3828735351562px',
                    zIndex: 10,
                }}
            >
                <div
                    className="absolute smallVector1"
                    style={{
                        top: '0px',
                        left: '0px',
                        width: '307.5px',
                        height: '307.5px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 1) 0%,
                rgba(78, 78, 118, 0.8) 20%,
                rgba(78, 78, 118, 0.6) 40%,
                rgba(78, 78, 118, 0.4) 60%,
                rgba(78, 78, 118, 0.25) 75%,
                rgba(78, 78, 118, 0.15) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(90px)',
                    }}
                />

                <div
                    className="absolute smallVector2"
                    style={{
                        top: '392px',
                        left: '55px',
                        width: '307.5px',
                        height: '307.5px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 1) 0%,
                rgba(78, 78, 118, 0.8) 20%,
                rgba(78, 78, 118, 0.6) 40%,
                rgba(78, 78, 118, 0.4) 60%,
                rgba(78, 78, 118, 0.25) 75%,
                rgba(78, 78, 118, 0.15) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(90px)',
                    }}
                />

                <div
                    className="absolute smallVector3"
                    style={{
                        top: '277px',
                        left: '486px',
                        width: '307.5px',
                        height: '307.5px',
                        borderRadius: '50%',
                        background: `
              radial-gradient(
                circle,
                rgba(78, 78, 118, 0.55) 0%,
                rgba(78, 78, 118, 0.45) 20%,
                rgba(78, 78, 118, 0.35) 40%,
                rgba(78, 78, 118, 0.25) 60%,
                rgba(78, 78, 118, 0.175) 75%,
                rgba(78, 78, 118, 0.125) 90%,
                rgba(78, 78, 118, 0.1) 100%
              )
            `,
                        filter: 'blur(90px)',
                    }}
                />
            </div>

            <style>{`
        /* Vector 1: back and forth between (0,0) and (78.5px,582.18px) */
        @keyframes vector1Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(78.5px, 582.18px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        /* Vector 2: back and forth between (0px,0px) and (615.12px,-170.79px) */
        @keyframes vector2Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(615.12px, -170.79px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        /* Vector 3: back and forth between (0px,0px) and (-693.62px,-411.39px) - 50% opacity */
        @keyframes vector3Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 0.6; 
          }
          50% { 
            transform: translate(-693.62px, -411.39px); 
            opacity: 0.275; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 0.6; 
          }
        }

        .glowVector .vector1 {
          animation: vector1Move 8s ease-in-out infinite;
        }

        .glowVector .vector2 {
          animation: vector2Move 8s ease-in-out infinite;
        }

        .glowVector .vector3 {
          animation: vector3Move 8s ease-in-out infinite;
        }

        /* Small Vector 1: back and forth between (0,0) and (55px,392px) */
        @keyframes smallVector1Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(55px, 392px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        /* Small Vector 2: back and forth between (0px,0px) and (431px,-115px) */
        @keyframes smallVector2Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(431px, -115px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        /* Small Vector 3: back and forth between (0px,0px) and (-486px,-277px) - 50% opacity */
        @keyframes smallVector3Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 0.6; 
          }
          50% { 
            transform: translate(-486px, -277px); 
            opacity: 0.275; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 0.6; 
          }
        }

        .glowVector2 .smallVector1 {
          animation: smallVector1Move 8s ease-in-out infinite;
        }

        .glowVector2 .smallVector2 {
          animation: smallVector2Move 8s ease-in-out infinite;
        }

        .glowVector2 .smallVector3 {
          animation: smallVector3Move 8s ease-in-out infinite;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .glowVector2 {
            top: 26px !important;
            left: 10px !important;
            width: 426px !important;
            height: 384.1064453125px !important;
            opacity: 0.9;
          }

          .glowVector2 .smallVector1 {
            top: 0px !important;
            left: 0px !important;
            width: 205px !important;
            height: 205px !important;
            filter: blur(60px) !important;
          }

          .glowVector2 .smallVector2 {
            top: 263.06px !important;
            left: 36.91px !important;
            width: 205px !important;
            height: 205px !important;
            filter: blur(60px) !important;
          }

          .glowVector2 .smallVector3 {
            top: 185.89px !important;
            left: 326.14px !important;
            width: 205px !important;
            height: 205px !important;
            filter: blur(60px) !important;
          }

          /* Mobile animations with adjusted transform values */
          @keyframes smallVector1MoveMobile {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 0.9; 
            }
            50% { 
              transform: translate(36.91px, 263.06px); 
              opacity: 0.38; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 0.9; 
            }
          }

          @keyframes smallVector2MoveMobile {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 0.9; 
            }
            50% { 
              transform: translate(289.23px, -77.17px); 
              opacity: 0.38; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 0.9; 
            }
          }

          @keyframes smallVector3MoveMobile {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 0.5; 
            }
            50% { 
              transform: translate(-326.14px, -185.89px); 
              opacity: 0.24; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 0.5; 
            }
          }

          .glowVector2 .smallVector1 {
            animation: smallVector1MoveMobile 8s ease-in-out infinite;
          }

          .glowVector2 .smallVector2 {
            animation: smallVector2MoveMobile 8s ease-in-out infinite;
          }

          .glowVector2 .smallVector3 {
            animation: smallVector3MoveMobile 8s ease-in-out infinite;
          }
        }
      `}</style>
        </>
    );
};

export default GlowVectors;
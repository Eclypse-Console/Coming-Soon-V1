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
      `}</style>
        </>
    );
};

export default GlowVectors;
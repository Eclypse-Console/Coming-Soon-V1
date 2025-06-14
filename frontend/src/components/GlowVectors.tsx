import React from 'react';

const GlowVectors: React.FC = () => {
  return (
    <>
      <div className="glowVector absolute pointer-events-none">
        <div className="absolute vector1">
          <div
            className="w-full h-full rounded-full"
            style={{
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
            }}
          />
        </div>

        <div className="absolute vector2">
          <div
            className="w-full h-full rounded-full"
            style={{
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
            }}
          />
        </div>

        <div className="absolute vector3">
          <div
            className="w-full h-full rounded-full"
            style={{
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
            }}
          />
        </div>
      </div>

      <style>{`
        /* Base (mobile) styles */
        .glowVector {
          top: 1400px;
          left: 20px;
          width: 320px;
          height: 300px;
          z-index: 10;
        }

        .glowVector .vector1 {
          top: 0px;
          left: 0px;
          width: 150px;
          height: 150px;
          filter: blur(40px);
        }

        .glowVector .vector2 {
          top: 200px;
          left: 30px;
          width: 150px;
          height: 150px;
          filter: blur(40px);
        }

        .glowVector .vector3 {
          top: 120px;
          left: 250px;
          width: 150px;
          height: 150px;
          filter: blur(40px);
        }

        /* Base animations */
        @keyframes vector1Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(30px, 200px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        @keyframes vector2Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
          50% { 
            transform: translate(220px, -80px); 
            opacity: 0.45; 
          }
          100% { 
            transform: translate(0px, 0px); 
            opacity: 1; 
          }
        }

        @keyframes vector3Move {
          0% { 
            transform: translate(0px, 0px); 
            opacity: 0.6; 
          }
          50% { 
            transform: translate(-250px, -120px); 
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

        /* Medium (md) styles */
        @media (min-width: 768px) {
          .glowVector {
            top: 1600px;
            left: 120px;
            width: 650px;
            height: 600px;
          }

          .glowVector .vector1 {
            width: 280px;
            height: 280px;
            filter: blur(80px);
          }

          .glowVector .vector2 {
            top: 400px;
            left: 50px;
            width: 280px;
            height: 280px;
            filter: blur(80px);
          }

          .glowVector .vector3 {
            top: 280px;
            left: 470px;
            width: 280px;
            height: 280px;
            filter: blur(80px);
          }

          @keyframes vector1MoveMd {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 1; 
            }
            50% { 
              transform: translate(50px, 400px); 
              opacity: 0.45; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 1; 
            }
          }

          @keyframes vector2MoveMd {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 1; 
            }
            50% { 
              transform: translate(420px, -120px); 
              opacity: 0.45; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 1; 
            }
          }

          @keyframes vector3MoveMd {
            0% { 
              transform: translate(0px, 0px); 
              opacity: 0.6; 
            }
            50% { 
              transform: translate(-470px, -280px); 
              opacity: 0.275; 
            }
            100% { 
              transform: translate(0px, 0px); 
              opacity: 0.6; 
            }
          }

          .glowVector .vector1 {
            animation: vector1MoveMd 8s ease-in-out infinite;
          }

          .glowVector .vector2 {
            animation: vector2MoveMd 8s ease-in-out infinite;
          }

          .glowVector .vector3 {
            animation: vector3MoveMd 8s ease-in-out infinite;
          }
        }

        /* Large (lg) styles - original values */
        @media (min-width: 1024px) {
          .glowVector {
            top: 883.48px;
            left: 286px;
            width: 906px;
            height: 850px;
          }

          .glowVector .vector1 {
            width: 410px;
            height: 410px;
            filter: blur(120px);
          }

          .glowVector .vector2 {
            top: 582.18px;
            left: 78.5px;
            width: 410px;
            height: 410px;
            filter: blur(120px);
          }

          .glowVector .vector3 {
            top: 411.39px;
            left: 693.62px;
            width: 410px;
            height: 410px;
            filter: blur(120px);
          }

          @keyframes vector1MoveLg {
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

          @keyframes vector2MoveLg {
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

          @keyframes vector3MoveLg {
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
            animation: vector1MoveLg 8s ease-in-out infinite;
          }

          .glowVector .vector2 {
            animation: vector2MoveLg 8s ease-in-out infinite;
          }

          .glowVector .vector3 {
            animation: vector3MoveLg 8s ease-in-out infinite;
          }
        }
      `}</style>
    </>
  );
};

export default GlowVectors;
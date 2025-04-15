import React, { useState } from 'react';

const Slope = () => {
  // Step 1: Initial state
  const [showButton, setShowButton] = useState(true);
  const [isButtonShrinking, setIsButtonShrinking] = useState(false);

  // Step 2: Points and line
  const [showPoints, setShowPoints] = useState(false);
  const [showLine, setShowLine] = useState(false);

  // Step 3: Initial text and continue button
  const [showText, setShowText] = useState(false);
  const [showFullText, setShowFullText] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [isContinueShrinking, setIsContinueShrinking] = useState(false);

  // Step 4: Rise/Run visualization
  const [showHorizontalLine, setShowHorizontalLine] = useState(false);
  const [showVerticalLine, setShowVerticalLine] = useState(false);
  const [showRunLabel, setShowRunLabel] = useState(false);
  const [showRiseLabel, setShowRiseLabel] = useState(false);
  const [isRiseLabelShrinking, setIsRiseLabelShrinking] = useState(false);
  const [isRunLabelShrinking, setIsRunLabelShrinking] = useState(false);
  const [showRunNumbers, setShowRunNumbers] = useState([false, false, false, false, false]);
  const [showRiseNumbers, setShowRiseNumbers] = useState([false, false, false, false, false, false, false, false]);

  // Step 5: Explanation text
  const [showExplanation, setShowExplanation] = useState(false);
  const [showAdditionalText, setShowAdditionalText] = useState(false);
  const [isExplanationShrinking, setIsExplanationShrinking] = useState(false);
  const [isAdditionalTextShrinking, setIsAdditionalTextShrinking] = useState(false);

  // Step 6: Second continue button
  const [showSecondContinue, setShowSecondContinue] = useState(false);

  const handleClick = () => {
    // Step 1: Shrink and remove initial button
    setIsButtonShrinking(true);
    setTimeout(() => {
      setShowButton(false);
      
      // Step 2: Show points and line
      setShowPoints(true);
      setTimeout(() => {
        setShowLine(true);
        
        // Step 3: Show text and continue button
        setTimeout(() => {
          setShowText(true);
          setTimeout(() => {
            setShowContinue(true);
          }, 1500);
        }, 700);
      }, 800);
    }, 300);
  };

  const handleContinue = () => {
    // Step 3: Shrink and remove initial text and continue button
    setIsContinueShrinking(true);
    setTimeout(() => {
      setShowContinue(false);
      setShowFullText(false);
      setShowText(false);
      
      // Step 4: Show rise/run visualization
      setTimeout(() => {
        setShowHorizontalLine(true);
        // Show run numbers sequentially
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            setShowRunNumbers(prev => {
              const newState = [...prev];
              newState[i] = true;
              return newState;
            });
          }, i * 200);
        }
        setTimeout(() => {
          setShowVerticalLine(true);
          // Show rise numbers sequentially
          for (let i = 0; i < 8; i++) {
            setTimeout(() => {
              setShowRiseNumbers(prev => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
            }, i * 200);
          }
          setTimeout(() => {
            setShowRunLabel(true);
            setShowRiseLabel(true);
            
            // Step 5: Show explanation text
            setTimeout(() => {
              setShowExplanation(true);
              setTimeout(() => {
                setShowAdditionalText(true);
                
                // Step 6: Show second continue button
                setTimeout(() => {
                  setShowSecondContinue(true);
                }, 500);
              }, 500);
            }, 500);
          }, 800);
        }, 800);
      }, 500);
    }, 500);
  };

  const handleSecondContinue = () => {
    // Shrink and remove all elements
    setIsRiseLabelShrinking(true);
    setIsRunLabelShrinking(true);
    setIsExplanationShrinking(true);
    setIsAdditionalTextShrinking(true);
    
    setTimeout(() => {
      setShowRiseLabel(false);
      setShowRunLabel(false);
      setShowExplanation(false);
      setShowAdditionalText(false);
      setShowSecondContinue(false);
    }, 500);
  };

  const point1 = { x: 2, y: 3 }; 
  const point2 = { x: 7, y: 11 }; 

  const x1 = point1.x * 20;
  const y1 = (13 - point1.y) * 20;
  const x2 = point2.x * 20;
  const y2 = (13 - point2.y) * 20;

  return (
    <div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
      <style>
        {`
          .point {
            transform: translate(-50%, -50%);
          }
          @keyframes growPoint {
            from {
              opacity: 0;
              width: 0;
              height: 0;
            }
            to {
              opacity: 1;
              width: 12px;
              height: 12px;
            }
          }
          .point-animation {
            animation: growPoint 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes shrinkButton {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          .shrink-animation {
            animation: shrinkButton 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes drawLine {
            from {
              stroke-dashoffset: 200;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          .line-animation {
            stroke-dasharray: 200;
            animation: drawLine 0.6s cubic-bezier(0.5, 0, 0.05, 1) forwards;
          }
          .horizontal-line-animation {
            stroke-dasharray: 200;
            animation: drawLine 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
          .text-animation {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .text-fade-out {
            animation: fadeIn 0.5s ease-out reverse forwards;
          }
          @keyframes growButton {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .continue-animation {
            animation: growButton 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes transformSlash {
            from {
              transform: rotate(-45deg) scale(1);
              width: 1em;
              height: 0.1em;
            }
            to {
              transform: rotate(0deg) scale(1.5);
              width: 200px;
              height: 0.1em;
            }
          }
          .slash-animation {
            animation: transformSlash 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            background-color: currentColor;
            display: inline-block;
            transform-origin: left center;
          }
          .slash {
            display: inline-block;
            width: 1.2em;
            height: 2px;
            background-color: currentColor;
            transform: rotate(-60deg);
            vertical-align: middle;
          }
          @keyframes bounceAndFade {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            50% {
              transform: translateY(-8px);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 0;
            }
          }
          .bounce-fade {
            animation: bounceAndFade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes shrinkText {
            from {
              transform: scale(1);
              opacity: 1;
            }
            to {
              transform: scale(0);
              opacity: 0;
            }
          }
          .text-shrink {
            animation: shrinkText 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .fade-in-down {
            animation: fadeInDown 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
          .fade-in-right {
            animation: fadeInRight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}
      </style>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Slope Explorer</h2>
        </div>

        <div className="mt-4">
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md overflow-hidden">
            <div className="relative w-[400px] h-[260px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTVlNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]">
              {showButton && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isButtonShrinking ? 'shrink-animation' : ''}`}
                  onClick={handleClick}
                  style={{ transformOrigin: 'center' }}
                >
                  Click to Explore!
                </button>
              )}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {showLine && (
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#000000" 
                    strokeWidth="2"
                    className="line-animation"
                  />
                )}
                {showHorizontalLine && (
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x1 + 100} 
                    y2={y1} 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                  />
                )}
                {showVerticalLine && (
                  <line 
                    x1={x2} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                  />
                )}
                {showRunLabel && (
                  <text
                    x={x1 + 40}
                    y={y1 + 34}
                    fill="#3b82f6"
                    className={`text-sm font-bold ${isRunLabelShrinking ? 'text-shrink' : 'fade-in-right'}`}
                    style={{ transformOrigin: `${x1 + 40}px ${y1 + 30}px` }}
                  >
                    run
                  </text>
                )}
                {showRiseLabel && (
                  <text
                    x={x2 + 25}
                    y={y1 + (y2 - y1) / 2}
                    fill="#ef4444"
                    className={`text-sm font-bold ${isRiseLabelShrinking ? 'text-shrink' : 'fade-in-right'}`}
                    style={{ transformOrigin: 'center' }}
                  >
                    rise
                  </text>
                )}
                {showRunNumbers.map((show, index) => (
                  show && (
                    <text
                      key={index}
                      x={x1 + (index + 0.30) * 20}
                      y={y1 + 16}
                      fill="#3b82f6"
                      className="text-sm font-bold fade-in-right"
                      style={{ transformOrigin: `${x1 + (index + 0.5) * 20}px ${y1 + 25}px` }}
                    >
                      {index + 1}
                    </text>
                  )
                ))}
                {showRiseNumbers.map((show, index) => (
                  show && (
                    <text
                      key={index}
                      x={x2 + 7}
                      y={y2 - (index * 20) + 156}
                      fill="#ef4444"
                      className="text-sm font-bold fade-in-right"
                      style={{ transformOrigin: `${x2 + 15}px ${y2 - (index * 20) + 10}px` }}
                    >
                      {index + 1}
                    </text>
                  )
                ))}
              </svg>
              {showPoints && (
                <>
                  <div 
                    className="point absolute bg-[#5750E3] rounded-full point-animation"
                    style={{ 
                      left: `${point1.x * 20}px`,
                      top: `${(13 - point1.y) * 20}px`
                    }}
                  />
                  <div 
                    className="point absolute bg-[#5750E3] rounded-full point-animation"
                    style={{ 
                      left: `${point2.x * 20}px`,
                      top: `${(13 - point2.y) * 20}px`,
                      animationDelay: '0.1s'
                    }}
                  />
                </>
              )}
              {showText && (
                <div className={`absolute top-4 right-4 w-[180px] text-sm text-gray-600 ${isContinueShrinking ? 'text-shrink' : 'text-animation'} text-center`}>
                  <div>
                    {showFullText ? (
                      <span>
                        Here we have a line between two points. A <span className="font-bold text-[#5750E3]">slope</span> is what describes how steep a line is in terms of{" "}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center">
                      <span className="font-bold text-red-500">rise</span>
                      <span className="slash"></span>
                      <span className="font-bold text-blue-500">run</span>
                    </span>
                    {showFullText ? "." : null}
                  </div>
                </div>
              )}
              {showExplanation && (
                <div className={`absolute top-4 right-4 w-[180px] text-sm text-gray-600 ${isExplanationShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                  <div>
                    <span className="font-bold text-red-500">Rise</span> is the vertical displacement between two points on a line while <span className="font-bold text-blue-500">run</span> is the horizontal displacement between those two points.
                  </div>
                </div>
              )}
              {showAdditionalText && (
                <div className={`absolute top-32 right-4 w-[180px] text-sm text-gray-600 ${isAdditionalTextShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                  <div>
                    If on a grid, we can count the vertical and horizontal distances.
                  </div>
                </div>
              )}
              {showContinue && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isContinueShrinking ? 'shrink-animation' : 'continue-animation'}`}
                  onClick={handleContinue}
                  style={{ transformOrigin: 'center' }}
                >
                  Continue
                </button>
              )}
              {showSecondContinue && (
                <button 
                  className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none continue-animation"
                  onClick={handleSecondContinue}
                  style={{ transformOrigin: 'center' }}
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slope;
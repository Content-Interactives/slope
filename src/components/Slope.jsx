import React, { useState, useEffect, useRef } from 'react';

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
  const [isRunNumbersShrinking, setIsRunNumbersShrinking] = useState(false);
  const [isRiseNumbersShrinking, setIsRiseNumbersShrinking] = useState(false);
  const [showFractionBar, setShowFractionBar] = useState(false);
  const [showSlopeText, setShowSlopeText] = useState(false);
  const [isSlopeTextShrinking, setIsSlopeTextShrinking] = useState(false);
  const [isNumbersMoving, setIsNumbersMoving] = useState(false);
  const [isNumbersConverging, setIsNumbersConverging] = useState(false);
  const [showExploreButton, setShowExploreButton] = useState(false);
  const [showInstructionText, setShowInstructionText] = useState(false);
  const [isInstructionTextAppearing, setIsInstructionTextAppearing] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [showStaticNumbers, setShowStaticNumbers] = useState(false);
  const [points, setPoints] = useState([
    { x: 2, y: 3 },
    { x: 7, y: 11 }
  ]);
  const [currentRise, setCurrentRise] = useState(8);
  const [currentRun, setCurrentRun] = useState(5);
  const [isExploring, setIsExploring] = useState(false);

  // Step 5: Explanation text
  const [showExplanation, setShowExplanation] = useState(false);
  const [isExplanationShrinking, setIsExplanationShrinking] = useState(false);

  // Step 6: Second continue button
  const [showSecondContinue, setShowSecondContinue] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExploreButtonShrinking, setIsExploreButtonShrinking] = useState(false);
  const gridRef = useRef(null);
  const riseRef = useRef(8);
  const runRef = useRef(5);

  const updateRiseAndRun = (newPoints) => {
    // Determine leftmost and rightmost points
    const leftPoint = newPoints[0].x < newPoints[1].x ? newPoints[0] : newPoints[1];
    const rightPoint = newPoints[0].x < newPoints[1].x ? newPoints[1] : newPoints[0];
    
    // Calculate rise based on the vertical displacement from left to right
    const rise = rightPoint.y - leftPoint.y;
    const run = Math.abs(rightPoint.x - leftPoint.x);
    
    riseRef.current = rise;
    runRef.current = run;
    
    // Update the display directly
    const riseText = document.querySelector('text[fill="#ef4444"]');
    const runText = document.querySelector('text[fill="#3b82f6"]');
    if (riseText) riseText.textContent = Math.abs(rise);
    if (runText) runText.textContent = run;

    // Update the fraction display
    const fractionRiseText = document.querySelector('text[fill="#ef4444"][text-anchor="middle"]');
    if (fractionRiseText) {
      fractionRiseText.textContent = rise < 0 ? `-${Math.abs(rise)}` : rise;
    }
  };

  const handleClick = () => {
    setIsAnimating(true);
    // Step 1: Shrink and remove initial button
    setIsButtonShrinking(true);
    setTimeout(() => {
      setShowButton(false);
      
      // Show points and main line
      setShowPoints(true);
      setTimeout(() => {
        setShowLine(true);
        
        // Wait for line animation to complete before showing rise/run
        setTimeout(() => {
          setShowHorizontalLine(true);
          setShowVerticalLine(true);
          
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
          
          // Show text and continue button
          setTimeout(() => {
            setShowText(true);
            setTimeout(() => {
              setShowContinue(true);
              setIsAnimating(false);
            }, 1500);
          }, 700);
        }, 800); // Added delay after line animation
      }, 800);
    }, 300);
  };

  const handleContinue = () => {
    setIsAnimating(true);
    // Shrink and remove initial text and continue button
    setIsContinueShrinking(true);
    setTimeout(() => {
      setShowContinue(false);
      setShowFullText(false);
      setShowText(false);
      
      // Show slope text and fraction bar while keeping rise/run visible
      setTimeout(() => {
        setShowSlopeText(true);
        setTimeout(() => {
          setShowFractionBar(true);
          
          // First, trigger the convergence animation for extra numbers
          setIsRunNumbersShrinking(true);
          setIsRiseNumbersShrinking(true);
          
          // After convergence animation completes, show only the last numbers
          setTimeout(() => {
            setShowRunNumbers([false, false, false, false, true]);
            setShowRiseNumbers([false, false, false, false, false, false, false, true]);
            
            // Then trigger the move animation for the last numbers
            setIsNumbersMoving(true);
            setTimeout(() => {
              setShowExploreButton(true);
              setIsAnimating(false);
            }, 1000);
          }, 500);
        }, 300);
      }, 200);
    }, 500);
  };

  const handleSecondContinue = () => {
    setIsAnimating(true);
    // Shrink and remove all elements
    setIsRiseLabelShrinking(true);
    setIsRunLabelShrinking(true);
    setIsExplanationShrinking(true);
    setIsRunNumbersShrinking(true);
    setIsRiseNumbersShrinking(true);
    
    // Show slope text and fraction bar after a short delay
    setTimeout(() => {
      setShowSlopeText(true);
      setTimeout(() => {
        setShowFractionBar(true);
        setTimeout(() => {
          setIsNumbersMoving(true);
          setTimeout(() => {
            setShowExploreButton(true);
            setIsAnimating(false);
          }, 800);
        }, 300);
      }, 300);
    }, 200);
    
    setTimeout(() => {
      setShowRiseLabel(false);
      setShowRunLabel(false);
      setShowExplanation(false);
      setShowSecondContinue(false);
      // Hide all numbers except the last ones
      setShowRunNumbers([false, false, false, false, true]);
      setShowRiseNumbers([false, false, false, false, false, false, false, true]);
    }, 500);
  };

  const handlePointDrag = (index, e) => {
    if (!isDraggable) return;
    
    setIsDragging(true);
    setDragIndex(index);
    
    const rect = gridRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const x = Math.max(0, Math.min(400, clientX - rect.left));
    const y = Math.max(0, Math.min(260, clientY - rect.top));
    
    // Snap to nearest grid point (20x20 grid)
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    setPoints(prev => {
      const newPoints = [...prev];
      const newX = Math.round(snappedX / 20);
      const newY = Math.round((260 - snappedY) / 20);
      
      // Constrain points within boundaries
      const constrainedX = Math.max(1, Math.min(19, newX));
      const constrainedY = Math.max(1, Math.min(12, newY));
      
      newPoints[index] = {
        x: constrainedX,
        y: constrainedY
      };
      
      if (isExploring) {
        updateRiseAndRun(newPoints);
      }
      return newPoints;
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragIndex === null) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    
    const x = Math.max(0, Math.min(400, clientX - rect.left));
    const y = Math.max(0, Math.min(260, clientY - rect.top));
    
    // Snap to nearest grid point (20x20 grid)
    const snappedX = Math.round(x / 20) * 20;
    const snappedY = Math.round(y / 20) * 20;
    
    setPoints(prev => {
      const newPoints = [...prev];
      const newX = Math.round(snappedX / 20);
      const newY = Math.round((260 - snappedY) / 20);
      
      // Constrain points within boundaries
      const constrainedX = Math.max(1, Math.min(19, newX));
      const constrainedY = Math.max(1, Math.min(12, newY));
      
      newPoints[dragIndex] = {
        x: constrainedX,
        y: constrainedY
      };
      
      if (isExploring) {
        updateRiseAndRun(newPoints);
      }
      return newPoints;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragIndex]);

  const handleExploreClick = () => {
    setIsAnimating(true);
    setIsExploreButtonShrinking(true);
    setIsSlopeTextShrinking(true);
    setTimeout(() => {
      setShowSlopeText(false);
      setShowExploreButton(false);
      setShowInstructionText(true);
      setIsInstructionTextAppearing(true);
      setIsDraggable(true);
      setIsExploring(true);
      // Hide the original numbers
      setShowRunNumbers([false, false, false, false, false]);
      setShowRiseNumbers([false, false, false, false, false, false, false, false]);
      // Show static numbers
      setShowStaticNumbers(true);
      // Calculate initial rise and run
      const rise = Math.abs(points[1].y - points[0].y);
      const run = Math.abs(points[1].x - points[0].x);
      setCurrentRise(rise);
      setCurrentRun(run);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 500);
  };

  const x1 = points[0].x * 20;
  const y1 = (13 - points[0].y) * 20;
  const x2 = points[1].x * 20;
  const y2 = (13 - points[1].y) * 20;

  const handleReset = () => {
    // Reset all states to initial values
    setShowButton(true);
    setIsButtonShrinking(false);
    setShowPoints(false);
    setShowLine(false);
    setShowText(false);
    setShowFullText(true);
    setShowContinue(false);
    setIsContinueShrinking(false);
    setShowHorizontalLine(false);
    setShowVerticalLine(false);
    setShowRunLabel(false);
    setShowRiseLabel(false);
    setIsRiseLabelShrinking(false);
    setIsRunLabelShrinking(false);
    setShowRunNumbers([false, false, false, false, false]);
    setShowRiseNumbers([false, false, false, false, false, false, false, false]);
    setIsRunNumbersShrinking(false);
    setIsRiseNumbersShrinking(false);
    setShowFractionBar(false);
    setShowSlopeText(false);
    setIsSlopeTextShrinking(false);
    setIsNumbersMoving(false);
    setShowExploreButton(false);
    setIsExploreButtonShrinking(false);
    setShowInstructionText(false);
    setIsInstructionTextAppearing(false);
    setIsDraggable(false);
    setShowStaticNumbers(false);
    setPoints([
      { x: 2, y: 3 },
      { x: 7, y: 11 }
    ]);
    setCurrentRise(8);
    setCurrentRun(5);
    setIsExploring(false);
    setShowExplanation(false);
    setIsExplanationShrinking(false);
    setShowSecondContinue(false);
    setIsDragging(false);
    setDragIndex(null);
    riseRef.current = 8;
    runRef.current = 5;
  };

  return (
    <div className="w-[464px] mx-auto mt-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg select-none">
      <style>
        {`
          .point {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #5750E3;
            transform: translate(-50%, -50%);
            transition: background-color 0.3s ease;
            z-index: 20;
          }
          @keyframes growPoint {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .point-animation {
            animation: growPoint 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes pointColorChange {
            0% {
              transform: translate(-50%, -50%) scale(1);
            }
            50% {
              transform: translate(-50%, -50%) scale(0.8);
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .point-color-change {
            animation: pointColorChange 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            background-color: #FFB066;
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
          @keyframes runNumberExit {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .run-number-exit {
            animation: runNumberExit 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes riseNumberExit {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          .rise-number-exit {
            animation: riseNumberExit 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes numberFadeOut {
            0% {
              transform: scale(1) translate(0, 0);
              opacity: 1;
            }
            30% {
              transform: scale(0.9) translate(0, 0);
              opacity: 0.8;
            }
            60% {
              transform: scale(0.7) translate(0, 0);
              opacity: 0.4;
            }
            100% {
              transform: scale(0.5) translate(0, 0);
              opacity: 0;
            }
          }
          .number-fade-out {
            animation: numberFadeOut 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            pointer-events: none;
          }
          @keyframes fractionBarAppear {
            from {
              transform: scaleX(0);
              opacity: 0;
            }
            to {
              transform: scaleX(1);
              opacity: 1;
            }
          }
          .text-shrink {
            animation: shrinkText 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .fraction-bar {
            animation: fractionBarAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
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
          @keyframes moveToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(50px, -20px) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes moveRunToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(172px, -90px) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes moveRiseToFraction {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(154px, -45px) scale(1.5);
              opacity: 1;
            }
          }
          @keyframes convergeRunNumbers {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(80px, 0) scale(1.2);
              opacity: 0;
            }
          }
          @keyframes convergeRiseNumbers {
            from {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            to {
              transform: translate(0, -80px) scale(1.2);
              opacity: 0;
            }
          }
          .move-to-fraction {
            animation: moveToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-run-to-fraction {
            animation: moveRunToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .move-rise-to-fraction {
            animation: moveRiseToFraction 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .converge-run-numbers {
            animation: convergeRunNumbers 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .converge-rise-numbers {
            animation: convergeRiseNumbers 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .reset-button {
            background-color: #5750E3;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            transition: background-color 0.2s;
            margin-left: auto;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: bold;
            padding: 0.25rem 0.5rem;
            line-height: 1;
          }
          .reset-button:hover {
            background-color: #4a42c7;
          }
          .reset-button:disabled {
            background-color: #5750E3;
            opacity: 0.5;
            cursor: not-allowed;
          }
          @keyframes flashPoint {
            0%, 100% {
              background-color: #5750E3;
            }
            50% {
              background-color: #FFB066;
            }
          }
          .flash-animation {
            animation: flashPoint 0.3s ease-in-out 3;
          }
          @keyframes exploreNumberAppear {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .explore-number-appear {
            animation: exploreNumberAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}
      </style>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#5750E3] text-sm font-medium select-none">Slope Explorer</h2>
          <button 
            className="reset-button"
            onClick={handleReset}
            title="Reset interactive"
            disabled={isAnimating}
          >
            Reset
          </button>
        </div>

        <div className="space-y-4">
          {/* Visual Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md overflow-hidden">
            <div 
              ref={gridRef}
              className="relative w-[400px] h-[260px] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTVlNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
            >
              {showButton && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isButtonShrinking ? 'shrink-animation' : ''}`}
                  onClick={handleClick}
                  style={{ transformOrigin: 'center' }}
                >
                  Click to Explore!
                </button>
              )}
              <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                {showLine && (
                  <line 
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke="#000000" 
                    strokeWidth="2"
                    className="line-animation"
                    style={{ strokeDasharray: isExploring ? Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) : 200 }}
                  />
                )}
                {showHorizontalLine && (
                  <line 
                    x1={Math.min(x1, x2)} 
                    y1={points[0].x < points[1].x ? y1 : y2} 
                    x2={Math.max(x1, x2)} 
                    y2={points[0].x < points[1].x ? y1 : y2} 
                    stroke="#3b82f6" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                    style={{ strokeDasharray: isExploring ? Math.abs(x2 - x1) : 200 }}
                  />
                )}
                {showVerticalLine && (
                  <line 
                    x1={Math.max(x1, x2)} 
                    y1={Math.min(y1, y2)} 
                    x2={Math.max(x1, x2)} 
                    y2={Math.max(y1, y2)} 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    className="horizontal-line-animation"
                    style={{ strokeDasharray: isExploring ? Math.abs(y2 - y1) : 200 }}
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
                      y={y1 + 15}
                      fill="#3b82f6"
                      className={`text-sm font-bold ${isRunNumbersShrinking && index !== 4 ? 'run-number-exit' : isNumbersMoving && index === 4 ? 'move-run-to-fraction' : !isRunNumbersShrinking ? 'fade-in-right' : ''}`}
                      style={{ 
                        transformOrigin: `${x1 + (index + 0.5) * 20}px ${y1 + 16}px`,
                        position: isExploring ? 'absolute' : 'static',
                        left: isExploring ? '164px' : 'auto',
                        top: isExploring ? '-90px' : 'auto',
                        transform: isExploring ? 'scale(1.5)' : 'none'
                      }}
                    >
                      {isExploring && index === 4 ? currentRun : index + 1}
                    </text>
                  )
                ))}
                {showRiseNumbers.map((show, index) => (
                  show && (
                    <text
                      key={index}
                      x={x2 + 7}
                      y={y2 - (index * 20) + 159}
                      fill="#ef4444"
                      className={`text-sm font-bold ${isRiseNumbersShrinking && index !== 7 ? 'rise-number-exit' : isNumbersMoving && index === 7 ? 'move-rise-to-fraction' : !isRiseNumbersShrinking ? 'fade-in-right' : ''}`}
                      style={{ 
                        transformOrigin: isRiseNumbersShrinking && index !== 7 ? `${x2 + 7}px ${y2 - (index * 20) + 156}px` : `${x2 + 15}px ${y2 - (index * 20) + 10}px`,
                        position: isExploring ? 'absolute' : 'static',
                        left: isExploring ? '145px' : 'auto',
                        top: isExploring ? '-45px' : 'auto',
                        transform: isExploring ? 'scale(1.5)' : 'none'
                      }}
                    >
                      {isExploring && index === 7 ? currentRise : index + 1}
                    </text>
                  )
                ))}
                {isExploring && (
                  <>
                    <text
                      x={Math.min(x1, x2) + Math.abs(x2 - x1) / 2}
                      y={points[0].x < points[1].x ? y1 : y2}
                      fill="#3b82f6"
                      className="text-sm font-bold explore-number-appear"
                      textAnchor="middle"
                      dy="20"
                      style={{ transformOrigin: 'center' }}
                    >
                      {runRef.current}
                    </text>
                    <text
                      x={Math.max(x1, x2)}
                      y={Math.min(y1, y2) + Math.abs(y2 - y1) / 2}
                      fill="#ef4444"
                      className="text-sm font-bold explore-number-appear"
                      textAnchor="middle"
                      dx="20"
                      style={{ transformOrigin: 'center' }}
                    >
                      {riseRef.current}
                    </text>
                  </>
                )}
              </svg>
              {showPoints && (
                <>
                  <div 
                    className={`point ${isDraggable ? 'point-color-change' : (showPoints ? 'point-animation' : '')} ${isDraggable ? 'cursor-move' : ''} ${isDraggable ? 'flash-animation' : ''}`}
                    style={{ 
                      left: `${points[0].x * 20}px`,
                      top: `${(13 - points[0].y) * 20}px`,
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => handlePointDrag(0, e)}
                    onTouchStart={(e) => handlePointDrag(0, e.touches[0])}
                  />
                  <div 
                    className={`point ${isDraggable ? 'point-color-change' : (showPoints ? 'point-animation' : '')} ${isDraggable ? 'cursor-move' : ''} ${isDraggable ? 'flash-animation' : ''}`}
                    style={{ 
                      left: `${points[1].x * 20}px`,
                      top: `${(13 - points[1].y) * 20}px`,
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => handlePointDrag(1, e)}
                    onTouchStart={(e) => handlePointDrag(1, e.touches[0])}
                  />
                </>
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
              {showExploreButton && (
                <button 
                  className={`absolute bottom-4 right-4 px-3 py-1.5 bg-[#5750E3] text-white text-sm rounded-full hover:bg-[#4a42c7] transition-colors duration-200 select-none ${isExploreButtonShrinking ? 'shrink-animation' : 'continue-animation'}`}
                  onClick={handleExploreClick}
                  style={{ transformOrigin: 'center' }}
                >
                  Explore more slopes!
                </button>
              )}
            </div>
          </div>

          {/* Text Section */}
          <div className="w-[400px] mx-auto bg-white border border-[#5750E3]/30 rounded-md p-4 min-h-[55px]">
            {showText && (
              <div className={`text-sm text-gray-600 ${isContinueShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  {showFullText ? (
                    <span>
                      Here we have a line with its <span className="font-bold text-red-500">rise</span> and <span className="font-bold text-blue-500">run</span> displayed.
                    </span>
                  ) : null}
                </div>
              </div>
            )}
            {showExplanation && (
              <div className={`text-sm text-gray-600 ${isExplanationShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  Slope is defined as a line's <span className="font-bold text-red-500">rise</span> over <span className="font-bold text-blue-500">run</span>.
                </div>
              </div>
            )}
            {showSlopeText && (
              <div className={`text-sm text-gray-600 ${isSlopeTextShrinking ? 'text-shrink' : 'fade-in-down'} text-center`}>
                <div>
                  {showInstructionText ? (
                    <>
                      Drag the points to find new <span className="font-bold text-[#5750E3]">slopes</span>!
                    </>
                  ) : (
                    <>
                      For this particular line, the <span className="font-bold text-[#5750E3]">slope</span> would be 8/5
                    </>
                  )}
                </div>
              </div>
            )}
            {showInstructionText && !showSlopeText && (
              <div className={`text-sm text-gray-600 ${isInstructionTextAppearing ? 'fade-in-down' : ''} text-center`}>
                <div>
                  Drag the points to find new <span className="font-bold text-[#5750E3]">slopes</span>!
                </div>
              </div>
            )}
            {showFractionBar && (
              <div className="absolute top-36 right-32 w-[172px] h-20 pb-6" style={{ zIndex: 1 }}>
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  <line
                    x1="60"
                    y1="50"
                    x2="140"
                    y2="50"
                    stroke="#000000"
                    strokeWidth="2"
                    className="fraction-bar"
                    style={{ transformOrigin: '0 4px' }}
                  />
                  {showStaticNumbers && (
                    <>
                      <text
                        x="102"
                        y="97"
                        fill="#3b82f6"
                        className="text-lg font-bold"
                        style={{ fontSize: '2.3rem' }}
                        textAnchor="middle"
                      >
                        {isExploring ? runRef.current : 5}
                      </text>
                      <text
                        x="102"
                        y="32"
                        fill="#ef4444"
                        className="text-lg font-bold"
                        style={{ fontSize: '2.3rem' }}
                        textAnchor="middle"
                      >
                        {isExploring ? riseRef.current : 8}
                      </text>
                    </>
                  )}
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slope;
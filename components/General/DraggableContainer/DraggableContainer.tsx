import React, { useEffect, useState, useRef } from 'react';
import { FaTimes, FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import styles from './DraggableContainer.module.css';

interface DraggableContainerProps {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition: { x: number; y: number; width: number; height: number };
  sidebarWidth: number;
  zIndex: number;
  onClick: () => void;
  showClose: boolean;
  className?: string; // Add optional className property
}

const DraggableContainer: React.FC<DraggableContainerProps> = ({
  title,
  icon,
  onClose,
  children,
  initialPosition,
  sidebarWidth,
  zIndex,
  onClick,
  showClose,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: initialPosition.x, y: initialPosition.y });
  const [size, setSize] = useState({ width: initialPosition.width, height: initialPosition.height });
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition((prevPosition) => {
          const newX = prevPosition.x + e.movementX;
          const newY = prevPosition.y + e.movementY;

          const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
          const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - size.height));

          return {
            x: constrainedX,
            y: constrainedY,
          };
        });
      }

      if (isResizing) {
        setSize((prevSize) => {
          const newWidth = prevSize.width + e.movementX * resizeDirection.x;
          const newHeight = prevSize.height + e.movementY * resizeDirection.y;
          return {
            width: Math.min(newWidth, window.innerWidth - sidebarWidth - position.x),
            height: Math.min(newHeight, window.innerHeight - position.y),
          };
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, size.width, size.height, position.x, position.y, sidebarWidth, resizeDirection]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setInitialMousePos({ x: e.clientX, y: e.clientY });
    onClick();
  };

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: { x: number; y: number }) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''} ${className || ''}`}
      style={{
        left: isFullscreen ? 0 : position.x,
        top: isFullscreen ? 0 : position.y,
        width: isFullscreen ? '100vw' : size.width,
        height: isFullscreen ? '100vh' : size.height,
        zIndex,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.header}>
        <span>{icon} {title}</span>
        <div className={styles.icons}>
          {isFullscreen ? (
            <button className={styles.iconButton} onClick={handleFullscreenToggle} title="Exit Fullscreen">
              <FaCompressAlt />
            </button>
          ) : (
            <button className={styles.iconButton} onClick={handleFullscreenToggle} title="Enter Fullscreen">
              <FaExpandAlt />
            </button>
          )}
          {showClose && (
            <button className={styles.iconButton} onClick={onClose} title="Close">
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={`${styles.resizeHandle} ${styles.se}`} onMouseDown={(e) => handleResizeMouseDown(e, { x: 1, y: 1 })}>
        <svg className={styles.resizeIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <line x1="3" y1="17" x2="17" y2="3" stroke="white" strokeWidth="2"/>
          <line x1="7" y1="17" x2="17" y2="7" stroke="white" strokeWidth="4"/>
          <line x1="11" y1="17" x2="17" y2="11" stroke="white" strokeWidth="6"/>
        </svg>
      </div>
      <div className={`${styles.resizeHandle} ${styles.s}`} onMouseDown={(e) => handleResizeMouseDown(e, { x: 0, y: 1 })} />
      <div className={`${styles.resizeHandle} ${styles.e}`} onMouseDown={(e) => handleResizeMouseDown(e, { x: 1, y: 0 })} />
    </div>
  );
};

export default DraggableContainer;

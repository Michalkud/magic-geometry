import React, { useMemo } from 'react';

interface CircularLayoutProps {
  children: React.ReactElement[];
  centerX: number;
  centerY: number;
  radius: number;
}

export interface LayoutPosition {
  x: number;
  y: number;
}

export function calculateCircularPositions(
  count: number,
  centerX: number,
  centerY: number,
  radius: number
): LayoutPosition[] {
  const positions: LayoutPosition[] = [];
  
  if (count === 0) return positions;
  
  // Calculate angle between each item
  const angleStep = (2 * Math.PI) / count;
  
  for (let i = 0; i < count; i++) {
    // Start from top (- Math.PI / 2) and go clockwise
    const angle = -Math.PI / 2 + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    positions.push({ x, y });
  }
  
  return positions;
}

export default function CircularLayout({
  children,
  centerX,
  centerY,
  radius,
}: CircularLayoutProps) {
  const positions = useMemo(
    () => calculateCircularPositions(children.length, centerX, centerY, radius),
    [children.length, centerX, centerY, radius]
  );

  return (
    <>
      {React.Children.map(children, (child, index) => {
        const position = positions[index];
        if (!position) return null;
        
        return React.cloneElement(child, {
          ...child.props,
          position: position,
        });
      })}
    </>
  );
}
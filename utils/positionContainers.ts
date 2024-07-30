// utils/positionContainers.ts

export const positionContainers = (
  activeTabs: string[],
  viewportWidth: number,
  viewportHeight: number,
  sidebarWidth: number,
  currentPositions: { x: number; y: number; width: number; height: number; area: number }[]
) => {
  const numContainers = activeTabs.length;
  const positions: { x: number; y: number; width: number; height: number; area: number }[] = [];

  const availableWidth = viewportWidth - sidebarWidth;

  interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
    area: number;
  }

  const findEmptySpot = (positions: Position[]): Position | null => {
    for (let y = 0; y < viewportHeight; y += 10) {
      for (let x = sidebarWidth; x < viewportWidth; x += 10) {
        if (!positions.some((pos: Position) => (
          x >= pos.x && x < pos.x + pos.width &&
          y >= pos.y && y < pos.y + pos.height
        ))) {
          return { x, y, width: 0, height: 0, area: 0 };
        }
      }
    }
    return null;
  };

  const emptySpot = findEmptySpot(currentPositions);

  if (numContainers > 3) {
    const smallestContainer = currentPositions.reduce((min, pos) => {
      const area = pos.width * pos.height;
      return area < min.area ? { ...pos, area } : min;
    }, { area: Infinity, x: 0, y: 0, width: 0, height: 0 });

    positions.push({
      x: emptySpot ? emptySpot.x : smallestContainer.x,
      y: emptySpot ? emptySpot.y : smallestContainer.y,
      width: availableWidth / 3,
      height: viewportHeight,
      area: (availableWidth / 3) * viewportHeight
    });

    for (let i = 0; i < numContainers - 1; i++) {
      positions.push({ ...currentPositions[i], area: currentPositions[i].width * currentPositions[i].height });
    }

  } else {
    const rows = Math.ceil(Math.sqrt(numContainers));
    const cols = Math.ceil(numContainers / rows);

    const containerWidth = availableWidth / cols;
    const containerHeight = viewportHeight / rows;

    for (let i = 0; i < numContainers; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const newX = sidebarWidth + col * containerWidth;
      const newY = row * containerHeight;

      positions.push({
        x: newX,
        y: newY,
        width: containerWidth,
        height: containerHeight,
        area: containerWidth * containerHeight
      });
    }
  }

  return positions;
};

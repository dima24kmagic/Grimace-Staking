import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useWeb3Context } from "@/app/hooks/useWeb3";
import { useMetaMask } from "metamask-react";
import { SIGNATURE_MESSAGE } from "@/app/hooks/useRealUser";

interface ZoomableCanvasProps {
  width: number;
  height: number;
  nftID: string;
}

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  max-width: ${({ width }) => width + "px"};
  max-height: ${({ height }) => height + "px"};
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
`;

const ZoomButtonsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const ZoomButton = styled.button`
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  width: 30px;
  height: 30px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

export const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  display: flex;
  margin-top: 32px;
  background: #a9a9a9;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #9747ff;
  margin-bottom: 8px;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({
  width,
  height,
  nftID,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoadingSVG, setIsLoadingSVG] = useState(true);
  const [svgWidth, setSvgWidth] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(0);
  const imageRef = useRef<HTMLImageElement>();
  const { signature } = useWeb3Context();
  const { account } = useMetaMask();

  useEffect(() => {
    (async () => {
      setIsLoadingSVG(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/getSvgFile`,
          {
            method: "POST",
            headers: {
              // "Content-Type": "image/svg+xml",
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin":
                process.env.NEXT_PUBLIC_BACKEND_ENDPOINT, // Replace with your domain or specific origin
            },
            body: JSON.stringify({
              signature,
              account,
              message: SIGNATURE_MESSAGE,
              nftID,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch SVG file.");
        }

        const svgStringResponse = await res.text();

        const image = new Image();
        const blob = new Blob([svgStringResponse], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        image.onload = () => {
          URL.revokeObjectURL(url);
          imageRef.current = image;
          setSvgWidth(image.width);
          setSvgHeight(image.height);
          setIsLoadingSVG(false);
        };
        imageRef.current = image;
        image.src = url;
      } catch (e) {
        console.error("Error loading SVG:", e.message);
        setIsLoadingSVG(false);
      }
    })();
  }, [nftID]);
  useEffect(() => {
    if (imageRef.current && !isLoadingSVG) {
      const canvas = canvasRef.current;

      if (canvas) {
        const context = canvas.getContext("2d");

        const canvasWidth = width;
        const canvasHeight = height;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context?.clearRect(0, 0, canvasWidth, canvasHeight);

        const aspectRatio = svgWidth / svgHeight;
        const targetWidth = Math.min(canvasWidth, svgWidth);
        const targetHeight = targetWidth / aspectRatio;

        const scaledWidth = targetWidth * scale;
        const scaledHeight = targetHeight * scale;

        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;

        context?.drawImage(
          imageRef.current,
          offsetX + offset.x,
          offsetY + offset.y,
          scaledWidth,
          scaledHeight
        );
      }
    }
  }, [
    width,
    height,
    imageRef,
    offset,
    scale,
    isLoadingSVG,
    svgWidth,
    svgHeight,
  ]);

  const handleZoom = (delta: number, clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const offsetX = clientX - (rect.left + canvas.width / 2);
      const offsetY = clientY - (rect.top + canvas.height / 2);

      const scaleFactor = delta > 0 ? 0.9 : 1.1;
      const newScale = scale * scaleFactor;

      const newOffsetX = offsetX - (offsetX - offset.x) * scaleFactor;
      const newOffsetY = offsetY - (offsetY - offset.y) * scaleFactor;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    }
  };

  const handleZoomClick = (isZoomIn: boolean) => {
    const scaleFactor = isZoomIn ? 1.1 : 0.9;
    const newScale = scale * scaleFactor;
    const offsetX = offset.x;
    const offsetY = offset.y;
    const newOffsetX =
      offsetX * scaleFactor; /*+ isZoomIn ? offset.x : offset.x * -1;*/
    const newOffsetY =
      offsetY * scaleFactor; /*+ isZoomIn ? offset.y : offset.y * -1;*/
    setScale(newScale);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      setDragStart({ x: clientX, y: clientY });
      setIsDragging(true);
      canvas.style.cursor = "grabbing";
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (dragStart && isDragging) {
      const offsetX = clientX - dragStart.x;
      const offsetY = clientY - dragStart.y;

      const newOffsetX = offset.x + offsetX;
      const newOffsetY = offset.y + offsetY;

      setOffset({ x: newOffsetX, y: newOffsetY });
      setDragStart({ x: clientX, y: clientY });
    }
  };

  const handleDragEnd = () => {
    setDragStart(null);
    setIsDragging(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = "grab";
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    handleDragStart(event.clientX, event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    handleDragMove(event.clientX, event.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const handleMouseEnter = () => {
    if (!isDragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = "grab";
      }
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleZoomIn = () => {
    handleZoomClick(true);
  };

  const handleZoomOut = () => {
    handleZoomClick(false);
    // const offsetX = width / 2 - (width / 2 - offset.x) * (newScale / scale);
    // const offsetY = height / 2 - (height / 2 - offset.y) * (newScale / scale);
    // setOffset({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const canvas = canvasRef.current;
      if (canvasRef.current && event?.target?.id === canvas?.id) {
        event.preventDefault();
        handleZoom(event.deltaY, event.clientX, event.clientY);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleZoom]);

  if (isLoadingSVG) {
    return (
      <LoadingSpinner width={width} height={height}>
        <Spinner />
        Loading NFT
      </LoadingSpinner>
    );
  }

  return (
    <StyledRoot>
      <StyledCanvas
        id="imageCanvas"
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <ZoomButtonsContainer>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
      </ZoomButtonsContainer>
    </StyledRoot>
  );
};

export default ZoomableCanvas;

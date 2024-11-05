import React, { useEffect, useRef } from 'react';

const WebcamWithGraph: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const startVideo = async () => {
      try {
        const video = videoRef.current;
        if (video) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          await video.play();
          draw();
        }
      } catch (error) {
        console.error('Error accessing the webcam:', error);
      }
    };

    const draw = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const video = videoRef.current;

      const renderFrame = () => {
        if (canvas && ctx && video) {
          // Draw the webcam video onto the canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Overlay a random line graph
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

          ctx.strokeStyle = 'lime';
          ctx.lineWidth = 2;
          ctx.beginPath();

          // Draw a random line graph
          const step = 10;
          let x = 0;
          let y = canvas.height - Math.random() * 100;
          ctx.moveTo(x, y);

          while (x < canvas.width) {
            y = canvas.height - 100 + Math.random() * 100; // Random y position within the overlay
            x += step;
            ctx.lineTo(x, y);
          }

          ctx.stroke();
        }
        animationFrameId = requestAnimationFrame(renderFrame);
      };

      renderFrame();
    };

    startVideo();

    return () => {
      // Clean up on component unmount
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Webcam with Random Line Graph</h1>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="border border-gray-300"
      />
      {/* Hidden video element */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        width="640"
        height="480"
        playsInline
      />
    </div>
  );
};

export default WebcamWithGraph;

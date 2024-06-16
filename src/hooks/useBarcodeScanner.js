// src/hooks/useBarcodeScanner.js
import { useEffect, useRef, useState } from "react";

const useBarcodeScanner = (onDetected) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const constraints = {
      video: { facingMode: "environment" },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true"); // for iOS compatibility
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        setError("Error accessing camera. Please try again.");
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const scan = () => {
      if (
        videoRef.current &&
        videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
      ) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = detectBarcode(imageData);

        if (code) {
          onDetected(code);
        }
      }
      requestAnimationFrame(scan);
    };

    scan();
  }, [onDetected]);

  const detectBarcode = (imageData) => {
    // Basic placeholder for barcode detection logic
    // Replace with your own barcode detection algorithm
    return null;
  };

  return { videoRef, canvasRef, error };
};

export default useBarcodeScanner;

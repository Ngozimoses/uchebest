import { useState, useRef, useEffect } from 'react';

export default function QRScanner({ onScanSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError("Unable to access camera. Please allow permission and ensure your device has a camera.");
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const scanQR = () => {
    if (scanned) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // In a real app, you'd use jsQR here to decode
    // For demo, simulate a valid Uchebest QR code
    const simulatedData = "UCHEBEST_STORE_VALID_QR_2026";
    
    if (simulatedData.includes("UCHEBEST")) {
      setScanned(true);
      onScanSuccess(simulatedData);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-xl shadow-lg"
          />
          <canvas ref={canvasRef} className="hidden"></canvas>
          
          <button
            onClick={scanQR}
            disabled={scanned}
            className={`mt-4 w-full py-3 rounded-lg font-bold ${
              scanned 
                ? 'bg-green-500 text-white' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {scanned ? '✅ Points Earned!' : 'Scan QR Code'}
          </button>
          
          <p className="text-center text-gray-600 mt-2 text-sm">
            Scan any Uchebest store QR code to earn points (once per day).
          </p>
        </>
      )}
    </div>
  );
}
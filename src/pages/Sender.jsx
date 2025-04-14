import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const Sender = () => {
  const [viewerId, setViewerId] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const videoRef = useRef();
  const peerRef = useRef(null);
  const currentCallRef = useRef(null);

  useEffect(() => {
    // Check for screen sharing support
    if (!navigator.mediaDevices?.getDisplayMedia) {
      setIsSupported(false);
      return;
    }

    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("Sender ID:", id);
    });

    peerRef.current = peer;
  }, []);

  const startShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current.srcObject = stream;

      // Stop previous call if any
      if (currentCallRef.current) {
        currentCallRef.current.close();
      }

      // Start new call
      const call = peerRef.current.call(viewerId, stream);
      currentCallRef.current = call;

      // Notify if screen sharing is stopped manually
      stream.getVideoTracks()[0].addEventListener("ended", () => {
        alert("You have stopped sharing your screen.");
        videoRef.current.srcObject = null;
      });

    } catch (err) {
      console.error("Error starting screen share:", err);
      alert("Could not start screen sharing. Please check browser support and permissions.");
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">
          ❌ Screen sharing is not supported on this device or browser.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">📤 Screen Sender</h2>
      <input
        className="border px-2 py-1 w-full max-w-sm"
        placeholder="🔑 Enter Viewer ID"
        value={viewerId}
        onChange={(e) => setViewerId(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={startShare}
      >
        ▶️ Start Sharing
      </button>
      <video ref={videoRef} autoPlay muted className="mt-4 w-full rounded shadow" />
    </div>
  );
};

export default Sender;

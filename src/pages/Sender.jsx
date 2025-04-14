import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const Sender = () => {
  const [viewerId, setViewerId] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const videoRef = useRef();
  const peerRef = useRef(null);

  useEffect(() => {
    // Check for screen sharing support
    if (!navigator.mediaDevices.getDisplayMedia) {
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
      peerRef.current.call(viewerId, stream);
    } catch (err) {
      console.error("Error starting screen share:", err);
      alert("Could not start screen sharing. Please check browser support and permissions.");
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-600">Screen sharing is not supported on this device or browser.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Screen Sender</h2>
      <input
        className="border px-2 py-1"
        placeholder="Viewer ID"
        value={viewerId}
        onChange={(e) => setViewerId(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={startShare}>
        Start Sharing
      </button>
      <video ref={videoRef} autoPlay muted className="mt-4 w-full" />
    </div>
  );
};

export default Sender;

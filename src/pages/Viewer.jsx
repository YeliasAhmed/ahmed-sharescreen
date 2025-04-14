import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const Viewer = () => {
  const [myId, setMyId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [streamEnded, setStreamEnded] = useState(false);
  const videoRef = useRef();
  const callRef = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setMyId(id);
    });

    peer.on("call", (call) => {
      call.answer();

      call.on("stream", (remoteStream) => {
        setIsConnected(true);
        setStreamEnded(false);
        videoRef.current.srcObject = remoteStream;

        // Listen for when the sender stops sharing
        remoteStream.getVideoTracks()[0].addEventListener("ended", () => {
          setStreamEnded(true);
          setIsConnected(false);
          videoRef.current.srcObject = null;
        });
      });

      callRef.current = call;
    });

    return () => {
      // Cleanup on unmount
      if (callRef.current) {
        callRef.current.close();
      }
      peer.destroy();
    };
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">🖥️ Screen Viewer</h2>

      <div className="space-y-2">
        <p>
          <strong>Your Viewer ID:</strong> <span className="text-blue-600">{myId}</span>
        </p>

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => {
            navigator.clipboard.writeText(myId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "✅ Copied!" : "📋 Copy ID"}
        </button>
      </div>

      {isConnected ? (
        <video ref={videoRef} autoPlay controls className="mt-4 w-full max-w-2xl rounded shadow" />
      ) : streamEnded ? (
        <p className="text-red-600 font-medium">⛔ Screen sharing has ended.</p>
      ) : (
        <p className="text-gray-500 italic">Waiting for screen to be shared...</p>
      )}
    </div>
  );
};

export default Viewer;

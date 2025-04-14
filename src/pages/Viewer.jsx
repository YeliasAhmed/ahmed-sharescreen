import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const Viewer = () => {
  const [myId, setMyId] = useState("");
  const [copied, setCopied] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      setMyId(id);
    });

    peer.on("call", (call) => {
      call.answer();
      call.on("stream", (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
      });
    });
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Screen Viewer</h2>
      <p>Your Viewer ID: <strong>{myId}</strong></p>
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={() => {
          navigator.clipboard.writeText(myId);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? "Copied!" : "Copy ID"}
      </button>
      <video ref={videoRef} autoPlay className="mt-4 w-full" />
    </div>
  );
};

export default Viewer;

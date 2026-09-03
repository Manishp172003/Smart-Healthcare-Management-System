import { useState, useEffect, useRef } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  Maximize2,
  Minimize2,
  X,
  Send,
  User,
  HeartPulse,
  Clock,
  Sparkles,
  Volume2
} from "lucide-react";

export default function VideoConsultationModal({
  isOpen,
  onClose,
  appointment
}) {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "doctor",
      text: `Hello ${localStorage.getItem("name") || "there"}, I can hear you clearly. How have your symptoms been today?`,
      time: "Just now"
    }
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);

  // Call duration counter
  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Try to access user's local web camera preview
  useEffect(() => {
    let stream = null;
    if (isOpen && !isVideoOff) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          setCameraActive(true);
        })
        .catch(() => {
          setCameraActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, isVideoOff]);

  if (!isOpen || !appointment) return null;

  const formatCallTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: "patient",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setChatMessages([...chatMessages, newMsg]);
    setMessageInput("");

    // Simulate doctor reply after 1.5 seconds
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "doctor",
          text: "I have noted that down in your clinical session notes. Let's continue.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Telehealth Window */}
      <div className="w-full max-w-5xl h-[90vh] bg-slate-900 rounded-3xl shadow-2xl border border-slate-700/60 overflow-hidden flex flex-col relative text-white">
        
        {/* Top Header Bar */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-teal-400">
              <HeartPulse size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">{appointment.doctor}</h4>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Telehealth
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{appointment.specialty} • Session #{appointment.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Call Duration Counter */}
            <div className="px-3 py-1 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <Clock size={12} />
              <span>{formatCallTime(callDuration)}</span>
            </div>

            {/* Security Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/40 px-2.5 py-1 rounded-lg border border-slate-700/50">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>256-Bit Encrypted</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Stage Grid (Video Feed + Optional Chat) */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Main Video Stage */}
          <div className="flex-1 relative bg-slate-950 flex items-center justify-center overflow-hidden">
            
            {/* Remote Doctor Feed Background Graphic / Video Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-teal-500/40 p-1 bg-slate-800 flex items-center justify-center shadow-2xl overflow-hidden">
                  <User size={64} className="text-teal-300" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/40 text-xs font-bold text-teal-300 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                  <Volume2 size={12} className="text-teal-400 animate-pulse" />
                  <span>{appointment.doctor} (Speaking)</span>
                </div>
              </div>

              <div className="mt-8 text-center space-y-1">
                <h5 className="font-bold text-slate-200 text-base">Outpatient Telehealth Consultation</h5>
                <p className="text-xs text-slate-400">Audio and video streaming active via encrypted WebRTC channel</p>
              </div>
            </div>

            {/* Picture-in-Picture Local Camera Feed */}
            <div className="absolute top-4 right-4 w-40 sm:w-56 aspect-video bg-slate-800 rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden z-20">
              {isVideoOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 text-xs">
                  <VideoOff size={20} className="mb-1 text-slate-500" />
                  <span>Camera Off</span>
                </div>
              ) : cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/90 text-slate-300 text-xs">
                  <div className="w-10 h-10 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold mb-1">
                    {localStorage.getItem("name")?.slice(0, 2).toUpperCase() || "YOU"}
                  </div>
                  <span className="text-[10px] text-slate-400">Camera preview active</span>
                </div>
              )}
              
              <div className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded bg-slate-950/70 text-[10px] font-bold text-white">
                You {isMicMuted && "(Muted)"}
              </div>
            </div>

          </div>

          {/* Collapsible In-Call Chat Drawer */}
          {isChatOpen && (
            <div className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col z-20 animate-in slide-in-from-right-10 duration-150">
              
              <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-teal-400" />
                  <span className="font-bold text-xs text-white">Clinical In-Call Chat</span>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === "patient" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`p-2.5 rounded-2xl max-w-[85%] ${
                        msg.sender === "patient"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/60"
                      }`}
                    >
                      <p className="leading-snug">{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-slate-500 mt-0.5 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-1.5">
                <input
                  type="text"
                  placeholder="Type clinical note or question..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>

            </div>
          )}

        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">SmartHealth Virtual OPD Room</span>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3 rounded-2xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isMicMuted
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              }`}
              title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
              <span className="hidden sm:inline">{isMicMuted ? "Muted" : "Mute"}</span>
            </button>

            {/* Video Toggle */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3 rounded-2xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isVideoOff
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              }`}
              title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
            >
              {isVideoOff ? <VideoOff size={18} /> : <Video size={18} />}
              <span className="hidden sm:inline">{isVideoOff ? "Camera Off" : "Camera"}</span>
            </button>

            {/* Chat Drawer Toggle */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-3 rounded-2xl transition cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isChatOpen
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                  : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
              }`}
              title="Toggle In-Call Chat"
            >
              <MessageSquare size={18} />
              <span className="hidden sm:inline">Chat</span>
            </button>

            {/* End Call Button */}
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition cursor-pointer"
            >
              <PhoneOff size={18} />
              <span>Leave Consultation</span>
            </button>

          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden md:inline">EHR Auto-Synced</span>
          </div>

        </div>

      </div>

    </div>
  );
}

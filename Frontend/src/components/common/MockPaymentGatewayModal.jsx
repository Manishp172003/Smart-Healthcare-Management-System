import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  Clock,
  ArrowRight,
  RotateCcw,
  Building2,
  CreditCard,
  QrCode,
  Smartphone,
  Check,
  Loader2,
  Sparkles
} from "lucide-react";

export default function MockPaymentGatewayModal({
  isOpen,
  onClose,
  paymentMethod,
  amount = 1550,
  patientName = "Piyush Dahiwale",
  doctorName = "Dr. Ananya Sharma",
  clinicName = "SmartHealth Care Hospital",
  upiId = "piyush@oksbi",
  cardData = { cardNumber: "4532 8920 1192 8821", cardHolder: "PIYUSH DAHIWALE" },
  bankName = "HDFC Bank",
  onPaymentSuccess,
  onPaymentFailure
}) {
  const [gatewayStep, setGatewayStep] = useState("FORM"); // "FORM" | "PROCESSING" | "SUCCESS" | "FAILED"
  const [processingStage, setProcessingStage] = useState(1);
  const [otpValue, setOtpValue] = useState("123456");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for simulated UPI request
  useEffect(() => {
    if (!isOpen) {
      setGatewayStep("FORM");
      setProcessingStage(1);
      setErrorMessage("");
      setCountdown(60);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle successful payment simulation with authentic multistage progress
  const triggerSuccessSimulation = () => {
    setGatewayStep("PROCESSING");
    setProcessingStage(1);

    setTimeout(() => {
      setProcessingStage(2);
    }, 600);

    setTimeout(() => {
      setProcessingStage(3);
    }, 1200);

    setTimeout(() => {
      const generatedTxn = `TXN-${paymentMethod}-${Math.floor(10000000 + Math.random() * 90000000)}`;
      onPaymentSuccess({
        transactionId: generatedTxn,
        paymentMethod: paymentMethod,
        amount: amount,
        paidAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: "PAID"
      });
    }, 1800);
  };

  // Handle failure simulation
  const triggerFailureSimulation = () => {
    setGatewayStep("FAILED");
    setErrorMessage("Transaction Declined: Bank authorization server declined request or invalid credentials.");
    if (onPaymentFailure) {
      onPaymentFailure("Transaction declined by issuing bank.");
    }
  };

  const cardMasked = cardData.cardNumber
    ? `•••• ${cardData.cardNumber.replace(/\s+/g, "").slice(-4)}`
    : "•••• 8821";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Modal Container */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Gateway Brand Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-wide text-white">SmartHealth Pay</span>
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/30">
                  Test Gateway
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Order ID: #ORD-2026-{Math.floor(10000 + Math.random() * 90000)}</p>
            </div>
          </div>

          <div className="text-right flex items-center gap-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Amount</span>
              <span className="font-black text-emerald-400 text-base sm:text-lg">₹{amount.toLocaleString()}</span>
            </div>
            {gatewayStep !== "PROCESSING" && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
                title="Cancel & Close"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Clinical Reference Sub-Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="truncate min-w-0">
            <span className="text-slate-400">Consultation for:</span>{" "}
            <strong className="text-slate-800">{doctorName}</strong>
          </div>
          <span className="text-[11px] font-bold text-slate-500 shrink-0">Patient: {patientName}</span>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">

          {/* ============================================================ */}
          {/* STATE 1: PROCESSING / AUTHORIZING                            */}
          {/* ============================================================ */}
          {gatewayStep === "PROCESSING" && (
            <div className="py-8 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-50"></div>
                <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-500 flex items-center justify-center text-blue-600 shadow-inner">
                  <Loader2 size={32} className="animate-spin" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-black text-slate-900 text-base">Processing Secure Payment</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Please do not refresh the page or press back while we communicate with your bank.
                </p>
              </div>

              {/* Progress Milestones */}
              <div className="max-w-xs mx-auto space-y-2.5 text-xs text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${processingStage >= 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    ✓
                  </div>
                  <span className={processingStage >= 1 ? "font-bold text-slate-800" : "text-slate-400"}>
                    Contacting issuing payment network
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${processingStage >= 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    ✓
                  </div>
                  <span className={processingStage >= 2 ? "font-bold text-slate-800" : "text-slate-400"}>
                    Verifying 256-bit authorization token
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${processingStage >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    ✓
                  </div>
                  <span className={processingStage >= 3 ? "font-bold text-slate-800" : "text-slate-400"}>
                    Payment approved & booking slot locked!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STATE 2: FAILED / DECLINED                                   */}
          {/* ============================================================ */}
          {gatewayStep === "FAILED" && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-500 flex items-center justify-center mx-auto shadow-inner">
                <AlertCircle size={32} />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-black text-slate-900 text-lg">Transaction Failed</h3>
                <p className="text-xs text-red-600 max-w-sm mx-auto font-medium">{errorMessage}</p>
                <p className="text-[11px] text-slate-400 mt-1">No money was deducted from your account.</p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setGatewayStep("FORM")}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Retry Payment</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Change Method
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* STATE 3: INTERACTIVE GATEWAY SCREENS (UPI / CARD / NETBANKING)*/}
          {/* ============================================================ */}
          {gatewayStep === "FORM" && (
            <div className="space-y-5">

              {/* ----------------- UPI MODAL SCREEN ----------------- */}
              {paymentMethod === "UPI" && (
                <div className="space-y-5">
                  
                  {/* Active Collect Request Banner */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                        <Smartphone size={16} className="text-blue-600" />
                        <span>UPI Payment Request Dispatched</span>
                      </div>
                      <span className="text-[11px] font-mono font-black text-blue-600 bg-blue-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock size={11} />
                        00:{countdown.toString().padStart(2, "0")}s
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-blue-100 text-xs flex items-center justify-between">
                      <span className="text-slate-500">Requested from VPA:</span>
                      <strong className="text-slate-800 font-mono">{upiId || "patient@oksbi"}</strong>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-snug">
                      Open <strong>Google Pay</strong>, <strong>PhonePe</strong>, or <strong>Paytm</strong> on your phone and enter your 4 or 6-digit UPI PIN to approve the <strong>₹{amount}</strong> request.
                    </p>
                  </div>

                  {/* Demo Simulation Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block text-center">
                      Interactive Mock Gateway Actions
                    </span>
                    
                    <button
                      onClick={triggerSuccessSimulation}
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>Simulate Customer Approved in UPI App (Success)</span>
                    </button>

                    <button
                      onClick={triggerFailureSimulation}
                      className="w-full py-2 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Simulate Timeout / App Cancelled (Failure)</span>
                    </button>
                  </div>

                </div>
              )}

              {/* ----------------- CARD 3D SECURE OTP SCREEN ----------------- */}
              {paymentMethod === "CARD" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <CreditCard size={18} className="text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">3D Secure Authentication</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified by Visa</span>
                    </div>

                    <div className="text-xs space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>Card Number:</span>
                        <strong className="text-slate-800 font-mono">{cardMasked}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Merchant:</span>
                        <strong className="text-slate-800">SmartHealth Care Hospitals</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <strong className="text-blue-600 font-black">₹{amount.toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  {/* OTP Input Simulation */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <label className="font-bold text-slate-700">Enter One-Time Password (OTP)</label>
                      <span className="text-[11px] text-teal-600 font-semibold">Demo OTP: 123456</span>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 px-4 rounded-xl border border-slate-300 bg-white font-black text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                    <p className="text-[10px] text-slate-400 text-center">
                      OTP sent to registered mobile linked with card ending in {cardMasked.slice(-4)}.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={triggerSuccessSimulation}
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <Lock size={14} />
                      <span>Submit OTP & Authorize Payment (₹{amount})</span>
                    </button>

                    <button
                      onClick={triggerFailureSimulation}
                      className="w-full py-2 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Simulate Incorrect OTP / Bank Decline</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------- NET BANKING PORTAL SCREEN ----------------- */}
              {paymentMethod === "NET_BANKING" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between border-b border-blue-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-blue-700" />
                        <span className="text-xs font-bold text-blue-950">{bankName} Internet Banking</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active Gateway
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Customer ID</span>
                        <input
                          type="text"
                          readOnly
                          value="893240182"
                          className="w-full mt-1 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono font-bold outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">IPIN / Password</span>
                        <input
                          type="password"
                          readOnly
                          value="••••••••••••"
                          className="w-full mt-1 p-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* NetBanking Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={triggerSuccessSimulation}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>Simulate NetBanking Authorization (₹{amount})</span>
                    </button>

                    <button
                      onClick={triggerFailureSimulation}
                      className="w-full py-2 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Simulate NetBanking Session Timeout</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Gateway Security Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/90 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lock size={12} className="text-emerald-500" />
            <span>256-bit End-to-End Encryption</span>
          </div>
          <span className="font-semibold text-slate-500">RBI & PCI-DSS Level 1 Compliant</span>
        </div>

      </div>

    </div>
  );
}

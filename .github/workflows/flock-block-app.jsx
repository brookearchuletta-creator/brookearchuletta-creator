import { useState, useEffect } from "react";
import { Camera, Shield, MapPin, CheckCircle, AlertTriangle, Lock, Database, Zap } from "lucide-react";

export default function FlockBlockApp() {
  const [currentView, setCurrentView] = useState("landing");
  const [scanEffect, setScanEffect] = useState(0);
  const [optOutData, setOptOutData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    licensePlate: "", state: "", city: "", reason: "privacy"
  });
  const [jurisdictions, setJurisdictions] = useState([
    { city: "Salt Lake City, UT", status: "pending", cameras: 47 },
    { city: "Denver, CO", status: "not_submitted", cameras: 89 },
    { city: "Phoenix, AZ", status: "not_submitted", cameras: 156 },
    { city: "Las Vegas, NV", status: "not_submitted", cameras: 73 }
  ]);
  const [showPayMsg, setShowPayMsg] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setScanEffect(prev => (prev + 1) % 100), 50);
    return () => clearInterval(interval);
  }, []);

  const handleOptOut = (e) => {
    e.preventDefault();
    const match = jurisdictions.find(j => j.city.toLowerCase().includes(optOutData.city.toLowerCase()));
    if (match) {
      setJurisdictions(prev => prev.map(j => j.city === match.city ? { ...j, status: "submitted" } : j));
    }
    setCurrentView("dashboard");
  };

  const inputStyle = {
    width: "100%", padding: "0.75rem",
    background: "rgba(10,14,39,0.8)",
    border: "1px solid rgba(0,255,65,0.2)",
    borderRadius: "6px", color: "#e0e6ed",
    fontSize: "1rem", boxSizing: "border-box"
  };

  const labelStyle = {
    display: "block", marginBottom: "0.5rem",
    color: "#00ff41", fontSize: "0.85rem",
    fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)",
      color: "#e0e6ed",
      fontFamily: "'Inter', -apple-system, sans-serif",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "fixed", top: `${scanEffect}%`, left: 0, right: 0,
        height: "2px", background: "linear-gradient(90deg, transparent, #00ff41, transparent)",
        opacity: 0.3, pointerEvents: "none", zIndex: 1
      }} />
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
        backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <header style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid rgba(0,255,65,0.2)",
          backdropFilter: "blur(10px)",
          background: "rgba(10,14,39,0.8)"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{
                width: "48px", height: "48px",
                background: "linear-gradient(135deg, #ff0844, #ffb199)",
                borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", boxShadow: "0 0 20px rgba(255,8,68,0.4)"
              }}>
                <Camera size={24} style={{ color: "#fff" }} />
                <div style={{
                  position: "absolute", top: "-2px", right: "-2px",
                  width: "16px", height: "16px", background: "#00ff41",
                  borderRadius: "50%", border: "2px solid #0a0e27"
                }} />
              </div>
              <div>
                <h1 style={{
                  margin: 0, fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #00ff41, #00d4ff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>FLOCK BLOCK</h1>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#00ff41", fontFamily: "monospace", letterSpacing: "0.1em" }}>DNSMI PROTOCOL</p>
              </div>
            </div>
            <nav style={{ display: "flex", gap: "1.5rem" }}>
              {["landing", "optout", "dashboard"].map(v => (
                <button key={v} onClick={() => setCurrentView(v)} style={{
                  background: "none", border: "none",
                  color: currentView === v ? "#00ff41" : "#8892a6",
                  cursor: "pointer", fontSize: "0.9rem", fontWeight: 500
                }}>
                  {v === "landing" ? "Home" : v === "optout" ? "Opt-Out" : "Dashboard"}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* LANDING */}
        {currentView === "landing" && (
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{
                display: "inline-block", padding: "0.5rem 1rem",
                background: "rgba(255,8,68,0.1)", border: "1px solid rgba(255,8,68,0.3)",
                borderRadius: "100px", marginBottom: "2rem", fontSize: "0.85rem", color: "#ff0844", fontWeight: 500
              }}>
                <Lock size={14} style={{ display: "inline", marginRight: "0.5rem", verticalAlign: "middle" }} />
                LICENSE PLATE SURVEILLANCE OPT-OUT AUTOMATION
              </div>
              <h2 style={{ fontSize: "3.5rem", fontWeight: 800, margin: "0 0 1.5rem 0", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                Take Back Your{" "}
                <span style={{ background: "linear-gradient(135deg, #ff0844, #ffb199)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Privacy
                </span>
              </h2>
              <p style={{ fontSize: "1.25rem", color: "#8892a6", maxWidth: "600px", margin: "0 auto 2.5rem auto", lineHeight: 1.6 }}>
                Automatically opt-out of Flock Safety's license plate reader database. One click. Multiple jurisdictions. Complete privacy.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setShowPayMsg(true)} style={{
                  padding: "1rem 2.5rem", background: "linear-gradient(135deg, #00ff41, #00d4ff)",
                  border: "none", borderRadius: "8px", color: "#0a0e27", fontSize: "1rem", fontWeight: 700, cursor: "pointer"
                }}>
                  Get Started — $27
                </button>
                <button onClick={() => setCurrentView("optout")} style={{
                  padding: "1rem 2.5rem", background: "transparent",
                  border: "2px solid rgba(0,255,65,0.3)", borderRadius: "8px",
                  color: "#00ff41", fontSize: "1rem", fontWeight: 600, cursor: "pointer"
                }}>
                  See How It Works
                </button>
              </div>
              {showPayMsg && (
                <div style={{
                  marginTop: "1.5rem", padding: "1rem 1.5rem",
                  background: "rgba(0,255,65,0.1)", border: "1px solid rgba(0,255,65,0.3)",
                  borderRadius: "8px", color: "#00ff41", fontSize: "0.95rem"
                }}>
                  ✓ Payment link goes here — paste your Stripe URL into the code and this button goes live!
                </div>
              )}
            </div>

            {/* Features */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginTop: "4rem" }}>
              {[
                { icon: <Zap size={24} />, title: "Instant Opt-Out", desc: "Automated form submission to Flock Safety portals across multiple cities" },
                { icon: <MapPin size={24} />, title: "Multi-Jurisdiction", desc: "Track and manage opt-outs in every city where Flock operates" },
                { icon: <Shield size={24} />, title: "CCPA Compliant", desc: 'Legally-backed "Do Not Sell My Info" requests under California privacy law' },
                { icon: <Database size={24} />, title: "Status Tracking", desc: "Dashboard showing submission status, confirmation, and ongoing monitoring" }
              ].map((f, i) => (
                <div key={i} style={{
                  padding: "2rem", background: "rgba(26,31,58,0.6)",
                  border: "1px solid rgba(0,255,65,0.1)", borderRadius: "12px", backdropFilter: "blur(10px)"
                }}>
                  <div style={{
                    width: "48px", height: "48px", background: "rgba(0,255,65,0.1)",
                    borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#00ff41", marginBottom: "1rem"
                  }}>{f.icon}</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.75rem 0", color: "#e0e6ed" }}>{f.title}</h3>
                  <p style={{ margin: 0, color: "#8892a6", lineHeight: 1.6, fontSize: "0.95rem" }}>{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Steps */}
            <div style={{ marginTop: "6rem", textAlign: "center" }}>
              <h3 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "3rem" }}>How It Works</h3>
              <div style={{ display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap" }}>
                {[
                  { step: "01", title: "Enter Your Info", desc: "License plate, location, contact details" },
                  { step: "02", title: "Auto-Submit", desc: "We file CCPA opt-out requests for you" },
                  { step: "03", title: "Track Status", desc: "Dashboard shows submission confirmations" }
                ].map((s, i) => (
                  <div key={i} style={{ maxWidth: "200px" }}>
                    <div style={{
                      fontSize: "3rem", fontWeight: 900,
                      background: "linear-gradient(135deg, #ff0844, #ffb199)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem"
                    }}>{s.step}</div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#e0e6ed" }}>{s.title}</h4>
                    <p style={{ color: "#8892a6", margin: 0, lineHeight: 1.5, fontSize: "0.9rem" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OPT-OUT FORM */}
        {currentView === "optout" && (
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "4rem 2rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>Submit Opt-Out</h2>
            <p style={{ color: "#8892a6", fontSize: "1.1rem", margin: "0 0 2.5rem 0" }}>Your information is encrypted and only used for opt-out submissions.</p>
            <form onSubmit={handleOptOut} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" required value={optOutData.firstName} onChange={e => setOptOutData({ ...optOutData, firstName: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" required value={optOutData.lastName} onChange={e => setOptOutData({ ...optOutData, lastName: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" required value={optOutData.email} onChange={e => setOptOutData({ ...optOutData, email: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>License Plate</label>
                <input type="text" required value={optOutData.licensePlate} onChange={e => setOptOutData({ ...optOutData, licensePlate: e.target.value.toUpperCase() })} placeholder="ABC1234" style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.1em" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input type="text" required value={optOutData.city} onChange={e => setOptOutData({ ...optOutData, city: e.target.value })} placeholder="Salt Lake City" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>State</label>
                  <select required value={optOutData.state} onChange={e => setOptOutData({ ...optOutData, state: e.target.value })} style={inputStyle}>
                    <option value="">--</option>
                    {["UT","CO","AZ","NV","CA","TX","FL","WA","OR","ID"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Opt-Out Reason</label>
                <select value={optOutData.reason} onChange={e => setOptOutData({ ...optOutData, reason: e.target.value })} style={inputStyle}>
                  <option value="privacy">Privacy Concerns</option>
                  <option value="ccpa">CCPA — Do Not Sell My Info</option>
                  <option value="surveillance">Anti-Surveillance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" style={{
                marginTop: "1rem", padding: "1rem 2rem",
                background: "linear-gradient(135deg, #00ff41, #00d4ff)",
                border: "none", borderRadius: "8px", color: "#0a0e27",
                fontSize: "1.1rem", fontWeight: 700, cursor: "pointer"
              }}>
                Submit Opt-Out Request
              </button>
            </form>
          </div>
        )}

        {/* DASHBOARD */}
        {currentView === "dashboard" && (
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "4rem 2rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>Your Opt-Out Status</h2>
            <p style={{ color: "#8892a6", fontSize: "1.1rem", margin: "0 0 2.5rem 0" }}>Track submissions across all Flock jurisdictions</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { label: "Submitted", value: jurisdictions.filter(j => j.status === "submitted").length, color: "#00ff41", bg: "rgba(0,255,65,0.1)", border: "rgba(0,255,65,0.3)" },
                { label: "Pending", value: jurisdictions.filter(j => j.status === "pending").length, color: "#ffb800", bg: "rgba(255,184,0,0.1)", border: "rgba(255,184,0,0.3)" },
                { label: "Total Cameras", value: jurisdictions.reduce((s, j) => s + j.cameras, 0), color: "#8892a6", bg: "rgba(136,146,166,0.1)", border: "rgba(136,146,166,0.3)" }
              ].map((stat, i) => (
                <div key={i} style={{ padding: "1.5rem", background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: "12px" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  <div style={{ color: "#8892a6", fontSize: "0.9rem", marginTop: "0.5rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(26,31,58,0.6)", border: "1px solid rgba(0,255,65,0.1)", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(0,255,65,0.1)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem", fontSize: "0.85rem", fontWeight: 600, color: "#00ff41", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <div>Jurisdiction</div><div>Cameras</div><div>Status</div>
              </div>
              {jurisdictions.map((j, i) => (
                <div key={i} style={{ padding: "1.5rem", borderBottom: i < jurisdictions.length - 1 ? "1px solid rgba(0,255,65,0.05)" : "none", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <MapPin size={18} style={{ color: "#00ff41" }} />
                    <span style={{ fontWeight: 500 }}>{j.city}</span>
                  </div>
                  <div style={{ color: "#8892a6" }}>{j.cameras} cameras</div>
                  <div>
                    {j.status === "submitted" && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", background: "rgba(0,255,65,0.1)", border: "1px solid rgba(0,255,65,0.3)", borderRadius: "100px", fontSize: "0.85rem", color: "#00ff41", fontWeight: 600 }}><CheckCircle size={14} /> Submitted</span>}
                    {j.status === "pending" && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", background: "rgba(255,184,0,0.1)", border: "1px solid rgba(255,184,0,0.3)", borderRadius: "100px", fontSize: "0.85rem", color: "#ffb800", fontWeight: 600 }}><AlertTriangle size={14} /> Pending</span>}
                    {j.status === "not_submitted" && <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.8rem", background: "rgba(136,146,166,0.1)", border: "1px solid rgba(136,146,166,0.3)", borderRadius: "100px", fontSize: "0.85rem", color: "#8892a6", fontWeight: 600 }}>Not Started</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer style={{ marginTop: "6rem", padding: "2rem", borderTop: "1px solid rgba(0,255,65,0.1)", textAlign: "center", color: "#8892a6", fontSize: "0.9rem" }}>
          <p style={{ margin: 0 }}>© 2026 Bzzzenterprizes & Keegan Brooke Company</p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem" }}>DNSMI Protocol — Do Not Sell My Info | Privacy-First Technology</p>
        </footer>
      </div>
    </div>
  );
}

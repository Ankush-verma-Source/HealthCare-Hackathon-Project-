import { useState, useEffect, useRef } from "react";
import { Heart, Pill, Activity, Camera, Menu, X, Bell, LogOut, Stethoscope, User, ClipboardList, Calendar, ChevronDown, Send, Paperclip, MessageCircle } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

export default function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const patientName = "John Doe";

  const navItems = [
    { name: "Dashboard" },
    { name: "Daily Log" },
    { name: "AI Insights" },
    { name: "Reports" },
    { name: "Chat with Doctor" },
    { name: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 md:w-64"}
        bg-white shadow-md fixed top-0 left-0 h-screen z-20 transition-all duration-300 overflow-hidden flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Stethoscope className="text-blue-500" />
              <span className="font-bold text-lg">HealthTrack</span>
            </div>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`block w-full text-left px-4 py-2 rounded-xl transition ${
                  activeNav === item.name
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 text-sm text-gray-600 flex justify-between">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Support</a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
              <User size={18} className="text-gray-600" />
            </div>
            <button className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Conditional Rendering for Pages */}
        <main className="p-4 space-y-6">
          {activeNav === "Dashboard" && (
            <DashboardPage patientName={patientName} />
          )}

          {activeNav === "Daily Log" && <DailyLogPage />}

          {activeNav === "Chat with Doctor" && <ChatWithDoctorPage />}
        </main>
      </div>
    </div>
  );
}

function DashboardPage({ patientName }) {
  return (
    <>
      <h1 className="text-2xl font-semibold">Welcome, {patientName}</h1>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Heart className="text-red-500" />} title="Pain Level" value="4/10" />
        <StatCard icon={<Pill className="text-green-500" />} title="Last Medication" value="Ibuprofen @ 10:30am" />
        <StatCard icon={<Activity className="text-blue-500" />} title="Steps Today" value="3,245" />
        <StatCard icon={<Camera className="text-purple-500" />} title="Wound Photo" value="Aug 28, 2025" />
      </div>
      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PlaceholderCard title="Pain Level Trend (7 days)" />
        <PlaceholderCard title="Steps Progress" />
      </div>
      {/* Notifications Panel */}
      <div>
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Bell className="text-blue-500" /> Notifications & Reminders
        </h2>
        <div className="bg-white p-4 rounded-2xl shadow space-y-2">
          <div className="p-3 bg-blue-50 rounded-xl">Take Antibiotic at 6:00 PM</div>
          <div className="p-3 bg-green-50 rounded-xl">Doctor's Note: Rest more today</div>
        </div>
      </div>
    </>
  );
}

function DailyLogPage() {
  const [painLevel, setPainLevel] = useState(5);
  const [medication, setMedication] = useState("");
  const [time, setTime] = useState("");
  const [photo, setPhoto] = useState(null);
  const [steps, setSteps] = useState("");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!painLevel || !medication || !time || !photo) return alert("Please fill all required fields.");
    const newLog = { date: new Date().toLocaleDateString(), painLevel, medication, time, photo, steps, notes };
    setLogs([newLog, ...logs]);
    setPainLevel(5);
    setMedication("");
    setTime("");
    setPhoto(null);
    setSteps("");
    setNotes("");
  };

  const handleReset = () => {
    setPainLevel(5);
    setMedication("");
    setTime("");
    setPhoto(null);
    setSteps("");
    setNotes("");
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <ClipboardList className="text-blue-500" /> Daily Health Log
      </div>
      {/* Date Selector */}
      <div className="flex items-center gap-2 text-gray-600">
        <Calendar size={18} />
        <div className="px-3 py-1 bg-gray-100 rounded-lg">{new Date().toLocaleDateString()}</div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        {/* Pain Level */}
        <div>
          <label className="block font-medium mb-2">Pain Level: {painLevel}/10</label>
          <input type="range" min="1" max="10" value={painLevel} onChange={(e) => setPainLevel(e.target.value)} className="w-full" />
        </div>

        {/* Medication Intake */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Medication</label>
            <select value={medication} onChange={(e) => setMedication(e.target.value)} className="w-full p-2 border rounded-xl">
              <option value="">Select medication</option>
              <option value="Ibuprofen">Ibuprofen</option>
              <option value="Paracetamol">Paracetamol</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Time</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-2 border rounded-xl" />
          </div>
        </div>

        {/* Wound Photo Upload */}
        <div>
          <label className="block font-medium mb-2">Wound Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="mb-2" />
          {photo && <img src={photo} alt="preview" className="w-24 h-24 object-cover rounded-xl shadow" />}
        </div>

        {/* Mobility Progress */}
        <div>
          <label className="block font-medium mb-2">Steps / Exercise</label>
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Steps today" className="w-full p-2 border rounded-xl" />
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium mb-2">Additional Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Sleep quality, dizziness, etc." className="w-full p-2 border rounded-xl"></textarea>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition">Save Log</button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition">Reset Form</button>
        </div>
      </div>

      {/* Recent Logs */}
      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Recent Logs</h2>
        <div className="space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                <div>
                  <p className="font-medium">{log.date}</p>
                  <p className="text-sm text-gray-600">Pain Level: {log.painLevel}/10 | Medication: {log.medication} @ {log.time} | Steps: {log.steps}</p>
                </div>
                {/* <ChevronDown className={transition-transform ${expanded === idx ? "rotate-180" : ""}} /> */}
              </div>
              {expanded === idx && (
                <div className="mt-3 space-y-2 animate-fadeIn">
                  {log.photo && <img src={log.photo} alt="wound" className="w-32 h-32 object-cover rounded-xl shadow" />}
                  {log.notes && <p className="text-gray-700">Notes: {log.notes}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ChatWithDoctorPage() {
  const [messages, setMessages] = useState([
    { sender: "doctor", text: "Hello John, how are you feeling today?", time: "10:00 AM" },
    { sender: "patient", text: "I’m feeling better, less pain than yesterday.", time: "10:02 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { sender: "patient", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-blue-50">
        <div className="flex items-center gap-3">
          <img src="https://via.placeholder.com/40" alt="Doctor" className="w-10 h-10 rounded-full" />
          <div>
            <h2 className="font-semibold">Dr. Smith – Cardiologist</h2>
            <p className="text-sm text-green-500">🟢 Online</p>
          </div>
        </div>
        <MessageCircle className="text-blue-500" />
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`max-w-xs md:max-w-sm p-3 rounded-xl shadow ${
                msg.sender === "patient"
                  ? "ml-auto bg-green-100"
                  : "mr-auto bg-blue-100"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 p-3 border-t bg-white">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Paperclip />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-xl focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition transform hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderCard({ title }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-center text-gray-400 italic">
      {title} (Chart Coming Soon)
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  Calendar,
  MessageSquare,
  Activity,
  Users,
  Bell,
  Settings,
  Paperclip,
  Send,
  Search,
} from "lucide-react";
import PatientListPage from "./PatientListPage";
// Navbar Component
function Navbar() {
  return (
    <div className="flex items-center justify-between bg-blue-600 text-white p-4 shadow-md">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Activity className="w-6 h-6" />
        <span>HealthTrack</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <button className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded-lg shadow hover:bg-gray-100 transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}

// Sidebar Component (fixed, full height)
function Sidebar({ current, setCurrent }) {
  const links = [
    { name: "Dashboard", icon: Activity },
    { name: "Patient List", icon: Users },
    { name: "Reports", icon: Calendar },
    { name: "Messages", icon: MessageSquare },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-white shadow-md p-6 w-64 flex flex-col justify-between h-screen fixed top-0 left-0">
      <div className="mt-20 flex flex-col gap-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => setCurrent(link.name)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left transition hover:bg-blue-50 ${
              current === link.name
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.name}</span>
          </button>
        ))}
      </div>
      <div className="text-gray-500 text-sm border-t pt-4">
        <a href="#" className="block mb-2 hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="block hover:underline">
          Support
        </a>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-4"
    >
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </motion.div>
  );
}

// Patient Table Component
function PatientTable({ patients }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-3">Patient List Preview</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Last Log</th>
            <th className="p-2">Alert Level</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <motion.tr
              key={idx}
              whileHover={{ backgroundColor: "#f0f9ff" }}
              className="border-b cursor-pointer"
            >
              <td className="p-2">{p.name}</td>
              <td className="p-2">
                <span
                  className={
                    p.status === "Stable"
                      ? "text-green-600"
                      : p.status === "Moderate"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                >
                  {p.status}
                </span>
              </td>
              <td className="p-2">{p.lastLog}</td>
              <td className="p-2">{p.alert}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Notifications Panel
function NotificationsPanel({ notifications }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" /> Notifications
      </h3>
      <ul className="space-y-2">
        {notifications.map((note, idx) => (
          <li key={idx} className="p-2 bg-gray-50 rounded-lg shadow-sm text-sm">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message }) {
  const isDoctor = message.sender === "doctor";
  return (
    <div className={`flex ${isDoctor ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-2xl shadow ${
          isDoctor ? "bg-green-100 text-gray-800" : "bg-blue-100 text-gray-800"
        }`}
      >
        <p>{message.text}</p>
        <p className="text-xs text-gray-500 mt-1">{message.time}</p>
      </div>
    </div>
  );
}

// Message Input Component
function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t bg-white">
      <button className="p-2 text-gray-500 hover:text-blue-600">
        <Paperclip className="w-5 h-5" />
      </button>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

// Conversation List Component
function ConversationList({ conversations, selectConversation, selectedId }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          placeholder="Search patient by name"
          className="flex-1 border rounded-full px-3 py-1 text-sm focus:outline-none"
        />
      </div>
      <ul className="space-y-2">
        {conversations.map((conv) => (
          <li
            key={conv.id}
            onClick={() => selectConversation(conv.id)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition hover:bg-blue-50 ${
              selectedId === conv.id ? "bg-blue-100" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{conv.name}</p>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
            {conv.unread > 0 && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                {conv.unread}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Chat Window Component
function ChatWindow({ conversation, sendMessage }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <div className="bg-white shadow-md rounded-2xl flex flex-col h-full">
      {conversation ? (
        <>
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{conversation.name}</p>
              <p className="text-sm text-gray-500">
                {conversation.online ? "🟢 Online" : "🔴 Offline"}
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {conversation.messages.map((m, idx) => (
              <MessageBubble key={idx} message={m} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput onSend={sendMessage} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
}

// Main Dashboard Page
export default function DoctorDashboard() {
  const [current, setCurrent] = useState("Dashboard");
  const doctorName = "Smith";

  const patients = [
    {
      name: "John Doe",
      status: "Critical",
      lastLog: "2025-08-29",
      alert: "High",
    },
    {
      name: "Jane Roe",
      status: "Moderate",
      lastLog: "2025-08-28",
      alert: "Medium",
    },
    { name: "Sam Lee", status: "Stable", lastLog: "2025-08-30", alert: "Low" },
  ];

  const notifications = [
    "John Doe reported high pain level",
    "Reminder: Appointment with Jane Roe at 2 PM",
    "System update scheduled tonight",
  ];

  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Doctor, I'm feeling better today.",
      unread: 2,
      online: true,
      messages: [
        {
          sender: "patient",
          text: "Doctor, I'm feeling better today.",
          time: "10:00 AM",
        },
        {
          sender: "doctor",
          text: "That's great to hear! Keep resting.",
          time: "10:05 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Roe",
      lastMessage: "Should I adjust my dosage?",
      unread: 1,
      online: false,
      messages: [
        {
          sender: "patient",
          text: "Should I adjust my dosage?",
          time: "9:45 AM",
        },
      ],
    },
  ]);

  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const sendMessage = (text) => {
    if (!selectedConversationId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConversationId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { sender: "doctor", text, time: "Now" },
              ],
              lastMessage: text,
              unread: 0,
            }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar current={current} setCurrent={setCurrent} />
        <main className="flex-1 p-6 ml-64">
          {current === "Dashboard" && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Doctor Greeting */}
              <div className="lg:col-span-3 text-left text-xl font-semibold text-gray-800">
                Welcome, Dr. {doctorName}
              </div>

              {/* Stats Cards */}
              <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Patients"
                  value={120}
                  icon={Users}
                  color="bg-blue-500"
                />
                <StatsCard
                  title="Attention Needed"
                  value={5}
                  icon={Activity}
                  color="bg-red-500"
                />
                <StatsCard
                  title="Today's Appointments"
                  value={8}
                  icon={Calendar}
                  color="bg-green-500"
                />
                <StatsCard
                  title="Messages Waiting"
                  value={12}
                  icon={MessageSquare}
                  color="bg-yellow-500"
                />
              </div>

              {/* Patient Table */}
              <div className="lg:col-span-2">
                <PatientTable patients={patients} />
              </div>

              {/* Notifications Panel */}
              <NotificationsPanel notifications={notifications} />
            </div>
          )}

          {current === "Messages" && (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 h-[80vh]">
              <div className="lg:col-span-1">
                <ConversationList
                  conversations={conversations}
                  selectConversation={setSelectedConversationId}
                  selectedId={selectedConversationId}
                />
              </div>
              <div className="lg:col-span-2">
                <ChatWindow
                  conversation={selectedConversation}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          )}
          {current === "Patient List" && (
            <PatientListPage patients={patients} />
          )}
        </main>
      </div>
    </div>
  );
}

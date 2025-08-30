import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { User, Users, Search } from "lucide-react";

function SearchFilterBar({ search, setSearch, filter, setFilter, sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-md mb-6">
      <div className="flex items-center gap-2 w-full sm:w-1/3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patient by name or ID"
          className="flex-1 border rounded-lg px-3 py-1"
        />
      </div>
      <div className="flex gap-4">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-lg px-2 py-1">
          <option value="">All Status</option>
          <option value="Stable">Stable</option>
          <option value="Moderate">Moderate</option>
          <option value="Critical">Critical</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg px-2 py-1">
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="lastLog">Last Log</option>
        </select>
      </div>
    </div>
  );
}

export default function PatientListPage({ patients }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  let filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );
  if (filter) filtered = filtered.filter((p) => p.status === filter);
  if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "lastLog") filtered.sort((a, b) => new Date(b.lastLog) - new Date(a.lastLog));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Users className="w-6 h-6 text-blue-600" /> Patient List
      </h2>
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        {/* Desktop Table */}
        <table className="w-full text-left border-collapse hidden md:table">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-2">Patient</th>
              <th className="p-2">Age/Gender</th>
              <th className="p-2">Last Log</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, idx) => (
              <motion.tr key={idx} whileHover={{ scale: 1.01 }} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  {p.name}
                </td>
                <td className="p-2">{p.age} / {p.gender}</td>
                <td className="p-2">{p.lastLog}</td>
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
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600 hover:underline">View Details</button>
                  <button className="text-green-600 hover:underline">📩</button>
                  <button className="text-purple-600 hover:underline">📊</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden p-4">
          {filtered.map((p, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.01 }} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.age} / {p.gender}</p>
                </div>
              </div>
              <p className="text-sm">Last Log: {p.lastLog}</p>
              <p className="text-sm mb-2">
                Status:{" "}
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
              </p>
              <div className="flex gap-3 text-sm">
                <button className="text-blue-600 hover:underline">View Details</button>
                <button className="text-green-600 hover:underline">📩</button>
                <button className="text-purple-600 hover:underline">📊</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
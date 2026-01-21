import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Edit,
  Trash2,
  Mail,
  Bell,
  Download,
} from "lucide-react";
import EditUserForm from "./EditUser";
import adminApi from "../services/adminApi";

const ITEMS_PER_PAGE = 5;

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* =========================
     FETCH USERS
  ========================= */
  const fetchUsers = async () => {
    try {
      const res = await adminApi.get("/customers");
      setUsers(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await adminApi.get("/customers", {
          signal: controller.signal,
        });
        setUsers(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return; // Ignore aborted request
        }
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => controller.abort();   // <-- prevents DISCONNECTED error
  }, []);


  /* =========================
     UPDATE USER
  ========================= */
  const handleSaveUser = async (updatedUser) => {
    try {
      await adminApi.put(`/customers/${updatedUser._id}`, updatedUser);

      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      setSelectedUser(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  /* =========================
     DELETE USER
  ========================= */
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await adminApi.delete(`/customers/${userId}`);

      setUsers((prev) => {
        const updated = prev.filter((u) => u._id !== userId);

        if ((currentPage - 1) * ITEMS_PER_PAGE >= updated.length) {
          setCurrentPage((p) => Math.max(p - 1, 1));
        }
        return updated;
      });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* =========================
     FILTER USERS
  ========================= */
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.phoneNumber?.includes(term) ||
        u.birthPlace?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* =========================
     EXPORT CSV
  ========================= */
  const handleExport = () => {
    const headers = ["Name", "Phone Number", "Date Of Birth", "Birth Place"];
    const rows = filteredUsers.map((u) => [
      u.name,
      u.phoneNumber,
      u.dateOfBirth || "",
      u.birthPlace || "",
    ]);

    const csvContent =
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading users...</div>;
  }

  return (
    <div className="flex-1 bg-gray-50 p-6">
      {/* TOP BAR */}
      <div className="p-4 mb-6 flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, phone, place"
            className="w-full pl-10 py-2 border rounded-md text-sm"
          />
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
          >
            <Download size={16} /> Export
          </button>
          <Mail className="w-6 h-6 text-gray-600" />
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex gap-6">
        <div
          className={`bg-white rounded-lg shadow-sm ${selectedUser ? "w-[600px]" : "w-full"
            }`}
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Customers</h2>
            <p className="text-sm text-gray-500">User Data</p>
          </div>

          <table className="w-full">
            <tbody className="divide-y">
              {paginatedUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.dateOfBirth || "—"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.birthPlace || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="flex justify-between items-center p-4 text-sm">
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* EDIT PANEL */}
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onSave={handleSaveUser}
            onDelete={() => handleDeleteUser(selectedUser._id)}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </main>
    </div>
  );
}

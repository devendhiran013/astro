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
import EditUserForm from "./modals/EditUserModal";
import adminApi from "../services/adminApi";

const ITEMS_PER_PAGE = 5;

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await adminApi.get("/customers", {
          signal: controller.signal,
        });
        setUsers(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        if (err.name !== "CanceledError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.phoneNumber?.includes(term) ||
        u.birthPlace?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

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

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await adminApi.delete(`/customers/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Phone", "DOB", "Birth Place"];
    const rows = filteredUsers.map((u) => [
      u.name,
      u.phoneNumber,
      u.dateOfBirth || "",
      u.birthPlace || "",
    ]);
    const csv = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
  };

  if (loading) return <div className="p-6">Loading users…</div>;

  return (
    <div className="flex-1 bg-[#EEF5F9] p-4 md:p-6 relative">

      {/* ---------------------- HEADER ---------------------- */}
      <div className="flex flex-col gap-4 mb-6 mt-6">

        {/* Search Row */}
        <div className="flex items-center gap-4">

          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search users"
              className="w-full pl-10 py-2 rounded-xl bg-white border text-sm shadow-sm"
            />
          </div>

          {/* Mail */}
          <div className="relative bg-white p-2 rounded-xl shadow cursor-pointer">
            <Mail className="text-gray-700 w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1 rounded-full border-2 border-white">
              2
            </span>
          </div>

          {/* Bell */}
          <div className="relative bg-white p-2 rounded-xl shadow cursor-pointer">
            <Bell className="text-gray-700 w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Export */}
        <button
          onClick={handleExport}
          className="bg-white w-12 h-12 rounded-xl shadow flex items-center justify-center"
        >
          <Download size={18} className="text-gray-600" />
        </button>
      </div>

      {/* ---------------------- TITLE ---------------------- */}
      <h2 className="text-lg font-semibold mb-4 ml-1">Recent customers</h2>

      {/* ---------------------- MOBILE LIST ---------------------- */}
      <div className="space-y-4 md:hidden">
        {paginatedUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">

              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.phoneNumber}</p>
                {/* <p className="text-gray-400 text-xs">{user.birthPlace}</p> */}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedUser(user)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="p-2 rounded-full bg-red-50"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------- MOBILE PAGINATION ---------------------- */}
      <div className="flex justify-between items-center mt-6 md:hidden px-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-40"
        >
          Previous
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* ---------------------- DESKTOP TABLE ---------------------- */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm w-full">
        <table className="w-full">
          <tbody className="divide-y">
            {paginatedUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-gray-600 mr-4" />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      {/* <div className="text-gray-500 text-sm">
                        {user.dateOfBirth || "—"}
                      </div> */}
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
                    {/* <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------------- DESKTOP PAGINATION ---------------------- */}
      <div className="hidden md:flex justify-between items-center mt-6 px-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg shadow disabled:opacity-40"
        >
          Next
        </button>
      </div>


      {/* ---------------------- EDIT POPUP ---------------------- */}
      {/* {selectedUser && (
        <> */}
      {/* Dark Overlay */}
      {/* <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelectedUser(null)}
          /> */}

      {/* CENTERED POPUP FOR ALL SCREENS */}
      {/* <div
            className="
        fixed z-50
        left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2
        bg-white rounded-2xl shadow-2xl
        p-6 w-[90%] max-w-sm
      "
            style={{ animation: 'popupFade 0.2s ease-out' }}
          >
            <EditUserForm
              user={selectedUser}
              onSave={handleSaveUser}
              onDelete={() => handleDeleteUser(selectedUser._id)}
              onClose={() => setSelectedUser(null)}
            />
          </div> */}
      {/* </>
      )} */}


    </div>
  );
}

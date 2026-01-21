"use client";

import { useEffect, useState } from "react";
import { Search, Mail, Bell, Download, ChevronDown, Info } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import adminApi from "../services/adminApi";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("12 Months");
  const [stats, setStats] = useState({ totalSales: 0, totalRequests: 0, totalOrders: 0, totalUsers: 0 });
  const [insights, setInsights] = useState({ totalSales: 0, totalRequests: 0, totalOrders: 0, totalCustomers: 0 });
  const [salesReport, setSalesReport] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [userStats, setUserStats] = useState({ activeUsers: 0, repeatedUsers: 0 });

  useEffect(() => {
    const controller = new AbortController();

    const fetchDashboard = async () => {
      try {
        const [summary, ins, sales, prod, user] = await Promise.all([
          adminApi.get("/dashboard/summary", { signal: controller.signal }),
          adminApi.get("/dashboard/insights", { signal: controller.signal }),
          adminApi.get("/dashboard/sales-report", { signal: controller.signal }),
          adminApi.get("/dashboard/product-sales", { signal: controller.signal }),
          adminApi.get("/dashboard/user-stats", { signal: controller.signal }),
        ]);

        setStats(summary.data.data);
        setInsights(ins.data.data);
        setSalesReport(sales.data.data);
        setProductSales(prod.data.data);
        setUserStats(user.data.data);
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return; // ignore aborted
        }
        console.error("Fetch failed", err);
      }
    };

    fetchDashboard();

    return () => controller.abort(); // 🔥 Fix for mobile navigation error
  }, []);


  const fetchSalesReport = async (period) => {
    try {
      const res = await adminApi.get(`/dashboard/sales-report?period=${period}`);
      setSalesReport(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInsights = async (period) => {
    try {
      const res = await adminApi.get(`/dashboard/insights?period=${period}`);
      setInsights(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };



  const colors = ["#2563eb", "#9333ea", "#ec4899", "#06b6d4", "#10b981", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-8 font-sans">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 ring-blue-100" placeholder="Type to search" />
        </div>
        <div className="flex gap-6 items-center">
          <div className="relative cursor-pointer">
            <Mail className="text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">2</span>
          </div>
          <div className="relative cursor-pointer">
            <Bell className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
          </div>
        </div>
      </header>

      {/* TOP STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: "TOTAL SALE", val: `₹${stats.totalSales.toLocaleString()}`, color: "text-green-500", pct: "+36%" },
          { label: "TOTAL REQUEST", val: stats.totalRequests, color: "text-red-500", pct: "+14%", down: true },
          { label: "TOTAL ORDERS", val: stats.totalOrders, color: "text-green-500", pct: "+36%" },
          { label: "TOTAL USERS", val: stats.totalUsers, color: "text-green-500", pct: "+36%" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2">{item.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-bold">{item.val}</h2>
              <span className={`${item.color} text-xs font-bold mb-1`}>{item.pct} {item.down ? '↓' : '↑'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* MAIN CHART */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-800">Sales Report</h3>
            <div className="flex gap-4">
              <div className="bg-gray-50 p-1 rounded-xl flex gap-1">
                {["12 Months", "6 Months", "30 Days", "7 Days"].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedPeriod(t);

                      const map = {
                        "12 Months": "12m",
                        "6 Months": "6m",
                        "30 Days": "30d",
                        "7 Days": "7d",
                      };

                      fetchSalesReport(map[t]);
                    }}
                    className={`px-4 py-1.5 text-xs rounded-lg transition ${selectedPeriod === t ? 'bg-white shadow-md font-bold' : 'text-gray-400'
                      }`}
                  >
                    {t}
                  </button>
                ))}

              </div>
              <button className="flex items-center gap-2 border px-4 py-1.5 rounded-xl text-xs font-bold"><Download size={14} /> Export PDF</button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesReport}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INSIGHTS BARS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Insights</h3>
            <button
              onClick={() => fetchInsights("30d")}
              className="text-xs text-gray-400 flex items-center gap-1"
            >
              Last 30 Days
            </button>

            <button
              onClick={() => fetchInsights("6m")}
              className="text-xs text-gray-400 flex items-center gap-1"
            >
              Last 6 Months
            </button>

            <button
              onClick={() => fetchInsights("12m")}
              className="text-xs text-gray-400 flex items-center gap-1"
            >
              Last 12 Months
            </button>

          </div>
          <div className="space-y-6">
            {[
              { label: "Total Sales", val: insights.totalSales, w: '100%' },
              { label: "Total Request", val: insights.totalRequests, w: '85%' },
              { label: "Total Orders", val: insights.totalOrders, w: '45%' },
              { label: "Total customers", val: insights.totalCustomers, w: '25%' }
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-gray-500">{row.label}</span>
                  <span>{row.val.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: row.w }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 font-bold mb-1">Product Sales Report</p>
              <h2 className="text-2xl font-bold">₹{stats.totalSales.toLocaleString()}</h2>
              <p className="text-xs text-gray-400 mt-1">Insights</p>
            </div>
            <Info size={18} className="text-gray-300" />
          </div>

          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full border-[16px] border-blue-500 border-t-purple-500 border-r-pink-500 relative">
              {/* Simplified Donut logic */}
            </div>
            <div className="space-y-1 text-[10px] font-bold text-gray-500">
              {productSales.slice(0, 6).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors[i] }}></div>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CIRCULAR PROGRESS CARDS */}
        {['Active users', 'Repeated users'].map((label, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="50" stroke="#f3f4f6" strokeWidth="10" fill="transparent" />
                <circle cx="64" cy="64" r="50" stroke={i === 0 ? "#f97316" : "#a855f7"} strokeWidth="10"
                  strokeDasharray={314} strokeDashoffset={314 - (314 * (i === 0 ? userStats.activeUsers : userStats.repeatedUsers) / 100)}
                  strokeLinecap="round" fill="transparent" />
              </svg>
              <span className="absolute text-2xl font-bold">
                {i === 0 ? userStats.activeUsers : userStats.repeatedUsers}%
              </span>
            </div>
            <p className="text-sm font-bold text-gray-500">{label} report</p>
          </div>
        ))}
      </div>
    </div>
  );
}
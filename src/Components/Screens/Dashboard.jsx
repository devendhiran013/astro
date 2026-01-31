"use client";

import { useEffect, useState } from "react";
import { Search, Mail, Bell, Download, Info } from "lucide-react";
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from "recharts";
import adminApi from "../services/adminApi";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("12 Months");
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRequests: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  const [insights, setInsights] = useState({
    totalSales: 0,
    totalRequests: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  const [salesReport, setSalesReport] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [userStats, setUserStats] = useState({
    activeUsers: 0,
    repeatedUsers: 0
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [summary, ins, sales, prod, user] = await Promise.all([
          adminApi.get("/dashboard/summary"),
          adminApi.get("/dashboard/insights"),
          adminApi.get("/dashboard/sales-report"),
          adminApi.get("/dashboard/product-sales"),
          adminApi.get("/dashboard/user-stats"),
        ]);

        setStats(summary.data.data);
        setInsights(ins.data.data);
        setSalesReport(sales.data.data);
        setProductSales(prod.data.data);
        setUserStats(user.data.data);
      } catch (err) {
        console.error("Dashboard Load Failed", err);
      }
    };

    load();
  }, []);

  const periodMap = {
    "12 Months": "12m",
    "6 Months": "6m",
    "30 Days": "30d",
    "7 Days": "7d"
  };

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

  const donutColors = ["#2563eb", "#9333ea", "#ec4899", "#06b6d4", "#10b981", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-4 md:p-8 font-sans">

      {/* HEADER */}
      <header className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            className="w-full pl-12 pr-4 py-3 rounded-xl border-none shadow-sm focus:ring-2 ring-blue-100"
            placeholder="Search..."
          />
        </div>

        <div className="flex gap-6 items-center justify-end">
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

      {/* TOP STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        {[
          { label: "TOTAL SALE", val: `₹${stats.totalSales.toLocaleString()}`, color: "text-green-500", pct: "+36%" },
          { label: "TOTAL REQUEST", val: stats.totalRequests, color: "text-red-500", pct: "+14%", down: true },
          { label: "TOTAL ORDERS", val: stats.totalOrders, color: "text-green-500", pct: "+36%" },
          { label: "TOTAL USERS", val: stats.totalUsers, color: "text-green-500", pct: "+36%" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2">{item.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-xl md:text-2xl font-bold">{item.val}</h2>
              <span className={`${item.color} text-xs font-bold mb-1`}>
                {item.pct} {item.down ? "↓" : "↑"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* SALES & INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* SALES REPORT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm col-span-1 lg:col-span-2">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
            <h3 className="font-bold text-gray-800">Sales Report</h3>

            <div className="flex flex-wrap gap-2">
              {["12 Months", "6 Months", "30 Days", "7 Days"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedPeriod(t);
                    fetchSalesReport(periodMap[t]);
                  }}
                  className={`px-3 py-1 text-xs rounded-lg border transition 
                    ${selectedPeriod === t
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-500 border-gray-200"
                    }`}
                >
                  {t}
                </button>
              ))}

              <button className="flex items-center gap-2 px-3 py-1 text-xs border rounded-lg">
                <Download size={14} /> PDF
              </button>
            </div>
          </div>

          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesReport}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INSIGHTS */}
        {/* INSIGHTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Insights</h3>
          </div>

          {/* INSIGHTS FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["12 Months", "6 Months", "30 Days", "7 Days"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedPeriod(t);
                  fetchInsights(periodMap[t]);
                }}
                className={`px-3 py-1 text-xs rounded-lg border transition 
          ${selectedPeriod === t
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500 border-gray-200"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {[
              { label: "Total Sales", val: insights.totalSales, w: "95%" },
              { label: "Total Request", val: insights.totalRequests, w: "85%" },
              { label: "Total Orders", val: insights.totalOrders, w: "55%" },
              { label: "Total Customers", val: insights.totalCustomers, w: "40%" },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">{row.label}</span>
                  <span>{row.val.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: row.w }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        {/* PRODUCT SALES REPORT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Product Sales</p>
              <h2 className="text-xl font-bold">
                ₹{stats.totalSales.toLocaleString()}
              </h2>
            </div>
            <Info className="text-gray-300" />
          </div>

          <div className="flex items-center gap-6">
            <div className="w-28 h-28 rounded-full border-[12px] border-blue-500 border-t-purple-500 border-r-pink-500"></div>

            <div className="space-y-1 text-xs font-bold text-gray-500">
              {productSales.slice(0, 5).map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: donutColors[i] }}></div>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* USER CIRCLES */}
        {[
          { label: "Active Users", value: userStats.activeUsers, color: "#f97316" },
          { label: "Repeated Users", value: userStats.repeatedUsers, color: "#a855f7" }
        ].map((u, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="10" fill="transparent" />
                <circle
                  cx="48" cy="48" r="40"
                  stroke={u.color}
                  strokeWidth="10"
                  strokeDasharray={250}
                  strokeDashoffset={250 - (250 * u.value) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-lg font-bold inset-0 flex items-center justify-center">
                {u.value}%
              </span>
            </div>
            <p className="text-sm font-bold text-gray-600">{u.label}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

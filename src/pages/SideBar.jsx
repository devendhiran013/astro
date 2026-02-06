import { useLocation } from "react-router-dom";
import { cn } from "../utils/utils";

const menuItems = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "https://img.icons8.com/material-sharp/24/dashboard-layout.png" },
  { id: "user-management", label: "User Management", path: "/user-management", icon: "https://c.animaapp.com/md08cjntWaCLqK/img/category.png" },
  { id: "product-management", label: "Product Management", path: "/product-management", icon: "https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-cube-user-interface-tanah-basah-glyph-tanah-basah.png" },
  { id: "order-management", label: "Order Management", path: "/order-management", icon: "https://c.animaapp.com/md08cjntWaCLqK/img/category-1.png" },
  { id: "requisition", label: "Requisition", path: "/requisition", icon: "https://c.animaapp.com/md08cjntWaCLqK/img/article.png" },
];

const bottomMenuItems = [
  { id: "settings", label: "Settings", path: "/settings", icon: "https://c.animaapp.com/md08cjntWaCLqK/img/category-3.png" },
  { id: "sign-out", label: "Sign out", path: "/logout", icon: "https://c.animaapp.com/md08cjntWaCLqK/img/category-2.png", isSignOut: true },
];

export default function SideBar({ onNavigate }) {
  const location = useLocation();

  const handleClick = (item) => {
    onNavigate?.(item.id, item.path);
  };

  return (
    <div className="flex flex-col h-full w-80 bg-[#FFD641] text-gray-800 shadow-xl font-['Roboto']">

      {/* HEADER */}
      <div className="p-6 border-b border-yellow-600/20">
        <div className="flex items-center gap-3">
          <div className="relative w-[38.24px] h-[40.09px]">
            <div className="relative w-[39px] h-[41px] -top-px -left-px rounded-[19.74px/20.66px] border-[1.23px] border-solid border-[#471d00]">
              <div className="absolute w-[29px] h-[33px] top-[7px] left-0.5">
                <div className="absolute w-[29px] h-[31px] top-0.5 left-0 rounded-[14.49px/15.42px] border-[1.23px] border-solid border-[#471d00]"></div>
                <div className="absolute w-[22px] h-[23px] top-2 left-1.5 rounded-[11.1px/11.41px] border-[1.23px] border-solid border-[#471d00]"></div>
                <div className="absolute w-1 h-1 top-0 left-3 bg-[#471d00] rounded-[2.16px]"></div>
                <div className="absolute w-1 h-1 top-4 left-[5px] bg-[#471d00] rounded-[2.16px]"></div>
              </div>
              <div className="absolute w-1 h-1 top-0 left-[27px] bg-[#471d00] rounded-[2.16px]"></div>
            </div>
          </div>


          <div>
            <h1 className="text-lg font-semibold">நல்ல நேரம்</h1>
            <p className="text-sm opacity-80">ஆஸ்டேரா</p>
          </div>
        </div>
      </div>

      {/* MAIN MENU */}
      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
                  "hover:bg-[#F2F8FC]/50",
                  isActive && "bg-[#F2F8FC]/50 shadow-sm"
                )}
              >
                <img src={item.icon} className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM MENU */}
      <div className="px-4 pb-6">
        <nav className="space-y-2">
          {bottomMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition",
                  "hover:bg-[#F2F8FC]/40",
                  isActive && "bg-[#F2F8FC]/50 shadow-sm",
                  item.isSignOut && "text-red-700"
                )}
              >
                <img src={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

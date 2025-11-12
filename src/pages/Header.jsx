import React, { useState, useEffect, useRef } from "react";
import { Tabs, TabList, Tab } from "react-tabs";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { IoMenu } from "react-icons/io5";

const Header = ({
  events = [],
  activeView = "month",
  onChangeView = () => {},
  onOpenAdd = () => {},
}) => {
  const [activeTab, setActiveTab] = useState(activeView);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
    setIsSearchOpen(filtered.length > 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onChangeView(tab);
  };

  const handleAddEvent = () => {
    setIsAddOpen(false);
    onOpenAdd();
  };

  return (
    <div className="relative w-full">
      <Tabs className="w-full h-full header-tabs flex justify-between items-center px-6 sm:py-2 py-[15px] relative bg-white dark:bg-slate-900">
        <div>
          <IoMdAdd
            className="cursor-pointer text-2xl text-slate-700 dark:text-slate-200"
            onClick={handleAddEvent}
          />
        </div>

        <div>
          <div className="relative">
            <IoMenu
              className="cursor-pointer text-2xl sm:hidden block"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          <TabList className="sm:flex hidden justify-center items-center ">
            {["day", "week", "month", "year"].map((view) => (
              <Tab
                key={view}
                className={`px-4 py-2 rounded-md cursor-pointer focus:outline-none focus:ring-0 
                ${
                  activeTab === view
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-slate-300"
                }
                `}
                onClick={() => handleTabChange(view)}
                selected={activeTab === view}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Tab>
            ))}
          </TabList>
        </div>

        <div ref={searchRef} className="flex justify-end relative">
          <div className="flex items-center gap-2 w-full rounded-md border border-gray-300 dark:border-slate-700 px-2 text-sm bg-white dark:bg-slate-800">
            <input
              type="search"
              placeholder="Search"
              className="w-full focus:outline-none focus:ring-0 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
              value={searchValue}
              onChange={handleSearch}
            />
            <MdOutlineSearch className="cursor-pointer text-2xl text-slate-600 dark:text-slate-300" />
          </div>

          {isSearchOpen && (
            <div className="absolute top-full mt-1 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.map((result) => {
                return (
                  <div
                    key={result.id}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer text-slate-800 dark:text-slate-200"
                  >
                    {result.title}
                  </div>
                );
              })}
            </div>
          )}
          <button
            aria-label="Toggle dark mode"
            className="ml-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MdLightMode className="text-xl" />
            ) : (
              <MdDarkMode className="text-xl" />
            )}
          </button>
          {isMenuOpen && (
            <div className="absolute top-10 left-0 w-28 bg-white dark:bg-slate-800 rounded-md shadow-md z-50">
              {["day", "week", "month", "year"].map((view) => (
                <button
                  key={view}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer text-slate-800 dark:text-slate-200"
                  onClick={() => {
                    handleTabChange(view);
                    setIsMenuOpen(false);
                  }}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default Header;

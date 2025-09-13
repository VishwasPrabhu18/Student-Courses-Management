import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { courseIcons } from "../constants/iconConstants";

const IconSelect = ({
  value,
  onChange,
  placeholder = "Select an icon...",
  label,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  const selected = courseIcons.find((i) => i.value === value);

  const filteredIcons = courseIcons.filter((i) =>
    i.label.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && <label className="block mb-1 text-gray-700">{label}</label>}
      {/* Selected button */}
      <button
        type="button"
        className="w-full border border-gray-300 rounded-md px-3 py-2 flex items-center justify-between bg-white hover:border-gray-400"
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <div className="flex items-center gap-2">
            <span className="text-lg">{<selected.icon />}</span>
            <span className="text-gray-700">{selected.label}</span>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.value}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onChange(item.value);
                      setOpen(false);
                      setSearch("");
                    }}
                  >
                    <span className="text-lg">{<Icon />}</span>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm px-3 py-2">
                No results found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconSelect;

"use client";
import { Menu } from "@headlessui/react";
import "../styles/Dropdown.css";
import { FiChevronDown } from "react-icons/fi";
import { getGenre } from "@/utilis";
import { useEffect, useState } from "react";
interface genre {
  id: number;
  name: string;
}
interface DropdownProps {
  onChange: (selectedValue: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onChange }) => {
  const [genres, setGenres] = useState<genre[]>([]);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenre();
        console.log("Full response from getGenre:", data);

        if (data && data.genres) {
          setGenres(data.genres);
        } else {
          console.error("Data or data genres are undefined:", data);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <select name="Select Genre" id="" className="select">
      {genres ? (
        genres.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))
      ) : (
        <option>Loading Genres</option>
      )}
    </select>
  );
};
export default Dropdown;

// Dropdown.tsx
"use client";
import { useEffect, useState } from "react";
import { getGenre } from "@/utilis";

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

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log("Selected Genre Value:", selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      name="Select Genre"
      id=""
      className="select"
      onChange={handleGenreChange}
    >
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

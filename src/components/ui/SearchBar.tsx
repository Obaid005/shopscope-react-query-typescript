import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { DEBOUNCE_TIME } from "../../utils/constants";
import { Input, Wrapper } from "../styled/SearchStyles";

export const SearchBar = ({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) => {
  const [search, setSearch] = useState("");

  const debounced = debounce(
    (value: string) => onSearchChange(value),
    DEBOUNCE_TIME
  );

  useEffect(() => {
    debounced(search);
    return debounced.cancel;
  }, [search]);

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Wrapper>
  );
};

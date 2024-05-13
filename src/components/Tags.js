import React from "react";
import { useAutocompleteStore } from "./stores";

const Tags = () => {
  const { tags, deleteTag } = useAutocompleteStore();

  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.id}>
          <span onClick={() => deleteTag(tag.id)}>x</span>
          <input
            type="text"
            value={tag.name}
            onChange={(e) => tag.setName(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Tags;

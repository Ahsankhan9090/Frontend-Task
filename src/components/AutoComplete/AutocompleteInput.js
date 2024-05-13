import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import debounce from "lodash.debounce";

import { fetchSuggestions } from "../../apis/api";
import "./AutoCompleteInput.css"; // Import CSS file

const AutocompleteInput = () => {
  const debouncedFetchSuggestions = debounce((value) => {
    fetchSuggestions(value);
  }, 500);

  const [inputText, setInputText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const inputRef = useRef("");
  const { data: suggestions, isLoading } = useQuery(
    ["autocomplete", inputText],
    () => fetchSuggestions(inputText),
    {
      enabled: inputText !== "", // Only trigger API call if inputValue is not empty
    }
  );

  const options =
    suggestions?.map((suggestion) => ({
      name: suggestion.name,
    })) || [];

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setInputText(value);
  //   // debouncedFetchSuggestions(value);
  // };
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if the input contains any of the specified operands
    const containsOperand = /[\+\-\*\/\(\)\^\,]/.test(value);
    // If input contains operand, do not update the inputText state
    if (containsOperand) {
      addTag(value);
    } else {
      setInputText(value);
    }
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      addTag();
    }
  };
  const addTag = (newVal) => {
    // Check if the input contains any of the specified operands
    const containsOperand = /[\+\-\*\/\(\)\^\,]/.test(newVal);
    // If input contains operand, do not update the inputText state
    if (containsOperand) {
      const tagToAdd = { name: newVal, value: "" };
      setSelectedTags([...selectedTags, tagToAdd]);
      setInputText("");
      return;
    }

    // Otherwise, add the input text as a tag
    if (inputText !== "") {
      const tagToAdd = { name: inputText, value: "" };

      setSelectedTags([...selectedTags, tagToAdd]);
      setInputText("");
    }
  };

  const removeTag = (index) => {
    const newTags = [...selectedTags];
    newTags.splice(index, 1);
    setSelectedTags(newTags);
  };

  const filteredSuggestions = suggestions?.filter((suggestion) => {
    const filteredInputText = inputText.replace(/[\+\-\*\/\(\)\^\,]/g, ""); // Remove specified operands from input text
    return suggestion.name
      .toLowerCase()
      .includes(filteredInputText.toLowerCase());
  });
  const isOperand = (tag) => {
    const operands = ["+", "-", "*", "/", "^", "(", ")", ","];
    return operands.includes(tag);
  };
  const handleChangeTagValue = (event, index) => {
    const newValue = event.target.value;
    const updatedTags = [...selectedTags];
    updatedTags[index] = { ...updatedTags[index], value: newValue };
    setSelectedTags(updatedTags);
  };
  console.log("selec", selectedTags);
  return (
    <div className="tags_input">
      <div className="selected-tags">
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className={`tag ${isOperand(tag.name) ? "operand-tag" : ""}`}
          >
            {tag.name} &nbsp;&nbsp;
            {isOperand(tag.name) ? null : (
              <>
                |
                <input
                  type="text"
                  value={tag.value}
                  onChange={(event) => handleChangeTagValue(event, index)}
                  placeholder="[x]"
                />
                <button type="button" onClick={() => removeTag(index)}>
                  &times;
                </button>
              </>
            )}
          </span>
        ))}
      </div>
      <div className="input_group">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <div className="dropdown">
          {filteredSuggestions?.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={(e) => {
                setInputText(option.name);
                inputRef.current.focus();
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteInput;

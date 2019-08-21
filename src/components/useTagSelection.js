import { useState, useEffect } from "react";

/**
 *  Hook to use in tag filters
 *
 *  returns [selectedTags, handleTagSelection, isTagChecked]
 *
 * @param {(selectedTag, checked, selectedTags) => Void} onChange Callback when tag selected
 * @param {boolean} multiSelectable Whether to support multiple selection or not
 * @param {[]} selectedTags Default selected tags
 * @returns [selectedTags, handleTagSelection, isTagChecked]
 */
const useTagSelection = (
  onChange,
  multiSelectable,
  selectedTags = [] 
) => {
  const handleTagSelection = (tag, checked) => {
    let newSelectedTags = [];
    // tag selected
    if (checked) {
      if (multiSelectable) {
        newSelectedTags = [...selectedTags, tag];
      } else {
        newSelectedTags = [tag];
      }
    } else {
      // tag unselected
      newSelectedTags = selectedTags.filter(
        selectedTag => selectedTag.name !== tag.name
      );
    }

    if (onChange) {
      onChange(tag, checked, newSelectedTags);
    }
  };

  const isTagChecked = tag =>
    selectedTags.find(selectedTag => selectedTag.name === tag.name);

  return {selectedTags, handleTagSelection, isTagChecked};
};

export default useTagSelection;

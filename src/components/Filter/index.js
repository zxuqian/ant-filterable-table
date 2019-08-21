import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";


import { Divider, Tag } from "antd";
import useTagSelection from "../useTagSelection";

const Filter = props => {
  const {
    tags = [],
    selected,
    name,
    label,
    extra,
    additionalFilters,
    multiSelectable = true,
    children,
    onChange,
    tagStyle,
    ...rest
  } = props;

  const {handleTagSelection, isTagChecked} = useTagSelection(
    onChange,
    multiSelectable,
    selected
  );

  const { CheckableTag } = Tag;

  return (
    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
      {label && (
        <p
          style={{
            marginRight: "20px",
            minWidth: "24px",
            marginTop: "4px",
            maxWidth: "120px",
            flex: "1",
          }}
        >
          {label}: 
        </p>
      )}
      <div style={{flex: "10"}}>
        {/* tags */}
        <div flex="1 1 auto" d="column">
          <div align="flex-start">
            {/* <CheckableTag>全部</CheckableTag> */}
            <div flex="0 1 auto" style={{ flexWrap: "wrap" }}>
              {tags.map(tag => (
                <CheckableTag
                  style={{ marginBottom: "12px", ...tagStyle }}
                  key={tag.id}
                  checked={isTagChecked(tag)}
                  onChange={checked => handleTagSelection(tag, checked)}
                >
                  {tag.name}
                </CheckableTag>
              ))}
              {additionalFilters}
            </div>
          </div>
          {children}
        </div>
        {extra}
      </div>
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  extra: PropTypes.element,
  selected: PropTypes.array,
  multiSelectable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  additionalFilters: PropTypes.element
};

export default Filter;

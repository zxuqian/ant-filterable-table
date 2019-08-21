import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";


import { Divider, Tag } from "antd";

const Filter = props => {
  const {
    tags = [],
    selected, // controlled
    name,
    extra,
    additionalFilters,
    multiSelectable = true,
    children,
    onChange,
    showLabel = true,
    tagStyle,
    ...rest
  } = props;

  const [selectedTags, handleTagSelection, isTagChecked] = useTagSelection(
    onChange,
    multiSelectable,
    selected
  );

  const { CheckableTag } = Tag;

  return (
    <Fragment>
      {showLabel && (
        <p
          style={{
            marginRight: "20px",
            minWidth: "24px",
            marginTop: "4px",
            flex: "0 0 auto"
          }}
        >
          {name}
        </p>
      )}
      <div flex="1 1 auto">
        {/* tags */}
        <div flex="1 1 auto" d="column">
          <div align="flex-start">
            {/* <CheckableTag>全部</CheckableTag> */}
            <div flex="0 1 auto" style={{ flexWrap: "wrap" }}>
              {tags.map(tag => (
                <CheckableTag
                  style={{ marginBottom: "12px", ...tagStyle }}
                  key={tag.name}
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
    </Fragment>
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

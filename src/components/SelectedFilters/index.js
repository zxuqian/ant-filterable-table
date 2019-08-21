import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";

/**
 * Component to keep all selected tags, the newly added tags will append to the end of tags array
 * Before add tags here, the related filter need to add 'from' key to tags to remember which filter
 * these tags are from. for example, [{id: 1, name: "行业", from: "sectorsFilter"}]
 * @param {[]} tags
 */
const SelectedFilters = props => {
  const {
    name = "",
    onClose,
    tags = {},
    style,
    showLabel = true,
    ...rest
  } = props;
  return (
    <StyledSelectedFilters style={style}>
      {showLabel && (
        <p style={{ marginRight: "20px", minWidth: "24px", marginTop: "3px" }}>
          {name || "已选"}
        </p>
      )}
      <div flex="1 1 auto" align="flex-start">
        {/* tags */}
        <div
          flex="0 1 auto"
          style={{ flexWrap: "wrap", marginTop: "-14px" }}
        >
          {tags.map(tag => (
            <Tag
              closable
              style={{ marginTop: "14px" }}
              onClose={e => {
                onClose && onClose(tag, e);
              }}
              key={tag.name} // CRIW-421
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </StyledSelectedFilters>
  );
};

SelectedFilters.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func,
  tags: PropTypes.array.isRequired
};

export default SelectedFilters;

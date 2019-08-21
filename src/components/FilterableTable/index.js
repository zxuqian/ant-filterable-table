import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import usePagination from "../usePagination";
import { Table } from "antd";
import useFilters from "../useFilters";


/**
 * A general component to display a page that contains a filter, and a sortable table
 *
 * The <bold>dataTransformer</bold> should be of (data) => {tableData, record_count} type
 *
 * @param {string} title Page title
 * @param {string} cardExtra Extra card actions
 * @param {string} filterComponent Filter component
 * @param {string} columns Table columns
 * @param {string} query Graphql Query
 * @param {{}} filterKeyMappings Filter key to graphql query filter mappings
 * @param {{}} sorterMappings Sort key to graphql sort mappings
 * @param {(data) => {tableData, record_count}} dataTransformer Data handling callback
 * @param {{url, method, variables}} additionalRequestOptions If component need to fetch other data, additional Request component is rendered
 * @param {bool} showTotal Whether to show the total record
 */
const FilterableTable = ({
  children,
  columns,
  dataSource,
  loading,
  tableProps = {},
  onFiltersChange,
}) => {
  // const [filters, setFilters] = useState({});
  // const [after, pageSize, handlePageChange] = usePagination(1, 10);

  const {allFilters, handleTagChange} = useFilters({}, allFilters => onFiltersChange && onFiltersChange(allFilters));

  // deal with children filters
  const filters = React.Children.map(children, (child, index) => {
    // console.log(child);
    const {props: childProps} = child;
    const {name} = childProps;

    return React.cloneElement(child, {
      onChange: handleTagChange(name),
      selected: allFilters[name]
    })
  })

  return (
    <Fragment>
      {filters}
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}

        {...tableProps}
      />
    </Fragment>
  );
};


FilterableTable.propTypes = {
  title: PropTypes.string.isRequired,
  cardExtra: PropTypes.any,
  filterComponent: PropTypes.element.isRequired,
  filterKeyMappings: PropTypes.object.isRequired,
  sorterMappings: PropTypes.object,
  columns: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  dataTransformer: PropTypes.func.isRequired,
  hasFTNSActions: PropTypes.bool,
  FTNSType: PropTypes.string,
  showTotal: PropTypes.bool,
  filterCardProps: PropTypes.object,
  tableCardProps: PropTypes.object,
  paginationPosition: PropTypes.oneOf(["left", "center", "right"]),
  paginationStyle: PropTypes.oneOf([1, 2]),
  additionalFilters: PropTypes.array,
  tableProps: PropTypes.object,
  sortingTableStyle: PropTypes.object,
  queryVariables: PropTypes.object
};

export default FilterableTable;

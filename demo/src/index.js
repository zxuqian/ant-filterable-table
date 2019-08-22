import React, { Component, useState } from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';

import FilterableTable from '../../src/components/FilterableTable'
import { useRequest } from "react-request-hook-client";
import columns from './columns';
import Filter from '../../src/components/Filter';


function Demo() {

  const [filters, setFilters] = useState({});


  const variables = {};
  if(filters.completed) {
    variables.completed = filters.completed[0].value;
  }

  const { loading, data } = useRequest({ url: "https://jsonplaceholder.typicode.com/todos", variables })
  

  return <FilterableTable columns={columns} dataSource={data || []} loading={loading === true} onFiltersChange={setFilters}>
    <Filter label="Completed" name="completed" tags={completedFilters} multiSelectable={false} />

    {/* You can define as many filters as you want */}

  </FilterableTable>
}

const completedFilters = [{id: 1, name: "yes", value: true}, {id: 2, name: "no", value: false}];

render(<Demo />, document.querySelector('#demo'))

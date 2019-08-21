import React, { Component } from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';

import FilterableTable from '../../src/components/FilterableTable'
import { useRequest } from "react-request-hook-client";
import columns from './columns';


function Demo() {

  const { loading, data } = useRequest({ url: "https://jsonplaceholder.typicode.com/todos" })


  return <FilterableTable columns={columns} dataSource={data || []} loading={loading === true} />
}

function TodoFilters() {

  return <div>
    <Filter></Filter>
  </div>

}


render(<Demo />, document.querySelector('#demo'))

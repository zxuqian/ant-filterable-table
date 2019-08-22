# Ant Filterable Table

A component to display a table with filter options, based on React Hooks and Ant Design.

## Installing

**npm**

```bash
$ npm install --save ant-filterable-table
```

**or Yarn**

```bash
$ yarn add ant-filterable-table
```

## Requirements

React >= 16.8.0

## Get Started

See live example on CodeSandBox:

[![Edit ant-filterable-table](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/modern-glade-ptu8s?fontsize=14)

The simplest usage would be:

```jsx
function App() {
  const [filters, setFilters] = useState({});

  const variables = {};
  if (filters.completed) {
    variables.completed = filters.completed[0].value;
  }

  // using react-request-hook-client library
  // https://github.com/zxuqian/react-request-hook-client
  const { loading, data } = useRequest({
    url: "https://jsonplaceholder.typicode.com/todos",
    variables
  });

  return (
    <FilterableTable
      columns={columns}
      dataSource={data || []}
      loading={loading === true}
      onFiltersChange={setFilters}
    >
      <Filter
        label="Completeness"
        name="completed"
        tags={completedFilters}
        multiSelectable={false}
      />

      {/* You can define as many filters as you want */}
    </FilterableTable>
  );
}

const completedFilters = [
  { id: 1, name: "yes", value: true },
  { id: 2, name: "no", value: false }
];
```

The `<FilterableTable>` can have many `<Filter>` components as its children, these are the filter tags used to filter table data. When tags are clicked, the `onFiltersChange` callback will notify the outer component with the newest filter values.

## API

### `<FilterableTable>`

|    **Props**    | **Type** | **Default Value** |                        **Description**                        |
| :-------------: | :------: | :---------------: | :-----------------------------------------------------------: |
|     columns     |  Array   |                   |                   Same as Ant Design Table                    |
|   dataSource    |  Array   |                   |                   Same as Ant Design Table                    |
|     loading     |          |                   |                   Same as Ant Design Table                    |
| onFiltersChange | Function |                   | `(filters) => void`. Callback to be invoked on filter changes |

### `<Filter>`

|    **Props**    |     **Type**     | **Default Value** |                                                  **Description**                                                   |
| :-------------: | :--------------: | :---------------: | :----------------------------------------------------------------------------------------------------------------: |
|      label      |      String      |                   |                                      Label to be displayed alongside filters                                       |
|      name       | String(Required) |                   |                           Used as the key of the filter value in the all filters object.                           |
|      tags       | Array(Required)  |                   | An array of tags to display as a filter. Each tag at least has an `id` and `name` attribute. {id: 1, name: "tag1"} |
| multiSelectable |     Boolean      |       TRUE        |                                Whether tags in the filter can be selected multiply                                 |

## Issues

If you have any questions or find a bug of this library, please feel free to open an issue.

## License

MIT

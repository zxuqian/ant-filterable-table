export default [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId"
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render: text => text ? "yes" : "no"
  },
]
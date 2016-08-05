var React = require('react');

function TableHead () {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Created at</th>
        <th>Modified at</th>
      </tr>
    </thead>
  )
}

module.exports = TableHead;

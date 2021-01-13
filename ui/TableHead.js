const TableHead = (props) => {
  return (
    <th className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm font-normal">
      {props.children}
    </th>
  );
};

export default TableHead;

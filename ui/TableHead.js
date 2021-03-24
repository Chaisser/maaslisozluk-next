const TableHead = (props) => {
  return (
    <th
      className={`px-5 py-3 bg-white dark:bg-dark-300 dark:text-dark-400  border-b border-gray-200 dark:border-dark-100 text-gray-800  text-left text-sm font-normal`}
    >
      {props.children}
    </th>
  );
};

export default TableHead;

const TableData = (props) => {
  return (
    <td
      style={{ ...props.style }}
      className="px-5 py-5 text-sm text-left border-b border-gray-200 dark:border-dark-300"
    >
      {props.children}
    </td>
  );
};

export default TableData;

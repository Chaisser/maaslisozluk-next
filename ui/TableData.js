const TableData = (props) => {
  return (
    <td style={{ ...props.style }} className="px-5 text-left py-5 border-b border-gray-200   text-sm">
      {props.children}
    </td>
  );
};

export default TableData;

import React from "react";

const Table = ({ header, data, dataName }) => {
  console.log(header, data);
  return (
    <div>
      {" "}
      <table>
        <tr>
          <th>Measure</th>

          {header.map((ele, index) => {
            return <th key={index}>{`Class ${ele}`}</th>;
          })}
        </tr>
        {data.map(([key, ele], ind) => {
          return (
            <tr>
              <td>{`${dataName} ${key}`}</td>
              <td>{ele.mean}</td>
              <td>{ele.median}</td>
              <td>{ele.mode[0]}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;

import React from 'react'

const TableModelCard = (props) => {
  const {
    tableName,
    attributeList
  } = props;
  return (
    <>    
      <div>{tableName}</div>
      <table>
        <tr>
          <th>Attribute</th>
          <th>Data Type</th>
        </tr>
        {attributeList.map((attr) => {
          return (
            <tr>
              <td>{attr}</td>
              <td>select option goes here</td>
            </tr>
          )
        })}
      </table>
    </>
  )
}

export default TableModelCard
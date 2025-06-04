"use client";

// import { useState } from 'react';
import React, { useState } from 'react';
import Barcode from 'react-barcode';

const BarcodeTable = () => {
 // Initial data with 3 dummy rows and 1 empty row
 const initialData = [
  { id: 1, code: '123456', name: 'Product A', barcode: '123456' },
  { id: 2, code: '789012', name: 'Product B', barcode: '789012' },
  { id: 3, code: '345678', name: 'Product C', barcode: '345678' },
  { id: 4, code: '', name: '', barcode: '' }, // Empty row for new entry
 ];

 const [tableData, setTableData] = useState(initialData);

 const handleInputChange = (id, field, value) => {
  setTableData(prevData =>
   prevData.map(row => {
    if (row.id === id) {
     const updatedRow = { ...row, [field]: value };
     
     // Auto-update barcode when code changes
     if (field === 'code') {
      updatedRow.barcode = value;
     }
     
     return updatedRow;
    }
    return row;
   })
  );

  // Add new empty row if we're editing the last row
  if (id === tableData[tableData.length - 1].id && field === 'code' && value) {
   setTableData(prevData => [
    ...prevData,
    { id: prevData.length + 1, code: '', name: '', barcode: '' }
   ]);
  }
 };

 return (
  <div className="container mx-auto p-4 max-w-4xl">
   <h1 className="text-2xl font-bold mb-6 text-black">Barcode Table Generator</h1>
   
   <div className="mt-4 text-medium text-white mb-4">
    <p>Tip: The barcode automatically updates when you change the code value.</p>
    <p>A new row will be added automatically when you fill the last row.</p>
   </div>
   <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
     <thead className="bg-gray-50">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Code</th>
       <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Name</th>
       <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">Barcode</th>
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {tableData.map((row) => (
       <React.Fragment key={row.id}>
        <tr>
         <td className="px-6 py-4 whitespace-nowrap">
          <input
           type="text"
           value={row.code}
           onChange={(e) => handleInputChange(row.id, 'code', e.target.value)}
           className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
           placeholder="Enter code"
          />
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <input
           type="text"
           value={row.name}
           onChange={(e) => handleInputChange(row.id, 'name', e.target.value)}
           className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
           placeholder="Enter name"
          />
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          {row.barcode ? (
           <div className="flex flex-col place-items-center">
            <Barcode
             value={row.barcode}
             format="CODE128"
             width={1.5}
             height={50}
             displayValue={false}
            />
            <label className="mt-1 text-center text-xs text-gray-600">{row.barcode}</label>
           </div>
          ) : (
           <div className="text-sm text-black">Enter code to generate</div>
          )}
         </td>
        </tr>
        {/* Expandable row for additional information */}
        <tr className="bg-gray-50">
         <td colSpan="3" className="px-6 py-4">
          <textarea
           placeholder="Additional notes..."
           className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
           rows="2"
          />
         </td>
        </tr>
       </React.Fragment>
      ))}
     </tbody>
    </table>
   </div>

   
  </div>
 );
};

export default BarcodeTable;

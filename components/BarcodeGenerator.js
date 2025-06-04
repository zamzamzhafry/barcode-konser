"use client";
import React, { useState } from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = () => {
  const [barcodeValue, setBarcodeValue] = useState('123456789');
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128');
  const [barcodeWidth, setBarcodeWidth] = useState(2);
  const [barcodeHeight, setBarcodeHeight] = useState(100);

  const formats = [
    'CODE128',
    'CODE39',
    'EAN13',
    'EAN8',
    'UPC',
    'ITF14',
    'MSI',
    'pharmacode',
  ];

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Barcode Generator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm text-black font-medium mb-1 ">Barcode Value</label>
          <input
            type="text"
            value={barcodeValue}
            onChange={(e) => setBarcodeValue(e.target.value)}
            className="w-full p-2 border rounded text-black"
            placeholder="Enter barcode value"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-black">Barcode Format</label>
          <select
            value={barcodeFormat}
            onChange={(e) => setBarcodeFormat(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            {formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Width</label>
            <input
              type="number"
              value={barcodeWidth}
              onChange={(e) => setBarcodeWidth(parseInt(e.target.value))}
              className="w-full p-2 border rounded text-black"
              min="1"
              max="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Height</label>
            <input
              type="number"
              value={barcodeHeight}
              onChange={(e) => setBarcodeHeight(parseInt(e.target.value))}
              className="w-full p-2 border rounded text-black"
              min="50"
              max="200"
            />
          </div>
        </div>

        <div className="flex justify-center p-4 bg-gray-50 rounded">
          <Barcode
            value={barcodeValue}
            format={barcodeFormat}
            width={barcodeWidth}
            height={barcodeHeight}
          />
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p>Try different values and formats to see how the barcode changes.</p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
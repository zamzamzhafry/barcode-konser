"use client";
import { useState, useRef, useEffect } from 'react';
import Barcode from 'react-barcode';

const TicketGenerator = () => {
  const [code, setCode] = useState('ABC012343');
  const [name, setName] = useState('John Doe');
  const canvasRef = useRef(null);

  // Generate ticket whenever inputs change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ticket background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, 400, 200);

    // Draw decorative elements
    ctx.fillStyle = '#4cc9f0';
    ctx.beginPath();
    ctx.arc(30, 30, 20, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(370, 30, 20, 0, Math.PI * 2);
    ctx.fill();

    // Draw ticket content
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('SUMMER FEST 2025', 100, 40);

    ctx.font = '16px Arial';
    ctx.fillText(`Name: ${name}`, 50, 80);
    ctx.fillText(`Ticket #: ${code}`, 50, 110);
    ctx.fillText('Venue: Central Park', 50, 140);
    ctx.fillText('Date: June 15, 2024 | 7:00 PM', 50, 170);

    // Draw barcode placeholder
    // ctx.fillStyle = 'rgba(255,255,255,0.2)';
  
    // ctx.fillRect(250, 70, 120, 80);

  //   <div className="absolute top-[70px] left-[250px] w-[120px] h-[80px]">
  //   <Barcode
  //     value={code || ' '}
  //     format="CODE128"
  //     width={1.5}
  //     height={50}
  //     displayValue={false}
  //   />
  // </div> 
  
  }, [code, name]

);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Concert Ticket Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Ticket Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter ticket code"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Attendee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded text-black"
              placeholder="Enter name"
            />
          </div>

          <div className="pt-4">
            <h3 className="font-medium mb-2 text-black">Barcode Preview:</h3>
            <div className="flex justify-center p-4 bg-gray-100 rounded">
              <Barcode
                value={code || ' '}
                format="CODE128"
                width={1.5}
                height={50}
                displayValue={false}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2 text-black">Ticket Preview:</h3>
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={200}
              className="w-full h-auto"
            />

<div className="mt-4 flex justify-center">
    <Barcode
      value={code || ' '}
      format="CODE128"
      width={1.5}
      height={50}
      displayValue={false}
    />
  </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>This is a digital concert ticket template. The barcode will be scanned at entry.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketGenerator;
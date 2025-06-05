"use client";
import { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ImageBasedTicket = () => {
  const [code, setCode] = useState('A001');
  const [name, setName] = useState('Guest');
  const ticketRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Base image dimensions
  const imageWidth = 1658;
  const imageHeight = 592;
  const aspectRatio = imageWidth / imageHeight;
  const displayWidth = 800;
  const displayHeight = displayWidth / aspectRatio;
  const baseImageUrl = '/tk1rev.png';

  // Generate ticket codes: A001-A100, B101-B200, etc.
  const generateTicketCodes = () => {
    const prefixes = ['A', 'B', 'C', 'D', 'E']; // Extend as needed
    const tickets = [];
    
    prefixes.forEach((prefix, i) => {
      for (let j = 1; j <= 100; j++) {
        const number = (i * 100) + j;
        tickets.push(`${prefix}${number.toString().padStart(3, '0')}`);
      }
    });
    
    return tickets;
  };

  // Download single ticket
  const handlePrint = async () => {
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    });

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ticket-${code}.png`;
    link.href = pngUrl;
    link.click();
  };

  // Bulk generate and zip all tickets
  const handleBulkGenerate = async () => {
    setIsGenerating(true);
    const zip = new JSZip();
    const tickets = generateTicketCodes();

    for (const ticketCode of tickets) {
      setCode(ticketCode); // Update ticket code
      
      // Wait for state update and DOM render
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
      });

      const blob = await new Promise(resolve => 
        canvas.toBlob(resolve, 'image/png', 1)
      );
      
      zip.file(`ticket-${ticketCode}.png`, blob);
    }

    // Generate and download ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'tickets-bundle.zip');
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Ticket Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Ticket Template */}
      <div 
        ref={ticketRef}
        className="relative mx-auto bg-white shadow-lg overflow-hidden"
        style={{ 
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          aspectRatio: aspectRatio
        }}
      >
        <img 
          src={baseImageUrl} 
          alt="Ticket" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* First Barcode */}
        <div className="absolute" style={{
          bottom: '55px',
          left: '66.5%',
          transform: 'translateX(-50%)',
          width: '300px'
        }}>
          <Barcode
            value={code}
            format="CODE128"
            width={1.2}
            height={50}
            displayValue={true}
            background="transparent"
          />
        </div>

        {/* Second Barcode */}
        <div className="absolute" style={{
          bottom: '55px',
          left: '84%',
          transform: 'translateX(-50%)',
          width: '300px'
        }}>
          <Barcode
            value={code}
            format="CODE128"
            width={1.2}
            height={50}
            displayValue={true}
            background="transparent"
          />
        </div>
      </div>

      <div className="mt-4 space-x-2">
        <button 
          onClick={handlePrint} 
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Download Single PNG
        </button>
        
        <button 
          onClick={handleBulkGenerate} 
          disabled={isGenerating}
          className={`px-4 py-2 rounded ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 text-white'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Download 500 Tickets (ZIP)'}
        </button>
      </div>
    </div>
  );
};

export default ImageBasedTicket;
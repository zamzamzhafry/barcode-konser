"use client";
import { useState, useRef, useEffect } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ImageBasedTicket = () => {
  const [codes, setCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState('');
  const ticketRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load JSON data
  useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch('/sample.json');
      const data = await response.json();
      setCodes(data);
      if (data.length > 0) setCurrentCode(data[0]); // Set first code as default
    };
    fetchCodes();
  }, []);

  // Ticket dimensions
  const imageWidth = 1658;
  const imageHeight = 592;
  const aspectRatio = imageWidth / imageHeight;
  const displayWidth = 800;
  const displayHeight = displayWidth / aspectRatio;
  const baseImageUrl = '/tk1rev.png';

  // Download single ticket
  const handlePrint = async () => {
    if (!currentCode) return;
    
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    });

    const pngUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `ticket-${currentCode}.png`;
    link.href = pngUrl;
    link.click();
  };

  // Bulk generate all tickets
  const handleBulkGenerate = async () => {
    if (!codes.length) return;
    
    setIsGenerating(true);
    const zip = new JSZip();

    for (const code of codes) {
      setCurrentCode(code);
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const canvas = await html2canvas(ticketRef.current);
      const blob = await new Promise(resolve => 
        canvas.toBlob(resolve, 'image/png', 1)
      );
      zip.file(`ticket-${code}.png`, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'tickets-bundle.zip');
    setIsGenerating(false);
  };

  if (codes.length === 0) return <div>Loading barcodes...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <label className="block mb-2">Current Barcode</label>
        <select
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value)}
          className="p-2 border rounded w-full"
        >
          {codes.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
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
        
        {/* Dual Barcodes */}
        <div className="absolute" style={{ bottom: '63px', left: '67.3%', transform: 'translateX(-50%)', width: '300px' }}>
          <Barcode value={currentCode} format="CODE128" width={1} height={50} background="transparent" // <-- THIS CONTROLS BARCODE BACKGROUND
  lineColor="#000000"     // Optional: Barcode line color
  margin={0} />
        </div>
        <div className="absolute" style={{ bottom: '65px', left: '84.8%', transform: 'translateX(-50%)', width: '300px' }}>
          <Barcode value={currentCode} format="CODE128" width={1} height={50} background="transparent" // <-- THIS CONTROLS BARCODE BACKGROUND
  lineColor="#000000"     // Optional: Barcode line color
  margin={0}  />
        </div>
      </div>

      <div className="mt-4 space-x-2">
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded">
          Download Current
        </button>
        <button 
          onClick={handleBulkGenerate} 
          disabled={isGenerating}
          className={`px-4 py-2 rounded ${isGenerating ? 'bg-gray-400' : 'bg-green-600 text-white'}`}
        >
          {isGenerating ? 'Generating...' : `Download All (${codes.length})`}
        </button>
      </div>
    </div>
  );
};

export default ImageBasedTicket;
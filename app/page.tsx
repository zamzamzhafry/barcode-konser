
import Image from "next/image";

import BarcodeGenerator from '../components/BarcodeGenerator';
import BarcodeTable from '../components/BarcodeTable';
import TicketGenerator from '../components/TicketGenerator';
import ImageBasedTicket from '../components/ImageBasedTicket';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* <div className="flex flex-row items-center justify-center">
        <BarcodeGenerator />
      </div>
      <div className="flex flex-row items-center justify-center">
        <BarcodeTable />
      </div>
      <div className="flex flex-row items-center justify-center">
        <TicketGenerator />
      </div> 
      */}

<div className="flex flex-row items-center justify-center">
        <ImageBasedTicket />
      </div>
    </main>
  );
}

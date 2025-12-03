"use client"
import * as htmlToImage from "html-to-image";
import { useRef, useState } from "react";
import QRCode from "react-qr-code";



export default function UserQrCode({ dbData }) {
    const [url, setUrl] = useState(dbData);
    const qrCodeRef = useRef(null);

    const downloadQRCode = () => {
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = dbData + '.png';
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
    };


  return (
    <>
    <div className="qrcode__container">
        <div className="qrcode__container--parent">
            <div className="qrcode__download">
              <div className="w-[300px] p-[25px] bg-white" ref={qrCodeRef}>
                <QRCode value={dbData} size={250} />
              </div>
              <button 
                className="mx-[25px] bg-gradient-to-br from-slate-700 to-cyan-700 hover:bg-gradient-to-tr hover:from-slate-700 hover:to-cyan-700 hover:drop-shadow-lg duration-200 ease-in-out transition-all px-12 py-3 text-white rounded-xl" 
                onClick={downloadQRCode}>
                Download QR Code
              </button>
            </div>
        </div>
    </div>
    </>
  )
}

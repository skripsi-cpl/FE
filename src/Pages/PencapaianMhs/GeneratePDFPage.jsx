// GeneratePDFPage.js
import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import GeneratePDF from './GeneratePDF';

const GeneratePDFPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
      <PDFViewer style={{ width: '100%', height: '100%' }} fileName="capaian_pembelajaran.pdf">
        <GeneratePDF />
      </PDFViewer>
    </div>
  );
};

export default GeneratePDFPage;

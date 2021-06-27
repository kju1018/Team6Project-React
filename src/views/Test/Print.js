import React from 'react';
import { useBarcode } from 'react-barcodes';

function Print() {
  const { inputRef } = useBarcode({
    value: 'barcodeNo',
    options: {
      background: '#ffffff',
    }
  });

  return (
    <img ref={inputRef} />
  );
}
export default Print;
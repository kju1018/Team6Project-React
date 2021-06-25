import React from 'react';
import { useBarcode } from 'react-barcodes';
function Print() {
  
  const { inputRef } = useBarcode({
    value: 'createnextapp',
    options: {
      background: '#ffff00',
    }
  });

  

  return (
    <img ref={inputRef} />
  );
}
export default Print;
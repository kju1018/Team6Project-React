import React from 'react';
import { useBarcode } from 'react-barcodes';
import moment from 'moment';

function Print({clickdate, grouplist}) {
  console.log(clickdate)
  console.log(grouplist)
  const { inputRef } = useBarcode({
    value: clickdate.patientid+""+clickdate.testreceptionid+moment().format('YYYYMMDD'),
    options: {
      background: '#ffffff',
    }
  });

  return (
    <img ref={inputRef} />
  );
}
export default Print;
import React from 'react';
import { useBarcode } from 'react-barcodes';
import moment from 'moment';

function Print({selectpatientinfo, grouplist}) {
  const { inputRef } = useBarcode({
    value: selectpatientinfo.patientid+"_"+selectpatientinfo.testreceptionid+moment().format('YYYYMMDD'),
    options: {
      background: '#ffffff',
    }
  });

  return (
    <img ref={inputRef} />
  );
}
export default Print;
import React, { useCallback, useMemo, useRef, useState } from 'react';
//import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  BarSparklineOptions,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  //const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {field: 'make'},
    {field: 'model'},
    {field: 'price',
    cellRenderer: 'agSparklineCellRenderer',
    cellRendererParams: {
      sparklineOptions: {
        type: 'bar',
        fill: '#5470c6',
        stroke: '#91cc75',
        highlightStyle: {
          fill: '#fac858',
        },
        valueAxisDomain: [0, 1],
        paddingOuter: 0,
        padding: {
          top: 0,
          bottom: 0,
        },
        axis: {
          strokeWidth: 0,
        },
      } as BarSparklineOptions,
    },
  },
  ]);

//  const defaultColDef = useMemo<ColDef>(() => {
//    return {
//      flex: 1,
//      minWidth: 100,
//      resizable: true,
//    };
//  }, []);


  React.useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, []);


  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={50}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;
//render(<GridExample></GridExample>, document.querySelector('#root'));
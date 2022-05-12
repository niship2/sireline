import React, {useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import { render } from 'react-dom';
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
import { FileWatcherEventKind } from 'typescript';

export function CarsGrid() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        {field: 'H_APPLICANT',headerName:'出願人',filter: 'agSetColumnFilter'},
        {field: 'headipc',headerName:'出願分野'},
        {field: 'appcount',headerName:'出願件数' 
        //,editable: 'true',
        //valueFormatter: params => params.data.number,
        ,cellRenderer: 'agSparklineCellRenderer',
        sparklineOptions: {
          type: 'bar',
          // Optional customisation properties
          fill: '#5470c6',
          stroke: '#91cc75',
          highlightStyle: {
              fill: '#fac858'
          },
          valueAxisDomain: [0, 1]
        } as BarSparklineOptions,
      },
      {field: 'sumTS',headerName:'sumTS'},
      {field: 'sumATT',headerName:'sumATT'},
      {field: 'sumTOTAL',headerName:'sumTOTAL'},
      {field: 'comp_size_cap',headerName:'comp_size_cap'},
      {field: 'comp_size_emp',headerName:'comp_size_emp'},
      {field: 'jsic_l',headerName:'jsic_l'},
      {field: 'jsic_m',headerName:'jsic_m'},
      {field: 'jsic_s',headerName:'jsic_s'},
      //{field: 'techfield',headerName:'技術分野'},
      //{field: 'compsize',headerName:'企業規模'},
    ]);

    React.useEffect(() => {
        //fetch('https://www.ag-grid.com/example-assets/row-data.json')
        fetch('https://get-totalrank-byrunjg3yq-uc.a.run.app/')
        .then(result => result.json())
            .then(rowData => setRowData(rowData))
    }, []);
    
    
    return (
       <div className="ag-theme-alpine" style={{height: 400, width: '90%'}}>   
           <AgGridReact
                defaultColDef={{sortable: true, filter: true }}
                pagination={true}
                rowData={rowData}
                columnDefs={colDefs}
                >
           </AgGridReact>
       </div>
   )

};
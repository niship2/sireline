import React, {useState,useRef,useCallback} from 'react';
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


export function CarsGrid() {
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        {field: 'H_APPLICANT',headerName:'出願人',filter: 'agSetColumnFilter',pinned: "left"},
        {field: 'headipc',headerName:'出願分野'},
        {field: 'appcount',headerName:'出願件数' 
        //,editable: 'true',
        //,valueFormatter: params => params.data.array
        ,cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          label: {
            enabled: true // show bar labels
          },
          // Optional customisation properties
          fill: '#5470c6',
          stroke: '#91cc75',
          highlightStyle: {
              fill: '#fac858'
          },
          valueAxisDomain: [0, 1]
        } as BarSparklineOptions,
        },
      },

      {field: 'sumTS',headerName:'sumTS'},
      {field: 'sumATT',headerName:'sumATT'},
      {field: 'sumTOTAL',headerName:'sumTOTAL'},
      {field: 'comp_size_cap',headerName:'comp_size_cap'},
      {field: 'comp_size_emp',headerName:'comp_size_emp'},
      {field: 'jsic_l',headerName:'jsic_l'},
      {field: 'jsic_m',headerName:'jsic_m'},
      {field: 'jsic_s',headerName:'jsic_s'}
    ]);

    React.useEffect(() => {
        //fetch('https://www.ag-grid.com/example-assets/row-data.json')
        fetch('https://get-totalrank-byrunjg3yq-uc.a.run.app/')
        .then(result => result.json())
            .then(rowData => setRowData(rowData)
            
            )
    }, []);
    
  

    
    return (
       <div className="ag-theme-alpine" style={{height: 800, width: '95%'}}> 
           <AgGridReact
                defaultColDef={{sortable: true, filter: true }}
                pagination={true}
                paginationPageSize={100}
                rowData={rowData}
                columnDefs={colDefs}
                >
           </AgGridReact>
        </div>
      
      )
};

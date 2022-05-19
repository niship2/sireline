import React, {useState,useRef,useCallback} from 'react';
import type { FC } from 'react';
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
  ValueGetterParams,
  ValueFormatterParams
} from 'ag-grid-community';


function NumFormatter(params: ValueFormatterParams) {
  return Number(params.value);
}

type PropsWithChild = {
  field: string;
  height: number;
};

//const ExWithChildFC: React.FC<PropsOptional> = ({ x = 10, y, children }) => {
export function CarsGrid({field='all',height=800}:PropsWithChild) {
//export const CarsGrid: FC = ({field='all',height=800}:PropsWithChild)=>{  
    
    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        {field: 'H_APPLICANT',headerName:'出願人',filter: 'agSetColumnFilter',pinned: "left",excelMode: 'windows',},
        {field: 'appcount2',headerName:'出願件数' 
        ,valueFormatter: NumFormatter
        ,cellRenderer: 'agSparklineCellRenderer',
        cellRendererParams: {
        sparklineOptions: {
          type: 'bar',
          label: {
            enabled: true // show bar labels
          },
          // Optional customisation properties
          fill: 'lightgreen',
          stroke: '#91cc75',
          highlightStyle: {
              fill: '#fac858'
          },
          valueAxisDomain: [0, 1]
        } as BarSparklineOptions,
        },
      },
      {field: 'headipc',headerName:'出願分野'},
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
        const fetchPost = async () => {
          await fetch('https://get-totalrank-byrunjg3yq-uc.a.run.app/')
        .   then(result => result.json())
              .then(rowData => setRowData(rowData)
              ).then(()=>setColDefs(colDefs))
        }
        fetchPost();
    }, []);
    
  
//console.log(rowData)
    
    return (
       <div className="ag-theme-alpine" style={{height: height, width: '100%'}}> 
           <AgGridReact
                defaultColDef={{sortable: true, filter: true }}
                pagination={true}
                paginationPageSize={50}
                rowData={rowData}
                columnDefs={colDefs}
                >
           </AgGridReact>
        </div>
      
      )
};



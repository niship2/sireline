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
  GridReadyEvent,
  GridApi,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ValueGetterParams,
  ValueFormatterParams
} from 'ag-grid-community';
import Select from 'react-select'


function NumFormatter(params: ValueFormatterParams) {
  return Number(params.value);
}

type PropsWithChild = {
  filterkey :string;
  fields: string;
  height: number;
};







//const ExWithChildFC: React.FC<PropsOptional> = ({ x = 10, y, children }) => {
export function CarsGrid({filterkey="headipc",fields='土木技術',height=800}:PropsWithChild) {
//export const CarsGrid: FC = ({field='all',height=800}:PropsWithChild)=>{  

 

  const [field,setAppl] = useState("製造業")

  const [options,setOptions] = useState([
    { value: '医療機器', label: '医療機器' },
    { value: 'その他の消費財', label: 'その他の消費財' },
    { value: 'デジタル通信', label: 'デジタル通信' },
  ])

  const applchange = (e:any) => {
    setAppl(e.value);
    //console.log(e.value);
  }

    
    const [rowData, setRowData] = useState();
    const [columnDefs, setColDefs] = useState([
        {field: 'H_APPLICANT',headerName:'出願人',filter: 'agSetColumnFilter',pinned: "left",excelMode: 'windows',},
        {field: 'appcount',headerName:'出願件数' 
        ,type:'numericColumn'
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
        valueGetter: (params: ValueGetterParams) => {
          //const formattedData: any = [];
          const rateOfChange = params.data.appcount;
          const  formattedData = [rateOfChange];
          return formattedData;
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


    const gridRef = useRef();
    const myListener = ()=> {
        // api and columnApi on the gridRef object
        console.log("exe")
        console.log(gridRef.current)
        const gridApi = gridRef.current.api;
        
    
        // api's will be null before grid initialised
        if (gridApi==null) { return; }
    
        // access the Grid API
        gridApi.deselectAll();
        

        
        const countryFilterComponent = gridApi.getFilterInstance(filterkey);
        const model = countryFilterComponent.getModel(); 
        countryFilterComponent.setModel({ values: [field] });
        gridApi.onFilterChanged();
    }

    



    React.useEffect(() => {
        //fetch('https://www.ag-grid.com/example-assets/row-data.json')
        const fetchPost = async () => {
          await fetch('https://get-totalrank-byrunjg3yq-uc.a.run.app/')
        .   then(result => result.json())
              .then(rowData => setRowData(rowData)
              ).then(()=>setColDefs(columnDefs))
        }
        fetchPost();
    }, [myListener]);
    
    //this.GridApi.getFilterInstance

  
//console.log(rowData)
    
    return (
      <>
      <button onClick={myListener}>切り替え</button>
       <div className="ag-theme-alpine" style={{height: height, width: '100%'}}>
       <Select options={options}
          value={options.find(obj => obj.value === field)}
          onChange={applchange}
          isSearchable
          /> 
           <AgGridReact
           ref = {gridRef}
                defaultColDef={{sortable: true, filter: true,floatingFilter: true }}
                pagination={true}
                paginationPageSize={50}
                rowData={rowData}
                columnDefs={columnDefs}
                
                
                >
           </AgGridReact>
           
 
        </div>
      </>
      )
};



//import { sleep } from '@amcharts/amcharts5/.internal/core/util/Time';
//import { yearsToMonths } from 'date-fns';
import React from 'react'
import { useState } from "react";
import Select from 'react-select'
//import { optionCSS } from 'react-select/dist/declarations/src/components/Option';
//import useSWR from 'swr'
import { createContext } from "react";
//import { array } from '@amcharts/amcharts5';
//import loadData from './amcharts/amctest';
//import { load } from '@amcharts/amcharts5/.internal/core/util/Net';

export const appl1 = createContext("凸版印刷"); 
export const appl2 = createContext("大日本印刷");


const SelectBox = (props: any) => {
  const [selectedValue, setSelectedValue] = useState("凸版印刷");
  const [selectedValue2, setSelectedValue2] = useState("大日本印刷");

  
  const handleChange1:any = function (e: { value: React.SetStateAction<string>; }) {
      setSelectedValue(e.value);
      console.log(e.value);
      //console.log(e.value);
  }

  const handleChange2:any = (e: { value: React.SetStateAction<string>; }) => {
    setSelectedValue2(e.value);
    console.log(e.value);
    
  }

  //出願人名一覧を取得したい
  //const { user, isLoading } = useUser()
  //console.log(user)
  //if(!isLoading) console.log(JSON.stringify(user))

  const options = [
      { value: '凸版印刷', label: '凸版印刷' },
      { value: '大日本印刷', label: '大日本印刷' },
      { value: 'トッパン・フォームズ', label: 'トッパン・フォームズ' },
      { value: 'トッパン・', label: 'トッパン・' },
    ]

    return (
    <div>
      <div>
      <p>1社目</p>
      <appl1.Provider value={selectedValue}>
        <Select options={options}
        value={options.find(obj => obj.value === selectedValue)}
        onChange={handleChange1}
        />
      </appl1.Provider>
      <style jsx>{`
        div {
          background-color: white;
          width :300px;
        }
        p{ float: left}
      `}</style>
      </div>
      <div>
      <appl2.Provider value={selectedValue2}>
        <Select options={options}
        value={options.find(obj => obj.value === selectedValue2)}
        onChange={handleChange2}
        />
      </appl2.Provider>
      <style jsx>{`
        div {
          background-color: white;
          width :300px;
        }
        p{ float: left}
      `}</style>
      </div>
    </div>
    )

}

export default SelectBox
import React, { useState, useEffect, props,useCallback } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis,Cell,CartesianGrid, Tooltip, Legend } from 'recharts';
import "./Attendance.css";
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const AttendanceChart = () => {
  const [data, setData] = useState([]);
  const [select,setSelect]=useState('')
  const[year,setYear]=useState(['2023'])
  const[summary,setSummary]=useState(' Attendance Summary')
  const getUserdata=()=> {
    try {
      const response = axios({
        method: "post",
        url: `http://localhost:5000/summary`,
        data: {'year_pass':['2023'],'Month': [3],'User':['0']},
        headers: { 'Content-Type': 'application/json'},
  
      }).then(res=> {
        console.log(res.data.data)
        const chart_data=res.data.data;
        setData(chart_data)
      })
    
       
        
    
      
      console.log(response)
  
    } catch (error) {
      console.log(error)
    }
}
  useEffect(() => {
    getUserdata();
  }, [])
  const [formData, setFormData] = useState({
    // your form data state
  });
  const [selectedOption, setSelectedOption] = useState('April');
  const [show_Month,setshow_Month]=useState(['3']);
  const [show_Userlist,setshow_Userlist]=useState(['0']);
  const [show_daily,setshow_daily]=useState(['0']);
  const [selecteduserwise, setSelecteduserwise] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(0);
  const [selectedYear, setselectedYear] = useState(['2023']);
  const [selectedUser, setselectedUser] = useState('');
  const[typesFilter,settypesFilter]=useState();
  const[lastfil,setlastfil]=useState();
  const[dailywise,setdailywise]=useState();
  const [selectedindex,setSelectedindex]=useState('');
  const [popup,setpopup]=useState([]);
  const [title_model,settitle_model]=useState();
  const [popupmonth,setpopupmonth]=useState('April');
  const [Presentpop,setPresentpop]=useState([])
  const [Absentpop,setAbsentpop]=useState([])
  const [Offpop,setOffpop]=useState([])
  const [loading,setloading]=useState([])
  const options = [
     
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'Septamber' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  const date_pic = [
     
    { value: '01' },
    { value: '02' },
    { value: '03'},
    { value: '04' },
    { value: '5' },
    { value: '6'},
    { value: '7' },
    { value: '8' },
    { value: '9' },
    { value: '10' },
    { value: '11'},
    { value: '12'},
    { value: '13' },
    { value: '14' },
    { value: '15'},
  
  ];
 const year_drop=[
  {value:'2023'},
  {value:'2024'},
  {value:'2025'},
  {value:'2026'},
  {value:'2027'},
  {value:'2028'},

]
const user_filter=[
  {value:'All',label:'1'},
  {value:'Divya',label:'2'},
  {value:'Gnana Prakash',label:'3'},
  {value:'Jaya Praksh',label:'4'},
  {value:'Kiruba',label:'5'},
  {value:'Moorthi',label:'6'},
  {value:'Muthu',label:'7'},
  {value:'Nandhini',label:'8'},
  {value:'Raja',label:'9'},
  {value:'RathiPriya',label:'10'},
  {value:'Vijay',label:'1'},
  {value:'Vinu',label:'11'},
  
]
const Typesof_drop=[
  {value:'Monthly'},
  {value:'Yearly'},
  {value:'Daily'},
  
]
const Last_drop=[
  {value:'Frequent'},
  {value:'User Wise'},
  
]
const handleChange = (event) => {
  const selectedIndex = event.target.selectedIndex;
  setSelectedOption(selectedIndex);
  alert(selectedIndex)
};
const Submit_Process=async(event)=>{
  if (selecteduserwise==1 && selectedFile==1) {
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(selectedIndex);
    console.log(selectedOption)
    setselectedYear(year)
    console.log(selectedYear)
    try {
     
      const response = axios({
        method: "post",
        url: `http://localhost:5000/year_userwise`,
        data: {'year_pass':selectedYear,'Month': show_Month,'User':show_Userlist},
        headers: { 'Content-Type': 'application/json'},
  
      }).then(res=> {
        console.log(res.data.data)
        const chart_data=res.data.data;
        setData(chart_data)
      })
     console.log(response)
  
    } catch (error) {
      console.log(error)
    }
    
  }
  else if (selecteduserwise==0 && selectedFile==1) {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    console.log(formData)
    setSelectedFile(formData)
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/chart_user`,
        data: { 'file': selectedFile },
        headers: { 'Content-Type': "application/json" },

      }).then(res=> {
        console.log(res.data.data)
        const chart_data=res.data.data;
        setData(chart_data)
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  

}
  else if(selecteduserwise==1 ){
    const selectedIndex = event.target.selectedIndex;
    setSelectedOption(selectedIndex);
    console.log(selectedOption)
    setselectedYear(year)
    
    
    console.log(selectedYear)
    try {
     
      const response = axios({
        method: "post",
        url: `http://localhost:5000/date_picker`,
        data: {'year_pass':selectedYear,'Month': show_Month,'User':show_Userlist,'date_picker':selectedDate},
        headers: { 'Content-Type': 'application/json'},
  
      }).then(res=> {
        console.log(res.data.data)
        const chart_data=res.data.data;
        setData(chart_data)
      })
     console.log(response)
  
    } catch (error) {
      console.log(error)
    }

  }
 
  else if(selecteduserwise==0 && selectedFile==0){
  const selectedIndex = event.target.selectedIndex;
  setSelectedOption(selectedIndex);
  console.log(selectedOption)
  setselectedYear(year)
 
  
  console.log(selectedYear)
  try {
   
    const response = axios({
      method: "post",
      url: `http://localhost:5000/summary`,
      data: {'year_pass':selectedYear,'Month': show_Month,'User':show_Userlist},
      headers: { 'Content-Type': 'application/json'},

    }).then(res=> {
      console.log(res.data.data)
      const chart_data=res.data.data;
      setData(chart_data)
    })
   console.log(response)

  } catch (error) {
    console.log(error)
  }
  
}

 
  
}
const [selectedDate, setSelectedDate] = useState('');

function handleDateChange(date) {
  setSelectedDate(date);
  console.log(date)
}
const handleReset = () => {
  getUserdata()
  setSelectedOption('April');
  setselectedUser('All');
  setselectedYear(['2023'])
  settypesFilter('Monthly')
  setSelectedFile('0')
  setshow_Userlist(['0'])
  setshow_Month(['2'])
  setSelectedDate(null)
  setlastfil('Frequent')
  setSelecteduserwise('0')
  
  

  
};
const handleShowon=()=>{
  alert("hi vijay")
}
const [show, setShow] = useState(false);

const handleClose = () => {
  setShow(false);
  setAbsentpop([])
  setPresentpop([])
  setOffpop([])
}


function handleShow(e) {
  
  setShow(true)
  const demochart=e.activeLabel
  settitle_model(demochart)
  setselectedYear(year)
  console.log(selectedYear)
  setloading(true)

  try {
    
    const response = axios({
      method: "post",
      url: `http://localhost:5000/bar_click`,
      data: {'year_pass':selectedYear,'Month': show_Month,'popup_date':demochart},
      headers: { 'Content-Type': 'application/json'},
    
    }).then(res=> {
      
      const chart_data=res.data.data;
      console.log(chart_data)
      setpopup(chart_data)
      setPresentpop(chart_data.Present)
      setAbsentpop(chart_data.Absent)
      setOffpop(chart_data.Off)
      

    })
   console.log(response)

  } catch (error) {
    console.log(error)
  }finally {
  setloading(false);
}

  
}



return (
    <div className="Attend">
     <h1 className="heading_chart">{summary}</h1>
     
     <BarChart
       width={1000}
       height={500}
       data={data}
       onClick={handleShow}
       margin={{ top: 17, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey={selecteduserwise==1?"firstname":"date"}/>
      <YAxis />
      <Tooltip />
      <Legend className="legend_style"/>
      <Bar dataKey="Present" stackId="1" fill="#2e75b5" />
      <Bar dataKey="Absent" stackId="1" fill="#ff999a" />
      <Bar dataKey="Off" stackId="1" fill="#b975fe" />
    </BarChart>
   

   

    {selecteduserwise==0 && selectedFile==0?( <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{popupmonth}&nbsp;{title_model}&nbsp;,{selectedYear}</Modal.Title>
          </Modal.Header>
         <Modal.Body>
          
         <Table  stripped bordered>
      <thead>
        <tr>
          <th>Present</th>
          <th>Absent</th>
          <th>Off</th>
        </tr>
      </thead>
      <tbody>
      
          
    <tr >
      <td className="new_poppre">
         { Presentpop.map(name => (
           
            <tr>
             
             <td >{name}</td>
             </tr>
             
         )
         )}
       </td>
       <td className="absent_stl">
         { Absentpop.map(name => (
           
            <tr>
             
             <td>{name}</td>
             </tr>
             
         )
         )}
       </td>
       <td className="off_stl">
         { Offpop.map(name => (
           
            <tr>
             
             <td> {name}</td>
             </tr>
             
         )
         )}
       </td>
       </tr>
       
       
       
      
 

      </tbody>
    </Table>



          </Modal.Body>
          
       
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>):null}
       
     


      <div className="Overall-dropdown">
     <div className="drop_Chart">
     {(selectedFile ==0) ?  ( <select
          value={selectedOption}
          onChange={e=> {
          const selectedIndex = [e.target.selectedIndex];
          setshow_Month(selectedIndex);
          const options = [...e.target.selectedOptions];
          const values = options.map(option => option.value);
          setYear(year)
          console.warn(year);
          console.warn(show_Month);
          
          // axios.get(`http://localhost:5000/summary/${selectedIndex}/1/${year}`).then(res => {
          // const datares=res.data.data
          // setData(datares)
          // console.log("datares",datares) })
          setSelectedOption(values);
          setpopupmonth(values)
          }
          }
        >
        {options.map((option,index) => (
          <option key={option.value}>
            {option.label}
          </option>
        ))}
      </select>):null}

    
     
    </div>
    <div className={selectedFile==2?"change_yeardrop":"year_dropdown"}>
     <select
          value={selectedYear}
          onChange={e=> {
          const selectedIndex = [e.target.selectedIndex];
          setselectedYear(selectedIndex);
          const options = [...e.target.selectedOptions];
          const year = options.map(option => option.value);
          setYear(year)
          setselectedYear(year);
          
          
          }}
        >
        {year_drop.map((option) => (
          <option key={option.value}>
            {option.value}
          </option>
        ))}
      </select>
     
    </div>
    <div className={selectedFile==1?"onchange_user":"user_filter"}>
     <select
          value={selectedUser}
          onChange={e=> {
          const selectedIndex = [e.target.selectedIndex];
          setshow_Userlist(selectedIndex);
          const user_filter = [...e.target.selectedOptions];
          const user = user_filter.map(option => option.value);
          setselectedUser(user);
          const user1 = user_filter.map(option1 => option1.label);
          console.log(user1)
          
          
          
          }}
        >
        {user_filter.map((option) => (
          <option key={option.value}>
            {option.value}
          
          </option>
        ))}
       
      </select>
     
    </div>
    <div className={selectedFile==2?"onchange_typesfilter":"Typesof_yearfilter"}>
     <select
          value={typesFilter}
          onChange={e=> {
          const selectedIndex = [e.target.selectedIndex];
          console.log("selctfile",selectedIndex)
          setSelectedFile(selectedIndex)
          setshow_Userlist(selectedIndex);
          const Typesof_drop = [...e.target.selectedOptions];
          const user = Typesof_drop.map(option => option.value);
          console.log(user)
          settypesFilter(user);
          console.log(selectedFile)
          
          
          
          }}
        >
        {Typesof_drop.map((option) => (
          <option key={option.value}>
            {option.value}
          
          </option>
        ))}
       
      </select>
     
    </div>
    <div className="Last_filter">
     <select
          value={lastfil}
          onChange={e=> {
          const selectedIndex = [e.target.selectedIndex];
          setshow_daily(selectedIndex);
          setSelecteduserwise(selectedIndex)
          const Last_drop = [...e.target.selectedOptions];
          const user = Last_drop.map(option => option.value);
          console.log(user)
          setlastfil(user);
          console.log(selectedFile)
         
          
          
          }}
        >
        {Last_drop.map((option) => (
          <option key={option.value}>
            {option.value}
          
          </option>
        ))}
       
      </select>
     
    </div>
     
    <div className="date_picker">

    {selecteduserwise==1 &&selectedFile==2?(<DatePicker selected={selectedDate} onChange={handleDateChange} placeholderText="Select Date" />):null}
   
    </div>
    <div className="Submit_Data">
     <Button as="input" type="submit" value="Submit"  className="button_submit" onClick={Submit_Process}/>{' '}
    </div>
    <div className="Reset_Data">
     <Button as="input" type="submit" value="Reset"  className="reset_submit" onClick={handleReset}/>{' '}
    </div>
    </div>
    <div>{select}</div>
    </div>
   
     
  );
};
export default AttendanceChart;


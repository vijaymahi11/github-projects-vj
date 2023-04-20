import React, { useRef ,useState} from "react";
import emailjs from "@emailjs/browser";
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./Contactus.css";
import picture from './images/Contcat_img.jpg';
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Contactus() {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [subject, setSubject] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs
      .sendForm(
        "service_5jydapm",
        "template_diicbrn",
        form.current,
        "1w1-VlggNq99FNz6n"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          alert("Email Sent Successfully")
        },
        (error) => {
          console.log(error.text);
        }
      );
     
  };
  const Reset=()=>{
    setName('');
    setEmail('');
    setSubject('');
    setMsg('');

  }
  const myStyle={
    backgroundImage: `url(${picture})`,
    marginTop:'65px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
const Handle_email=(e)=>{
  e.preventDefault();
  try {
     
    const response = axios({
      method: "post",
      url: `http://localhost:5000/email`,
      data: {'name':Name,'email': email,'subject':subject,'Message':msg},
      headers: { 'Content-Type': 'application/json'},

    }).then(res=> {
     
      const msg=res.data
      if (msg == 'Sent'){
        alert('Your Message Sent Successfully!')

      }
      console.log(res.data)
     
    })
   console.log(response)

  } catch (error) {
    console.log(error)
  }
  
}

  return (
    <div>
    <div style={myStyle} className='Contact_Style'>
     
      
    <form>
   
      <h2 className='head_contact'>Contact Us</h2>
      <div className='body_con'>
      <MDBValidationItem invalid feedback='Please provide your name.'>
        <MDBInput   v-model='name' wrapperClass='mb-4' placeholder='Name'  name="user_name"
         onChange={event => setName(event.target.value)}
            value={Name}  required />
      </MDBValidationItem>

      <MDBValidationItem invalid feedback='Please provide your email.'>
        <MDBInput type='email' placeholder='Email' v-model='email' wrapperClass='mb-4'  name="From_email"
        onChange={event => setEmail(event.target.value)}
        value={email}
         required />
      </MDBValidationItem>

      <MDBValidationItem invalid feedback='Please provide mail subject.'>
        <MDBInput placeholder='Subject' v-model='subject' wrapperClass='mb-4' name="from_name"
        onChange={event => setSubject(event.target.value)}
        value={subject}
        required />
      </MDBValidationItem>
<MDBTextArea wrapperClass='mb-4'  placeholder='Message'  name="message" 
onChange={event => setMsg(event.target.value)}
value={msg}
 />
     

    

      <MDBBtn type='submit' color='primary' block className='my-4' onClick={Handle_email} >
        Submit
      </MDBBtn>
      <MDBBtn type='submit' color='primary' block className="my-5" onClick={Reset} >
        Reset
      </MDBBtn>
      </div>
  
    </form>
     
   
    
    </div>
    </div>
  );
}


import React, { useState, useEffect, props } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./form.css";
import Login from "./login";
import axios, { Axios } from "axios";
import picture from './images/Pro_profile.png';
import ReactLoading from "react-loading";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Form() {
  const [id, setId] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setemail] = useState('')
  const [mobileno, setmobileno] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [password, setpassword] = useState('')
  const [gender, setgender] = useState('')
  const [profile, setProfile] = useState('')
  const [update, setUpdate] = useState('')
  const [button, setButton] = useState('')
  const [msg, setmsg] = useState();
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileno: '',
    country: '',
    city: '',
    password: '',
    country: '',
    gender: '',
    profile: '',

  })
  const [bucket, setBucket] = React.useState(false)
  const updateUser = async (event, currentPage) => {
    const isValid = ValidateCheck()

    if (!isValid) {
      return false
    }

    await axios.put(`http://localhost:5000/userslist/${id}/${1}`, {
      id,
      firstname,
      lastname,
      email,
      mobileno,
      country,
      city,
      password,
      gender,
      profile
    }).then(res => {
      console.log(res);
      console.log(res.data);
      alert(res.data.msg);
      if (res.data.status == 100) {
        setmsg('Already exist email id!')
      }
      if (res.data.status == 200) {
        history("/layout/home");
        console.log('Successfully Register');
      }
    }
    )

    if (selectedFile) {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);
      console.log(formData)
      setSelectedFile(formData)
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/images/${id}`,
          data: { 'file': selectedFile },
          headers: { 'Content-Type': "multipart/form-data" },

        });
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setId(localStorage.getItem('id'))
    setFirstName(localStorage.getItem('firstname'))
    setLastName(localStorage.getItem('lastname'))
    setemail(localStorage.getItem('email'))
    setmobileno(localStorage.getItem('mobileno'))
    setcountry(localStorage.getItem('country'))
    setcity(localStorage.getItem('city'))
    setpassword(localStorage.getItem('password'))
    setgender(localStorage.getItem('gender'))
    setProfile(localStorage.getItem('profile'))
    setUpdate(localStorage.getItem('update'))
    setButton(localStorage.getItem('button'))

    var radios = document.getElementsByName("gender");
    var val = localStorage.getItem('gender');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value == val) {
        radios[i].checked = true;
      }
    }
  }, [])

  const [validations, setValidations] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileno: '',
    password: '',
    city: '',
    gender: '',
    setmsg: ''
  })
  var radios = document.getElementsByName("profile");
  var val = localStorage.getItem('profile');
  console.log(val)
  const validateAll = () => {
    const { firstname, lastname, email, mobileno, password, city, country, gender } = values
    const validations = { firstname: '', lastname: '', email: '', mobileno: '', password: '', city: '', gender: '', setmsg: '' }
    let isValid = true

    if (!firstname) {
      validations.firstname = 'Firstname is required'
      isValid = false
    }

    if (firstname && firstname.length < 3 || firstname.length > 25) {
      validations.firstname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!lastname) {
      validations.lastname = 'Lastname is required'
      isValid = false
    }

    if (lastname && lastname.length < 3 || lastname.length > 25) {
      validations.lastname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }

    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@gmail.com'
      isValid = false
    }
    if (!mobileno) {
      validations.mobileno = 'Mobile no is required'
      isValid = false
    }
    if (mobileno && mobileno.length < 10 || mobileno.length > 10) {
      validations.mobileno = 'Invalid Mobile no'
      isValid = false
    }
    if (!password) {
      validations.password = 'Password is required'
      isValid = false
    }
    if (password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      validations.password = 'Atleast 8 char password'
      isValid = false
    }
    if (!gender) {
      validations.gender = 'Gender is required'
      isValid = false
    }
    if (!city) {
      validations.city = 'City is required'
      isValid = false
    }
    if (!country) {
      validations.country = 'Country is required'
      isValid = false
    }
    if (!isValid) {
      setValidations(validations)
    }

    return isValid
  }
  const ValidateCheck = () => {
    const validations = { firstname: '', lastname: '', email: '', mobileno: '', password: '', city: '', gender: '', profile: '', setmsg: '' }
    let isValid = true
    if (!firstname) {
      validations.firstname = 'Firstname is required'
      isValid = false
    }
    if (firstname && firstname.length < 3 || firstname.length > 25) {
      validations.firstname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!lastname) {
      validations.lastname = 'Lastname is required'
      isValid = false
    }

    if (lastname && lastname.length < 3 || lastname.length > 25) {
      validations.lastname = 'Name must contain between 3 and 25 characters'
      isValid = false
    }
    if (!email) {
      validations.email = 'Email is required'
      isValid = false
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      validations.email = 'Email format must be as example@gmail.com'
      isValid = false
    }
    if (!mobileno) {
      validations.mobileno = 'Mobile no is required'
      isValid = false
    }
    if (mobileno && mobileno.length < 10 || mobileno.length > 10) {
      validations.mobileno = 'Invalid Mobile no'
      isValid = false
    }
    if (!password) {
      validations.password = 'Password is required'
      isValid = false
    }
    if (password && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
      validations.password = 'Atleast 8 char password'
      isValid = false
    }
    if (!gender) {
      validations.gender = 'Gender is required'
      isValid = false
    }
    if (!city) {
      validations.city = 'City is required'
      isValid = false
    }
    if (!country) {
      validations.country = 'Country is required'
      isValid = false
    }
    if (!isValid) {
      setValidations(validations)
    }
    return isValid
  }
  const validateTwo = (e) => {
    const { name } = e.target
    const value = [name]
    let message = ''
    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'firstname' && (value.length < 3 || value.length > 25)) {
      alert("Name must contain between 3 and 25 characters");
    }
    if (value && name === 'lastname' && (value.length < 3 || value.length > 25)) {
      alert('Name must contain 3to 20char');
    }

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      alert('Email format must be as example@mail.com')
    }
    if (value && name === 'mobileno' && !/^[0-9]{10}$/.test(value)) {
      alert("invalid mobile number");

    }
    if (value && name === 'password' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)) {
      alert("invalid password and Weak");
    }
    if (value && name === 'city' && !/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)) {
      alert("invalid city");
    }
  }
  const validateOne = (e) => {

    const { name } = e.target
    const value = values[name]
    let message = ''
    if (!value) {
      message = `${name} is required`
    }

    if (value && name === 'firstname' && (value.length < 3 || value.length > 25)) {
      alert("Name must contain between 3 and 25 characters");
    }
    if (value && name === 'lastname' && (value.length < 3 || value.length > 25)) {
      alert('Name must contain 3to 20char');
    }

    if (value && name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      alert('Email format must be as example@mail.com')
    }
    if (value && name === 'mobileno' && !/^[0-9]{10}$/.test(value)) {
      alert("invalid mobile number");

    }
    if (value && name === 'password' && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(value)) {
      alert("invalid password and Weak");
    }
    if (value && name === 'city' && !/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(value)) {
      alert("invalid city");
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateAll()
    if (!isValid) {
      return false
    }
    let message = ''
    axios.post('http://localhost:5000/data', { values })
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert(res.data.msg);
        if (res.data.status == 400) {
          setmsg('Already exist email id!')
        }
        else {
          setmsg('')
        }
        if (res.data.status == 200) {
          const formData = new FormData();
          formData.append("selectedFile", selectedFile);

          console.log(formData)
          setSelectedFile(formData)
          try {
            const response = axios({
              method: "post",
              url: `http://localhost:5000/photo`,
              data: { 'file': selectedFile },
              headers: { 'Content-Type': "multipart/form-data" },

            });
            console.log(response)

          } catch (error) {
            console.log(error)
          }
          history("/login");
          console.log('Successfully Register');
        }
      })
  }
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [display, setDisplay] = React.useState([]);
  const handleImage = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    console.log(formData)
    setSelectedFile(formData)
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/images/${id}`,
        data: { 'file': selectedFile },
        headers: { 'Content-Type': "multipart/form-data" },

      });
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleFileupdate = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
    setDisplay(URL.createObjectURL(event.target.files[0]))
    console.log(event.target.files[0])
    setValues({ profile: event.target.files[0].name, firstname: values.firstname, lastname: values.lastname, email: values.email, mobileno: values.mobileno, country: values.country, city: values.city, password: values.password, gender: values.gender },
    )
  }
  const handleFileSelect = (event) => {

    setSelectedFile((event.target.files[0]));
    setValues({ profile: event.target.files[0].name, firstname: values.firstname, lastname: values.lastname, email: values.email, mobileno: values.mobileno, country: values.country, city: values.city, password: values.password, gender: values.gender },
    )
  }
  const {
    firstname: firstnameVal,
    lastname: lastnameVal,
    email: emailVal,
    mobileno: mobilenoVal,
    password: passwordval,
    city: cityval,
    country: countryval,
    gender: genderVal
  } = validations
  const navigate = useNavigate();
  function Login() {
    navigate("/login")
  }
  localStorage.setItem('button', 'edit')
  return (

    <div className="container">
      <div class="form-wrap">	
      

        <form className="Latest-regis" >
          {(update == "new") ? (<h1>Signup</h1>) : (<h1>Update Users</h1>)}
          <div class="form-group">
        
            <label>
              {(update == "new") ? (
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="fname-stl" label="Firstname" 

                    type="text"
                    name="firstname"
                    value={firstname}
                    onChange={handleChange}
                    onBlur={validateOne}
                    className="form-control"
                  />
                </Box>
              )
                : (
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                    <TextField id="standard-basic" label="Firstname" variant="standard"

                      name="firstname"
                      value={firstname}
                      onChange={event => setFirstName
                        (event.target.value)}
                      onBlur={validateOne}

                    />
                  </Box>)}
            </label>
            <div>{firstnameVal}</div>
            
          <div className="form-fname">
            <label>
              {(update == "new") ? (<Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <TextField id="standard-basic" label="LastName" 

                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={handleChange}
                  onBlur={validateOne}
                  className="lastnameEdit"
                />
              </Box>) : (<Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <TextField id="standard-basic" label="Lastname" variant="standard"

                  name="lastname"
                  value={lastname}
                  onChange={event => setLastName
                    (event.target.value)}
                  onBlur={validateOne}
                  className="lastnameEdit"

                />
              </Box>)}
            </label>
            <div>{lastnameVal}</div>
          </div>
          </div>
          <div className="email">
            <label>
              {(update == "new") ? (
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="standard-basic" label="Email" 

                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={validateOne}
                  />
                </Box>
              ) : (<Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <TextField id="standard-basic" label="Email" variant="standard"

                  type="email"
                  name="email"
                  value={email}
                  onChange={event => setemail
                    (event.target.value)}
                  onBlur={validateOne}

                />
              </Box>)}
              <div >{msg}</div>
            </label>
            <div>{emailVal}</div>
          </div>
          <div className="password">
            <label>
              {(update == "new") ? (

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="standard-basic" label="Password" 

                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={validateOne}
                    className="mobileEdit"
                  /></Box>



              ) : (<Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <TextField id="standard-basic" label="Password" variant="standard"
                  type="password"
                  name="password"
                  value={password}
                  onChange={event => setpassword
                    (event.target.value)}
                  onBlur={validateOne}
                  className="mobileEdit"
                />
              </Box>
              )}
              <div>{passwordval}</div>
            </label>
          </div>
         
          <div id="form-select">
            <label htmlFor="country"></label>
            <br />
            {(update == "new") ? (<select
              id="country"
              name="country"
              value={country}
              onChange={handleChange}
              onBlur={validateOne}
              className="Countrystyl"  >
            
              <option selected value=""> -- Select Your Country-- </option>
              <option value="India">India</option>
              <option value="Afghanistan ">	Afghanistan</option>
              <option value="Pakistan">Pakistan</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Australia">Australia</option>
              <option value="South Africa">South Africa</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
            </select>) : (<select
              id="country"
              name="country"
              value={country}
              onChange={event => setcountry
                (event.target.value)}
              onBlur={validateOne}
              className="Countrystyl" >
              <option selected value=""> -- Select your Country-- </option>
              <option value="India">India</option>
              <option value="Afghanistan ">	Afghanistan</option>
              <option value="Pakistan">Pakistan</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Australia">Australia</option>
              <option value="South Africa">South Africa</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
            </select>)}
            <div>{countryval}</div>
          </div>
          <br />
          <div className="city">
            <label>
              {(update == "new") ? (

                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="standard-basic" label="City" 
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    onBlur={validateOne}
                    className="CityEdit"
                  />
                </Box>


              ) : (<Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                <TextField id="standard-basic" label="City" variant="standard"
                  type="text"
                  name="city"
                  value={city}
                  onChange={event => setcity
                    (event.target.value)}
                  className="CityEdit"

                />
              </Box>
              )}

            </label>
            <div>{cityval}</div>
          </div>
          
          <br/>
          <div className="phone">
            <label>
              {(update == "new") ? (
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="standard-basic" label="Mobileno" 

                    type="tel"
                    name="mobileno"
                    value={mobileno}
                    onChange={handleChange}
                    onBlur={validateOne}
                    
                  />
                </Box>

              ) : (
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}

                  <TextField id="standard-basic" label="Mobileno" variant="standard"


                    type="tel"
                    name="mobileno"
                    value={mobileno}
                    onChange={event => setmobileno
                      (event.target.value)}
                    onBlur={validateOne}

                  />
                </Box>
              )}
              <div>{mobilenoVal}</div>
            </label>
          </div>
          <div className="gender-radio">
            Gender
            <br />
            <label>
              {(update == "new") ? (<input
                type="radio"
                name="gender"
                className="form-inputs"
                value="Female"
                onChange={handleChange}
                onBlur={validateOne} />) : (<input
                  type="radio"
                  name="gender"
                  className="form-inputs"
                  value="Female"
                  onChange={event => setgender
                    (event.target.value)}
                  onBlur={validateOne} />)}
              Female
            </label>&nbsp;
            <label>
              {(update == "new") ? (
                <input
                  type="radio"
                  name="gender"
                  className="form-inputs"
                  value="Male"
                  onChange={handleChange}
                  onBlur={validateOne}
                ></input>) : (<input
                  type="radio"
                  name="gender"
                  className="form-inputs"
                  value="Male"
                  onChange={event => setgender
                    (event.target.value)}
                  onBlur={validateOne}
                ></input>)}
              Male
            </label>&nbsp;
            <label>
              {(update == "new") ? (
                <input
                  type="radio"
                  name="gender"
                  className="form-inputs"
                  value="others"
                  onChange={handleChange}
                  onBlur={validateOne}
                ></input>) : (<input
                  type="radio"
                  name="gender"
                  className="form-inputs"
                  value="others"
                  onChange={event => setgender
                    (event.target.value)}
                  onBlur={validateOne}
                ></input>)}
              Others
            </label>
            </div>
            <div>{genderVal}</div>
            <br />
           
            <label className="ProEdit" for="img">Upload Your Profile</label>
          
            <div className="imgstl">
            {(update !== "new") ? (
              <div> <label className="picture">
                Change
                <input type="file" id="edit" onChange={handleFileupdate} />
              </label>
                <img src={selectedFile ? display : "http://localhost:5000/images/" + id} height="78px" width="78px" id="show_img" /></div>) : (<div> <label className="picture">
                {selectedFile ? 'Change' : 'Upload'}
                <input type="file" id="edit" onChange={handleFileupdate} />
              </label>
                <img src={selectedFile ? display : picture + id} height="78px" width="78px" id="show_img" /></div>)}
        
          <br />
          <br />
          <br />
          
</div>
`
        </form>
        <Outlet />
        {(update !== "new") ? (<button type="submit" className="updatebtn" onClick={updateUser}>Update</button>) : (<button type="submit" className="registerbtn" onClick={handleSubmit}>Register</button>)}

      </div>

    </div>

  )
}
export default Form;


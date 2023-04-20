import React, { useState, useEffect, props,useCallback } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Update from './Update';
import { useNavigate } from "react-router-dom";
import "./home.css";
import ThreeDRotation from '@mui/icons-material/DeleteSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useSlotProps } from "@mui/base";
import ReactPaginate from 'react-paginate';
import _ from "lodash";
import classnames from 'classnames';
import Pagination from 'react-bootstrap/Pagination';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import myTable from "./myTable.";
import picture from './images/TigmaVj.jpg';
import { ImageGroup, Image } from 'react-fullscreen-image';
import ImageViewer from 'react-simple-image-viewer';
import { createGlobalState } from 'react-hooks-global-state';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  
    backgroundColor:'rgba(50,49,79,255)',
    color: theme.palette.common.white,
    fontSize: 16,
  
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  
    
    
  },
}));
let ImageLink = '';
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
var limit = 2;
function Home() {
  const [page, setpageCount] = useState()
  const [update, setUpdate] = useState([])
  const [product, setProduct] = useState([])
  const [currentPage, setCurrentpage] = useState()
  const [previewImg, setPreviewImg] = useState()
  const getUserdata = async (id,myArray) => {
    const data = await axios.get(`http://localhost:5000/userslist/${id}/${1}`).then(res => {
      console.log(res);
      console.log(res.data.count)
      const  myArray=('Data',res.data.data)
      setProduct(res.data.data)
      const total = res.data.count
      setpageCount(Math.ceil(total / limit));
      console.log(Math.ceil(total / 3));
      setCurrentpage(1);
      return data;
      
  })
  
  }
  
  const pagination = () => {
    setpageCount(page)
  }
  const fetchComments = async (currentPage, id) => {
    const res = await fetch(
      `http://localhost:5000/userslist/${id}/${currentPage}`
   );
    const data = await res.json();
    const data1 = data.data
    console.log(data1)
    return data1;
  };
  const handlePageClick = async (data) => {
    console.log(data)
    console.log(data.selected);
    let currentPage = data.selected + 1;
    console.log(currentPage)
    const commentsFormServer = await fetchComments(currentPage);
    setProduct(commentsFormServer);
};
  function imgedit(currentPage, id) {
    axios.get(`http://localhost:5000/images/${id}/${currentPage}`)
    navigate("/form")
  }
  function userDel(id) {
    alert("deleted")
    axios.delete(`http://localhost:5000/usersdel/${id}`)
      .then(() => {
        getUserdata();
      })
  }
 
  const navigate = useNavigate();
  function handleEdit({ id, firstname, lastname, email, mobileno, country, city, password, gender, update, profile }) {
    localStorage.setItem('id', id)
    localStorage.setItem('firstname', firstname)
    localStorage.setItem('lastname', lastname)
    localStorage.setItem('email', email)
    localStorage.setItem('mobileno', mobileno)
    localStorage.setItem('country', country)
    localStorage.setItem('city', city)
    localStorage.setItem('password', password)
    localStorage.setItem('gender', gender)
    localStorage.setItem('update', 'test')
    
    

    navigate("/form")

  }
  useEffect(() => {
    getUserdata();

  }, [])
 
  useEffect(()=>{
    handlePrev();
  },[])
  const pages = _.range(1, page + 1)
  const handlePage1 = async (currentPage, id) => {
    const res = await fetch(
      `http://localhost:5000/userslist/${id}/${currentPage}`

    );
    const data = await res.json();
    const data1 = data.data
    console.log(data1)
    return data1;
  }
  const handlePrev = async (data) => {
    console.log(data)
    let currentPage = data;
    console.log(currentPage)
    const commentsFormServer = await handlePage1(currentPage);
    setProduct(commentsFormServer);
    setCurrentpage(currentPage);
    }
  const handlePage2 = async (data) => {
    console.log(data)
    let currentPage = data;
    console.log(currentPage)
    const commentsFormServer = await handlePage1(currentPage);
    setProduct(commentsFormServer);
    setCurrentpage(currentPage);
  };

  
  const handleChange = async(id,Status) => {
    console.log('Status ',Status)
    let SendStatus = 'True'
    if (Status == 'True') {
      SendStatus = 'False'
    }
    console.log('SendStatus',SendStatus)
    
    axios.put(`http://localhost:5000/userStatus/${id}`,{SendStatus},
    
    )
    .then(res => {
      console.log(res.data)
     
      
})
    const Pro_Product=product;

    const objIndex = Pro_Product.findIndex((obj => obj.id == id));
    console.log("Before update: ", Pro_Product[objIndex])
    Pro_Product[objIndex].Active_Status = SendStatus;
    console.log("After update: ", Pro_Product[objIndex])
    console.log(Pro_Product)
   
    const updateArray=[...product]
    setProduct(updateArray)

};



const [isViewerOpen, setIsViewerOpen] = useState(false);



const images = [
  ImageLink
 ];
const closeImageViewer = () => {
  setCurrentImage(0);
  setIsViewerOpen(false);
};
const openProfile = useCallback((index,getItem,item) => {
  ImageLink = item
  setCurrentImage(index);
  setIsViewerOpen(true);
}, []);
const initialState = { currentImage: 0 };
const { useGlobalState } = createGlobalState(initialState);
const [currentImage, setCurrentImage] = useGlobalState('currentImage');
console.warn(ImageLink)
  return (
    <div className="tableStl">
      <h1>Users Record Details</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow key={"item.id"}>
             <StyledTableCell >Profile</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile No</StyledTableCell>
              <StyledTableCell align="right">Country</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item,index) => {
              return <StyledTableRow >
              <StyledTableCell  ><div> <img src={"http://localhost:5000/images/" + item.id}  
              onClick={ () => openProfile(1,item,"http://localhost:5000/images/" + item.id) }
              width="72"
              key={ item }
              style={{ margin: '2px',borderRadius:'60px',height:'72px' }}
              alt=""
        />
        
      {isViewerOpen && (
        <ImageViewer
        src={ images}
        disableScroll={ false}
        closeOnClickOutside={ true }
        onClose={ closeImageViewer }
        />
      )}</div> </StyledTableCell>
                <StyledTableCell  >{item.firstname}</StyledTableCell >
                <StyledTableCell align="right">{item.lastname}</StyledTableCell>
                <StyledTableCell align="right">{item.email}</StyledTableCell>
                <StyledTableCell align="right">{item.mobileno}</StyledTableCell>
                <StyledTableCell align="right">{item.country}</StyledTableCell>
                <StyledTableCell align="right">{item.city}</StyledTableCell>
                <StyledTableCell align="right">{item.gender}</StyledTableCell>
               <StyledTableCell align="right"><Stack direction="row" alignItems="center">
                <Switch  onClick={()=>handleChange(item.id, item.Active_Status)}  checked={item.Active_Status == 'True' ? 1 : 0}></Switch>
                </Stack></StyledTableCell>
                <StyledTableCell align="right" className="deleted"><ModeEditOutlinedIcon type='submit' onClick={() => handleEdit(item)}>Edit</ModeEditOutlinedIcon></StyledTableCell>
                <StyledTableCell align="right" className="deleted"><DeleteIcon onClick={() => userDel(item.id)}>Delete</DeleteIcon></StyledTableCell>
                </StyledTableRow>
              })}
          </TableBody>
          </Table>
        </TableContainer>
      <nav className="nav-pagination">
        <div className="page-list">
          <ul>
            <li className={currentPage > 1 ? "" : "Page-Disable"}><div ><BsFillArrowLeftCircleFill onClick={() => handlePrev(currentPage - 1)} /></div></li>
              {
              pages.map((page, i) => (
                <li className={page == currentPage ? "pagiantion_selected" : "pagination_unselected"}
                onClick={() => handlePage2(page)} >{page}</li>))

            }
            <li className={currentPage < page ? "" : "Page-Disable"}><BsFillArrowRightCircleFill onClick={() => handlePrev(currentPage + 1)} /></li>
          </ul>
          </div>
      </nav>
      {/* <ReactPaginate 
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      /> */}
             
           
      
</div>
      
  );
}
export default Home;  

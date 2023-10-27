import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addImageApi, getImageApi } from '../services/allApi';
import axios from 'axios';


function Home() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [image, setImage] = useState("")

  const setData = (e) => {


    setImage(e.target.files[0])

  }
  // console.log(image);
  const add = async (e) => {
    e.preventDefault()

    const email = localStorage.getItem('email')

    const headerConfig = {
      "Content-Type": "multipart/form-data"
    }
    const data = new FormData()

    data.append("email", email)
    data.append("user_image", image)

    const result = await addImageApi(data, headerConfig)
    alert(result.data);
    handleClose()

  }

  // state to store image from backend
  const [backendImage, setBackendImage] = useState()
  
const getImage = async () => {

  const email=localStorage.getItem('email')

   
  const result = await  getImageApi(email)
  setBackendImage(result);
  console.log(result);


}

  useEffect(() => {
    
    getImage()
  }, [])


  // console.log(backendImage);


  return (
    <div>
      <div>
        <img src="https://i.postimg.cc/pX8vFKzk/image1-1170x508.png" style={{ width: '100%', height: '300px' }} alt="" />
      </div>
      <div className='text-center my-4'>
        <h3>A personal photo collection is a time capsule of your life, each picture a unique story waiting to be rediscovered, relived, and cherished.</h3>
      </div>
      <hr />
      <div className='text-center my-4'>
        <h4>Add Photo Here</h4>
        <Button onClick={handleShow} className=' bg-transparent border-0'><i class="fa-solid fa-circle-plus fa-2xl" style={{ color: 'black' }} ></i></Button>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                onChange={(e) => setData(e)}
                name="image"
                type="file"
                autoFocus
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={add}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}

export default Home
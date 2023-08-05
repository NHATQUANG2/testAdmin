import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import {toast} from 'react-toastify'
import { postAddNewUser } from '../components/services/UserSevice'
import './modal.scss'

const ModalAddNew = (props) => {
    const { isShowModalAddNew, handleClose, setIsShowModalAddNew,handleUpdatePage } = props

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleSaveUser = async () => {
        let response = await postAddNewUser(name,email,password)
        console.log('name',name,'email',email,'password',password);
        console.log("check res" , );
        if(response && response.status === 200){
            toast.success(response.message)
            setIsShowModalAddNew(false)
            handleUpdatePage()
            setName('')
            setEmail('')
            setPassword('')


        }else{
            toast.error('something went wrong!')
        }

    }
    return (
        <div>
            <Modal
                show={isShowModalAddNew}
                onHide={handleClose}
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name'
                         value={name}
                         onChange={(e)=> setName(e.target.value)}
                         type='text' className='form-control' />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                         type='text' className='form-control' />
                    </div>
                    <div className=' input-pass'>
                        <label htmlFor='password'>Password</label>
                        <input id='password'
                         value={password}
                         onChange={(e)=> setPassword(e.target.value)}
                         type={isShowPassword ? 'text' : 'password'} className='form-control input-pass' />
                         <i onClick={()=>setIsShowPassword(!isShowPassword)} class={`fa-solid ${isShowPassword ? 'fa-eye':'fa-eye-slash'} `}></i>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveUser()} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddNew
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { deleteUser } from '../components/services/UserSevice'

const ModalDelete = (props) => {
    const {handleClose, isShowModalDeleteUser,dataDeleteUser, handleUpdatePage} = props
    const handleDeleteUser = async () =>{
        let response = await deleteUser(dataDeleteUser.id)
        if (response && response.status === 200){
            toast.success(response.message)
            handleClose()
            handleUpdatePage()
        }
    }
  return (
    <div>
         <Modal
                show={isShowModalDeleteUser}
                onHide={handleClose}
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                       This action can't be undone!
                       Do want to delete this user ? <br/> <b>email = {dataDeleteUser.email}?</b>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default ModalDelete
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { putEditUser } from '../components/services/UserSevice'
import { toast } from 'react-toastify'

const ModalEditUser = (props) => {
    const { isShowModalEditUser, handleClose,setIsShowModalEditUser, dataEditUser, handleUpdatePage } = props
    const [name, setName] = useState()
    

    useEffect(() => {
        if (dataEditUser) {
            setName(dataEditUser.name)
        }
    }, [dataEditUser])

    const handleSaveUser = async () => {
        let response = await putEditUser(dataEditUser.id, name)
        if (response && response.status === 200) {
            toast.success(response.message)
            setIsShowModalEditUser(false)
            handleUpdatePage()
           
        }

    }
    return (
        <div>
            <Modal
                show={isShowModalEditUser}
                onHide={handleClose}
                backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text' className='form-control' />
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

export default ModalEditUser
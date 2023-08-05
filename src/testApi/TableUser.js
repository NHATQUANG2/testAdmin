
import React, { useEffect, useState } from 'react'
import { getUser } from '../components/services/UserSevice'
import ModalAddNew from './ModalAddNew'
import ReactPaginate from 'react-paginate';
import './table.scss'
import ModalEditUser from './ModalEditUser';
import ModalDelete from './ModalDelete';

const TableUser = () => {
    const [userList, setUserList] = useState([])
    const [listTotal, setListTotal] = useState([])
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false)
    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false)

    const [dataEditUser, setDataEditUser] = useState({})
    const [dataDeleteUser, setDataDeleteUser] = useState({})
    useEffect(() => {
        getAllUser(1)
    }, [])
    const getAllUser = async (page) => {
        let response = await getUser(page)
        console.log(response);
        if (response && response.status === 200) {
            setListTotal(response.user.last_page)
            setUserList(response.user.data)
        }
    }

   const handleClose = () =>{
    setIsShowModalAddNew(false)
    setIsShowModalEditUser(false)
    setIsShowModalDeleteUser(false)
   }
   const handlePageClick = (event) => {
    getAllUser(+event.selected +1)
   }
   const handleUpdatePage = () => {
    getAllUser(1)
   }
   const handleDataEditUser = (data) => {
    setIsShowModalEditUser(true)
    setDataEditUser(data)
   }
   

 const handleDataDeleteUser = (data) =>{
    setIsShowModalDeleteUser(true)
    setDataDeleteUser(data)
 }
    return (

        <>
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <span>List User</span>
                    <div>
                        <button className="btn btn-success" onClick={()=>setIsShowModalAddNew(!isShowModalAddNew)}>Add new</button>
                    </div>
                </div>
            </div>
            <div>
                {userList.length > 0 ? (
                     <table className='table mx-2' >
                     <thead>
                         <tr>
                             <th>#</th>
                             <th>First Name</th>
                             <th>Last Name</th>
                             <th>Username</th>
                         </tr>
                     </thead>
                     <tbody>
                         {userList && userList.length > 0 && userList.map((item, index) => {
                             return (
                                 <tr>
                                     <td>{item.id}</td>
                                     <td>{item.name}</td>
                                     <td>{item.email}</td>
                                     <td>
                                         <button className='btn btn-warning mx-1' onClick={()=> handleDataEditUser(item)}>edit</button>
                                         <button className='btn btn-danger' onClick={()=> handleDataDeleteUser(item)}>delete</button>
                                     </td>
                                 </tr>
                             )
                         })}
                        
                     </tbody>
                 </table>
                ):(
                    <div className='d-flex justifly-content-center align-items-center'>
                    <h4 className='text-center'> Không có dữ liệu </h4>
                </div>
                )}
               
                <ModalAddNew 
                isShowModalAddNew={isShowModalAddNew}
                handleClose={handleClose}
                setIsShowModalAddNew={setIsShowModalAddNew}
                handleUpdatePage={handleUpdatePage}
                />
                <ModalEditUser
                isShowModalEditUser={isShowModalEditUser}
                setIsShowModalEditUser={setIsShowModalEditUser}
                handleClose={handleClose}
                handleUpdatePage={handleUpdatePage}
                dataEditUser= {dataEditUser}
                />
               <ModalDelete
                handleClose={handleClose}
                isShowModalDeleteUser={isShowModalDeleteUser}
                dataDeleteUser={dataDeleteUser}
                handleUpdatePage={handleUpdatePage}
               />
                 <ReactPaginate
        nextLabel="next >"
        onPageChange={ handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={listTotal}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
            </div>
        </>
    )
}

export default TableUser
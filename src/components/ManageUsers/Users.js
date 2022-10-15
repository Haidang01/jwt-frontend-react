import './Users.scss';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DeleteUser, fetchAllUser } from '../../services/userService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModelDelete from './ModelDelete';
import ModalUser from './ModalUser';
import { UserContext } from '../../Context/UserContext'
const Users = (props) => {
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [totalPage, setTotalPage] = useState(0);// so luong page
    const [showDelete, setShowDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [fixtam, setfixtam] = useState(0);
    const [actionModalUser, setActionModelUser] = useState('');
    const [dataModalEdit, setDataModalEdit] = useState({});
    const handleClose = () => setShowDelete(false);
    useEffect(() => {
        fetchUser()

    }, [currentPage, fixtam])


    // const { user } = React.useContext(UserContext);
    // console.log('>>>', user);
    const fetchUser = async () => {
        let res = await fetchAllUser(currentPage, currentLimit);
        console.log('>>> res ', res);
        if (res && res && res.EC === 0) {
            setListUser(res.DT.users);

            // console.log(res.DT.users);
            setTotalPage(res.DT.totalPages)
        }

    }
    const handlePageClick = (event) => {
        // console.log('>>>check data click ', event);
        setCurrentPage(event.selected + 1)
    }
    const handleShowDelete = (user) => {
        setShowDelete(true);
        setDataDelete(user);
    }
    const confirmDeleteUser = async () => {
        setShowDelete(false)
        let res = await DeleteUser(dataDelete.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setfixtam(listUser)
        } else {
            toast.error(res.EM);
        }
    }
    const onHideModelUser = () => {
        setIsShowModalUser(false)
        setActionModelUser('');


    }
    const handleShowEdit = (user) => {
        // console.log('>>> check dtat user', user);
        setIsShowModalUser(true);
        setDataModalEdit(user)
        setActionModelUser('UPDATE')
    }
    return (
        <div className='container'>
            <div className='manage-users-container'>
                <div className='user-header'>
                    <div className='title mt-4'>
                        <h3>Manage user</h3>
                    </div>
                    <div className='acctions'>
                        <button className='btn btn-success my-3 ' onClick={() => { window.location.reload() }}>
                            <i className="fa fa-refresh m-2" aria-hidden="true"></i>
                            Refesh
                        </button>
                        <button className='btn btn-primary mx-2' onClick={() => {
                            setIsShowModalUser(true); setActionModelUser('CREATE');
                        }}>
                            <i className="fa fa-plus-circle m-2" aria-hidden="true"></i>
                            Add new user</button>

                    </div>
                </div>
                <div className='user-body'>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>NO</th>
                                <th scope="col" className='text-center'>ID</th>
                                <th scope="col" className='text-center'>Email</th>
                                <th scope="col" className='text-center'>Username</th>
                                <th scope="col" className='text-center'>Group</th>
                                <th scope="col" className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td className='text-center'>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td className='text-center'>{item.id}</td>
                                                <td >{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.Group ? item.Group.name : ''}</td>
                                                <td>
                                                    <button className='btn btn-warning  mx-4' onClick={() => handleShowEdit(item)} >
                                                        <i className="fa fa-pencil m-2" aria-hidden="true"></i>
                                                    </button>
                                                    <button className='btn btn-danger' onClick={() => handleShowDelete(item)}>
                                                        <i className="fa fa-trash-o m-2" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                                :
                                <>
                                    <tr><td>Not found user</td></tr>
                                </>
                            }


                        </tbody>
                    </table>
                </div>
                {totalPage > 0 &&
                    <div className='user-footer padding'>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPage}
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
                }
                <ModelDelete
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    handleClose={handleClose}
                    confirmDeleteUser={confirmDeleteUser}
                    dataDelete={dataDelete}
                />
                <ModalUser

                    onHideModelUser={onHideModelUser}
                    isShowModalUser={isShowModalUser}
                    setfixtam={setfixtam}
                    action={actionModalUser}
                    dataModalEdit={dataModalEdit}
                />
            </div>
        </div >
    );
}

export default Users;
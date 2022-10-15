import { useEffect, useState } from "react";
import { fetchAllRole, DeleteRole } from '../../services/roleService'

const TableRole = () => {
    const [listRole, setListRole] = useState('');
    const handleShowDelete = () => {

    }
    useEffect(() => {
        getAllRole();
    }, [])
    const getAllRole = async () => {
        let res = await fetchAllRole();
        if (res.EC === 0) {
            setListRole(res.DT);
        }
    }
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>ID</th>
                        <th scope="col" className='text-center'>URL</th>
                        <th scope="col" className='text-center'>Description</th>
                        <th scope="col" className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listRole && listRole.length > 0 ?
                        <>
                            {listRole.map((item, index) => {
                                return (
                                    <tr key={`row-${index}`}>
                                        <td className='text-center'>{item.id}</td>
                                        <td >{item.id}</td>
                                        <td>{item.url}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button className='btn btn-warning  mx-4' >
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
                            <tr><td colSpan={4}>Not found Roles</td></tr>
                        </>
                    }


                </tbody>
            </table>
        </>
    )
}
export default TableRole;
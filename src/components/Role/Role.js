import { useEffect, useState } from 'react';
import _, { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import './Role.scss';
import { toast } from 'react-toastify';
import { createRoles, readRole } from '../../services/roleService'
import TableRole from './TableRole'
const Role = (props) => {
    const dataChildDefault = { url: '', description: '', isValidUrl: false }

    const [listChild, setListCHild] = useState({
        child1: dataChildDefault,
    })
    const handleOnChangeInput = (name, value, key) => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[key][name] = value;
        if (name && value) {
            _listChild[key]['isValidUrl'] = false;
        }
        setListCHild(_listChild);
    }
    const handleAddNewInput = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = dataChildDefault;
        setListCHild(_listChild);
    }
    const handleDeleteInput = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListCHild(_listChild)
    }
    const builData = () => {
        let _listChild = _.cloneDeep(listChild);
        let result = [];
        Object.entries(_listChild).map(([key, value], index) => {
            result.push({
                url: value.url,
                description: value.description
            })
        })
        return result;
    }
    const handleSave = async () => {
        // console.log('>>>', listChild);
        let check = true;
        let invalidObj = Object.entries(listChild).find(([key, value], index) => {
            return value && !value.url;
        })
        if (!invalidObj) {
            let data = builData();
            // console.log(data);
            // call api

            console.log('>>>.dât', data);
            let res = await createRoles(data);
            console.log('>>> res', res);
            if (res) {
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }


        } else {
            //error
            toast.error('Input URL must not be empty ...')
            const key = invalidObj[0];
            let _listChild = _.cloneDeep(listChild);
            _listChild[key]['isValidUrl'] = true;
            setListCHild(_listChild);
        }
    }

    return (
        <div className='role-container'>
            <div className='container'>
                <div className=' mt-4'>
                    <h4>Add a new role</h4>
                    <div className='col-12 role-parent'>
                        {Object.entries(listChild).map(([key, value], index) => {
                            return (
                                <div className={`role-child row ${key}`} key={`child-${key}`}>
                                    <div className='col-5 form-group'>
                                        <label>URL:</label>
                                        <input
                                            type='text'
                                            className={value.isValidUrl === false ? 'form-control' : 'form-control is-invalid'}
                                            value={value.url}
                                            onChange={(event) => handleOnChangeInput('url', event.target.value, key)}
                                        >
                                        </input>
                                    </div>
                                    <div className='col-5 form-group'>
                                        <label>Description:</label>
                                        <input type='text'
                                            className='form-control'
                                            value={value.description}
                                            onChange={(event) => handleOnChangeInput('description', event.target.value, key)}
                                        >

                                        </input>
                                    </div>
                                    <div className='col-2 mt-4 actions'>
                                        <i className="fa fa-plus-circle add" aria-hidden="true"
                                            onClick={() => handleAddNewInput()}
                                        ></i>
                                        {index >= 1 &&
                                            <i className="fa fa-trash-o delete" aria-hidden="true"
                                                onClick={() => handleDeleteInput(key)}
                                            ></i>}
                                    </div>
                                </div>
                            )
                        })}

                        < div >
                            <button className='btn btn-warning mt-3' onClick={() => handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='mt-3'>
                    <h4>List Current Roles</h4>
                    <TableRole />
                </div>

            </div >
        </div>
    )
}
export default Role;
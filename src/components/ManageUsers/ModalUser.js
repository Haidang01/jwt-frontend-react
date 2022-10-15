import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { fetchGroup, CreateNewUser, updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';
const ModalUser = (props) => {
    const { action, dataModalEdit } = props;
    const defaultUserDate = {
        email: '',
        phone: '',
        username: '',
        password: '',
        sex: 'Male',
        address: '',
        group: '3'
    }
    const [userGroup, setUserGroup] = useState([]);
    const [userData, setUseData] = useState(defaultUserDate);
    const validInputDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        sex: true,
        address: true,
        group: true
    }
    const [validInput, setValidInput] = useState(validInputDefault);
    const checkValidateInput = () => {
        // create user 
        if (action === 'UPDATE') return true
        setValidInput(validInputDefault)
        let arr = ['email', 'phone', 'username', 'password', 'group'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                // cap nhat arrinput
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[arr[i]] = false;
                setValidInput(_validInputs);

                toast.error(`Empty input ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }
    // save
    const handleCofirmUser = async () => {
        let check = checkValidateInput();
        if (check === true) {
            let res = action === 'CREATE' ?
                await CreateNewUser({ ...userData, groupId: userData['group'] }) :
                await updateCurrentUser({ ...userData, groupId: userData['group'] });
            // console.log('>>> check res ', res);
            if (res && res.EC === 0) {
                props.setfixtam(defaultUserDate)
                props.onHideModelUser();
                setUseData(defaultUserDate)
                toast.success(res.EM);
            }
            else {
                toast.error(res.EM)
                let _validInputs = _.cloneDeep(validInputDefault);
                _validInputs[res.DT] = false;
                setValidInput(_validInputs);

            }
        }
    }
    useEffect(() => {
        getGroups();

    }, [])
    useEffect(() => {

        // console.log('>>> action', action);
        if (action === 'UPDATE') {
            setUseData({ ...dataModalEdit, group: dataModalEdit.Group ? dataModalEdit.Group.id : '' })
        }
        if (action === 'CREATE') {
            setUseData(defaultUserDate)
        }

    }, [action])


    const getGroups = async () => {
        let res = await fetchGroup();
        if (res && res.EC === 0) {
            setUserGroup(res.DT);
        } else {
            toast.error(res.EM);
        }
    }
    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUseData(_userData);
    }
    const handleCloseModalUser = () => {
        props.onHideModelUser();
        setValidInput(validInputDefault)

    }
    return (
        <Modal
            size="lg"
            show={props.isShowModalUser}
            onHide={handleCloseModalUser}
            className='modal-user'
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.action === 'CREATE' ? 'Create new user' : 'Edit new user'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='content-body row'>
                    <div className='col-12 col-sm-6 form-group ' >
                        <label>Email</label>
                        <input
                            disabled={action === 'CREATE' ? false : true}
                            className={validInput.email ? 'form-control ' : 'form-control is-invalid'}
                            type='email'
                            value={userData.email}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group '  >
                        <label>Phone number</label>
                        <input
                            disabled={action === 'CREATE' ? false : true}
                            className={validInput.phone ? 'form-control ' : 'form-control is-invalid'}
                            type='text'
                            value={userData.phone}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}

                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group mt-3' >
                        <label>Username</label>
                        <input
                            className={validInput.username ? 'form-control ' : 'form-control is-invalid'}
                            type='email'
                            value={userData.username}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'username')}

                        />
                    </div>
                    {action === 'CREATE' &&
                        <div className='col-12 col-sm-6 form-group mt-3' >
                            <label>Password</label>
                            <input
                                className={validInput.password ? 'form-control ' : 'form-control is-invalid'}
                                type='password'
                                value={userData.password}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'password')}

                            />
                        </div>}
                    <div className='col-12 form-group mt-3' >
                        <label>Address</label>
                        <input
                            className='form-control'
                            type='text'
                            value={userData.address}
                            onChange={(event) => handleOnChangeInput(event.target.value, 'address')}

                        />
                    </div>
                    <div className='col-12 col-sm-6 form-group mt-3' >
                        <label>Gender</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(event) => handleOnChangeInput(event.target.value, 'sex')}
                            value={userData.sex}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className='col-12 col-sm-6 form-group mt-3' >
                        <label>Group</label>
                        <select
                            className={validInput.group ? 'form-control ' : 'form-control is-invalid'}
                            aria-label="Default select example"
                            onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
                            value={userData.group}
                        >
                            {userGroup && userGroup.length > 0 && userGroup.map((item, index) => {
                                return (
                                    <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalUser}>
                    Close
                </Button>
                <Button
                    onClick={() => handleCofirmUser()}
                >
                    {action === 'CREATE' ? 'Save' : 'Update'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalUser;
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModelDelete = (props) => {

    return (
        <>
            <Modal show={props.showDelete} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comfirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Are you sure to delete this user? <br />{props.dataDelete.email}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModelDelete;
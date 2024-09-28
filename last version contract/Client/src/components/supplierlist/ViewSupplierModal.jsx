// components/ViewSupplierModal.jsx

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from "@mui/material";
import { getOneSupplier } from "../../Redux/actions/supplier";

const ViewSupplierModal = ({ open, handleClose, supplierId }) => {
    const dispatch = useDispatch();
    const supplier = useSelector((state) => state.supplierReducer.supplierToGet);

    useEffect(() => {
        if (supplierId) {
            dispatch(getOneSupplier(supplierId));
        }
    }, [dispatch, supplierId]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Card sx={{ maxWidth: 345, margin: "auto", mt: 5 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                        alt="supplier"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Full Name: {supplier.fullname}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {supplier.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {supplier.tel}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}

export default ViewSupplierModal;

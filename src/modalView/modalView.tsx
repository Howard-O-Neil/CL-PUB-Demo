import React, { ChangeEvent, FormHTMLAttributes, useContext, useEffect } from "react";
import styles from "./modalView.module.scss";
import { AppContext } from "@/AppContext";
import { Box, Modal, Typography } from "@mui/material";
import SignIn from "@/signin/signin";
import SignUp from "@/signup/signup";
import ForgotPass from "@/forgotPass/forgotPass";

const account_modal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
};

const ModalView = () => {
    const [appState, dispatch] = useContext(AppContext)

    return (
        <div>

            <Modal
                open={appState.is_open_signup}
                onClose={() => dispatch({type: "handle_close_signup", value: undefined})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={account_modal}>
                    <SignUp />
                </Box>
            </Modal >

            <Modal
                open={appState.is_open_signin}
                onClose={() => dispatch({type: "handle_close_signin", value: undefined})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={account_modal}>
                    <SignIn />
                </Box>
            </Modal >

            <Modal
                open={appState.is_open_resetForm}
                onClose={() => dispatch({type: "handle_close_resetForm", value: undefined})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={account_modal}>
                    <ForgotPass />
                </Box>
            </Modal >

        </div >
    )
}

export default ModalView;
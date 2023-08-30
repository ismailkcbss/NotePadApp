import React from 'react'

export default function CheckRegister() {

    return (
        <div
            style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <img
                    src=" https://firebasestorage.googleapis.com/v0/b/notepadapp-96bda.appspot.com/o/RegisterCheck.png?alt=media&token=e3d45d64-5262-4d1d-bade-976b473b1ae4"
                    alt="Register Success"
                    style={{ width: "25em" }}
                />
            </div>
            <h1>Your Account Has Been Confirmed.</h1>
            <h4>You can login</h4>
            
        </div>
    )
}

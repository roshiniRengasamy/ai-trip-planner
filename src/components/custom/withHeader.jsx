import React from "react";
import Header from "./header";

const WithHeader = (WrapperComponent) => {
    return (props) => (
        <>
            <Header />
            <WrapperComponent {...props} />
        </>
    )
}

export default WithHeader
import React from "react";
import Header from "./header";

const WithHeader = (WrapperComponent) => {
    return (props) => (
        <div className="w-screen flex flex-col min-h-screen">
            <Header />
            <WrapperComponent {...props} />
        </div>
    )
}

export default WithHeader
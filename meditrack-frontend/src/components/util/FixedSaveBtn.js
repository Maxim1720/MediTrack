import {FormSaveBtn} from "../form/FormSaveBtn";
import React from "react";

export default function FixedSaveBtn(){
    return(
        <div className="position-fixed bottom-0 start-50 end-50">
            <FormSaveBtn/>
        </div>
    );
}
import Item from "views/components/Item";
import PatientProfile from "views/Treatment/PatientProfile";
function RegisterPatientModal(props){

    return(
        <>
        
        <PatientProfile/>
        <div className="d-flex justify-content-end mt-2">
            <button className="btn btn-outline-dark btn-sm">등록</button>
        </div>
        </>
    )
}

export default RegisterPatientModal;
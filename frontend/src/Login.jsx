import React from 'react'

export default function Login({ setIsLogged, setLogin, login}) {
    const log = () => {
        if (login !== "") {
            setIsLogged(true);
            setLogin(login);
            sessionStorage.setItem('login', login);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3">
                    <div className="card px-5 py-5" id="form1">
                        <div className="form-data">
                            <div className="forms-inputs mb-3"> <span>Username</span>
                                <input type="text" onChange={(e) => setLogin(e.target.value)}/>
                            </div>
                            <div className="mb-3"> <button className="btn btn-dark w-100" onClick={log}>Login</button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
const AcceptInvestor = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getData() {
            var response = await fetch(`${process.env.REACT_APP_URL}/admin/getInvestor`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            var data = await response.json()
            
            // console.log(data[0].roleId.linkedInUrl);
            setUsers(data.message)

        }
        getData()

    }, []);

    const handleAccept = async (id) => {
        console.log(id);
        
        if (window.confirm("Are you sure you want to accept?")) {
            var response = await fetch(`http://localhost:5002/admin/accptOrRejectInvestor/${id}/${true}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            var data = await response.json()
            console.log(data);
            setUsers(users.filter(item => item._id !== id));
        }
    };

    const handleReject = async(id) => {
          
        if (window.confirm("Are you sure you want to accept?")) {
            var response = await fetch(`http://localhost:5002/admin/accptOrRejectInvestor/${id}/${false}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            var data = await response.json()
            console.log(data);
            setUsers(users.filter(item => item._id !== id));

        }
    };

    return (

        <div className="container mt-4" >
            <h1 className="text-center mt-3 mb-3">Investor Verification</h1>
            {users.length == 0 && <p className="text-center no">No Investor Pending For Verification</p>}
            { users.length >0 && users.map((user) => (
                <div
                    key={user._id}
                    className="d-flex align-items-center justify-content-between border p-3 mb-3   list "
                >
                    {/* Left Side: Image */}
                    <img
                        src={user.profilePhoto} // Dummy round image
                        alt="User"
                        className="me-3 userImg"

                    />

                    {/* Middle Section: User Info */}
                    <div className="flex-grow-1">
                        <h5 className="mb-1">{user.userName} <span style={{ fontSize: "14px", color: "gray" }}>{user.roleId.investorType}</span></h5>
                        <a href={user.roleId.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
                            LinkedIn Profile
                        </a>
                        {user.roleId.domainEmail != "" && <p>Domain Email :- {user.roleId.domainEmail}</p>}
                        {user.roleId.websiteUrl != "" && <p>website URL :- {user.roleId.websiteUrl}</p>}
                    </div>

                    {/* Right Side: Buttons */}
                    <div>
                        <button className="btn btn-success me-2" onClick={()=>handleAccept(user._id)}>Accept</button>
                        <button className="btn btn-danger" onClick={()=>handleReject(user._id)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AcceptInvestor;

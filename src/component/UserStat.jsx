import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const UserStat = () => {
    const [counts, setCounts] = useState({
        loading: false,
    });

    async function download() {
        console.log("download");


        try {
            var response = await fetch(`${process.env.REACT_APP_URL}/admin/convertUserDataToExcel`)
            const blob = await response.blob();
            console.log(response.status);
            console.log(blob);

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'userdetails.csv'; // file name you want
            document.body.appendChild(a);
            a.click();
            a.remove();
            // console.log(response.status);
            if(response.status == 200){
                toast.success("File downloaded successfully")
            }
            
        }
        catch (e) {
            console.log(e);

        }
    }

    const fetchCounts = async () => {

        async function getData() {
            try {
                var response = await fetch(`${process.env.REACT_APP_URL}/admin/getUserCounts`)
                var data = await response.json()
                setCounts(data.message)
            }

            catch (e) {
                console.log(e);

            }
        }
        getData()



    };

    useEffect(() => {
        fetchCounts();
    }, []);

    const RoleCard = ({ count, title, icon, color }) => (
        <div className={`card border-left-${color} shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                            {title}
                        </div>
                        <div className="h2 mb-0 font-weight-bold text-gray-800">
                            {counts.loading ? (
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                count
                            )}
                        </div>
                    </div>
                    <div className="col-auto">
                        <FontAwesomeIcon icon={icon} size="2x" className={`text-${color}`} />
                    </div>
                </div>
            </div>
        </div>
    );

    if (counts.error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error loading data: {counts.error}
            </div>
        );
    }

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-xl-4 col-md-6 mb-4">
                    <RoleCard
                        count={counts.all}
                        title="All Users"
                        icon={faUsers}
                        color="primary"
                    />
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <RoleCard
                        count={counts.Investor}
                        title="Investor "
                        icon={faUserPlus}
                        color="success"
                    />
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <RoleCard
                        count={counts.Founder}
                        title="Founder"
                        icon={faUserShield}
                        color="info"
                    />
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <RoleCard
                        count={counts.CommunityMember}
                        title="Members"
                        icon={faUserShield}
                        color="info"
                    />
                </div>
                <div className="col-xl-4 col-md-6 mb-4">
                    <RoleCard
                        count={counts.Jobseeker}
                        title="Job seekers"
                        icon={faUserShield}
                        color="info"
                    />
                </div>
            </div>

            <p className='text-center my-5'><button onClick={download} className='btn btn-outline-success'>Download user data in CSV</button></p>
        </div>
    );
};

export default UserStat;
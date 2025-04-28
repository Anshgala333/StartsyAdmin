import React, { useEffect, useState } from 'react';
import "../styles/betaRating.css"; // Import custom CSS for styling

export default function BetaRating() {
    const [ratings, setRatings] = useState([]);
    const [filteredRatings, setFilteredRatings] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [sortOrder, setSortOrder] = useState('time-asc'); // time-asc, time-desc, rating-asc, rating-desc

    useEffect(() => {
        async function getData(params) {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/admin/getBetaRating`);
                const data = await response.json();
                console.log(data);

                setRatings(data.message);
                setFilteredRatings(data.message); // Initially show all ratings
            }
            catch (e) {
                console.log(e);
            }
        }
        getData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    // Handle role filter
    const handleRoleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role);
        if (role) {
            setFilteredRatings(ratings.filter(rating => rating.userId.role === role));
        } else {
            setFilteredRatings(ratings); // Reset to all ratings if no filter
        }
    };

    // Handle sorting
    const handleSortChange = (event) => {
        const sortType = event.target.value;
        setSortOrder(sortType);

        let sortedRatings = [...filteredRatings];
        if (sortType === 'time-asc') {
            sortedRatings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sortType === 'time-desc') {
            sortedRatings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortType === 'rating-asc') {
            sortedRatings.sort((a, b) => a.ratingStars - b.ratingStars);
        } else if (sortType === 'rating-desc') {
            sortedRatings.sort((a, b) => b.ratingStars - a.ratingStars);
        }
        setFilteredRatings(sortedRatings);
    };

    return (
        <div className="container-fluid my-2 mx-3">
            <h2 className="text-center mb-4">Beta Rating</h2>

            {/* Filter and Sort Controls */}
            <div className="d-flex mb-4 " style={{width : "95%"}}>
                <div className="col-6 mx-2">
                    <select
                        className="form-control"
                        value={selectedRole}
                        onChange={handleRoleChange}
                    >
                        <option value="">Filter by Role</option>
                        <option value="Investor">Investor</option>
                        <option value="Founder">Founder</option>
                        <option value="CommunityMember">CommunityMember</option>
                        <option value="Job seeker">Job seeker</option>
                        <option value="Admin">Admin</option>
                        {/* Add more roles here if needed */}
                    </select>
                </div>
                <div className="col-6 mx-2">
                    <select
                        className="form-control"
                        value={sortOrder}
                        onChange={handleSortChange}
                    >
                        <option value="time-asc">Sort by Time (Ascending)</option>
                        <option value="time-desc">Sort by Time (Descending)</option>
                        <option value="rating-asc">Sort by Rating (Ascending)</option>
                        <option value="rating-desc">Sort by Rating (Descending)</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Profile</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Rating</th>
                        <th>Message</th>
                        <th>Version</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRatings.map((rating, index) => (
                        <tr key={rating._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className='tabledetails'>
                                        <img
                                            src={rating.userId.profilePhoto}
                                            alt={rating.userId.userName}
                                            className="img-fluid tableImg"
                                        />
                                    </div>
                                    <div className='col-6 text-start'>
                                        <div className='name'>{rating.userId.userName}</div>
                                    </div>
                                </div>
                            </td>
                            <td><p className='text-start'>{rating.userId.roleId.fullName}</p></td>
                            <td>{rating.userId.role}</td>
                            <td>
                                {'★'.repeat(rating.ratingStars)} {/* Render stars */}
                            </td>
                            <td className="message-cell">
                                {rating.ratingText || "--"} {/* The literal message */}
                            </td>
                            <td>{rating.version}</td>
                            <td>{formatDate(rating.createdAt)}</td> {/* Format the date */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

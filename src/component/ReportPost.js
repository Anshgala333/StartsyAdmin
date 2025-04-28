import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Report() {
    const [selectedPost, setSelectedPost] = useState(null);
    const [expandedReason, setExpandedReason] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        async function getReport() {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/admin/reportedPost`);
                const data = await response.json();
                console.log(data.message);

                setReports(data.message);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        getReport();
    }, []);

    const handleDelete = async (report, id) => {
        if (window.confirm(
            "Are you sure you want to delete this report? This action cannot be undone."
        )) {

            console.log(report.postId._id);
            console.log(report._id);

            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/admin/deletepost/${report.postId._id}`, {
                    method: 'POST',
                    body: JSON.stringify({ reportId: report._id }),
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log(data);

                setReports(reports.filter((report) => report._id !== id));


            } catch (err) {
                console.log(err);
            }


        }
    };

    const renderPostContent = (post) => {
        switch (post.type) {
            case "textBlog":
                return (
                    <p
                        className="text-right"
                        style={{
                            maxHeight: "200px", overflow: "hidden", cursor: "pointer", minHeight: "100px", display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 8,
                            textOverflow: "ellipsis",
                            textAlign: "left"
                        }}
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.content || "no content available"}
                    </p>
                );
            case "jobPost":
                return (
                    <div>
                        <p><strong>Role:</strong> {post.jobPosts.role}</p>
                        <p><strong>description:</strong> {post.jobPosts.description}</p>
                        <p><strong>duration:</strong> {post.jobPosts.duration}</p>
                        <p><strong>Payment Mode:</strong> {post.jobPosts.pay}</p>
                        <p><strong>Amount:</strong> {post.jobPosts.amount || "no value provided"}</p>
                    </div>
                );
            case "communityPost":
                return (

                    <>
                        <p className="text-left"> Community Name :- {post.communityPost.communityName || "No description available"}</p>
                        <p className="">Community description:- {post.communityPost.communityDescription || "No description available"}</p>

                    </>);
            default:
                return <p className="fw-bold text-muted">Unknown post type</p>;
        }
    };

    return (
        <div className="container py-3">
            <h1 className="mb-4 text-center">Reported Posts</h1>
            {reports.length == 0 && <p className="no">No reported Post</p>}
            <div className="row">
                {reports && reports.length > 0 && reports.map((report) => (
                    <div key={report._id} className="col-xl-4 mb-4">
                        <div className="card shadow-sm" style={{ maxHeight: "800px" }}>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={report.postId.user_id.profilePhoto}
                                            alt="User Profile"
                                            className="rounded-circle me-3"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                        <div>
                                            <h5 className="mb-1">{report.postId.user_id.userName}</h5>
                                            <p className="text-muted mb-0">{report.postId.user_id.role}</p>
                                        </div>
                                    </div>
                                    <FaTrash
                                        className="text-danger fs-4 cursor-pointer"
                                        onClick={() => handleDelete(report, report._id)}
                                    />
                                </div>

                                <div className="mt-3" style={{ height: "200px", overflow: "hidden" }}>
                                    {report.postId.mediaUrl ? (
                                        <img
                                            src={report.postId.mediaUrl}
                                            alt="Post"
                                            className="img-fluid rounded"
                                            style={{ cursor: "pointer", maxHeight: "200px", width: "100%" }}
                                            onClick={() => setSelectedPost(report.postId)}
                                        />
                                    ) : (
                                        renderPostContent(report.postId)
                                    )}
                                </div>

                                <div className="mt-3">
                                    <h6>Reports ({report.reports.length}):</h6>
                                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                                        <ul className="list-group">
                                            {report.reports.map((r, index) => (
                                                <li key={index} className="list-group-item d-flex align-items-center">
                                                    <img src={r.reportedBy.profilePhoto} alt="PFP" className="rounded-circle me-3" style={{ width: "40px", height: "40px" }} />
                                                    <div>
                                                        <span className="fw-bold">{r.reportedBy.userName}</span>
                                                        <p className="text-muted mb-0" style={{ maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: expandedReason === r._id ? "unset" : 2 }}>
                                                            {r.reason}
                                                        </p>
                                                        {r.reason.length > 50 && (
                                                            <button className="btn btn-link p-0" onClick={() => setExpandedReason(expandedReason === r._id ? null : r._id)}>
                                                                {expandedReason === r._id ? "Read less" : "Read more"}
                                                            </button>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <Modal show onHide={() => setSelectedPost(null)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Post by {selectedPost.user_id?.userName || "Unknown User"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedPost.mediaUrl ? (
                            <img src={selectedPost.mediaUrl} alt="Enlarged Post" className="img-fluid" />
                        ) : (
                            <p>{selectedPost.content || "No content available"}</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedPost(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default Report;

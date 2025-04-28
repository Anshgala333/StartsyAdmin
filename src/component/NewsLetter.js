import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
export default function NewsLetter() {


    var [token, setToken] = useState("")
    useEffect(() => {
        var token = Cookies.get("admin")
        console.log(token);
        if (token) {
            setToken(token)
        }

    }, [])

    const formik = useFormik({

        initialValues: {
            title: '',
            content: '',
            taggedUserName: '',
            leaderboardCategory: '',
            newsletterImage: ''

        },

        validationSchema: Yup.object({

            title: Yup.string()
                .required('* this field is required'),


            content: Yup.string()
                .required('* this field is required'),


            taggedUserName: Yup.string()
                .required('* this field is required'),

            leaderboardCategory: Yup.string()
                .oneOf(['', 'All'], 'Leaderboard category must be "All" or empty') // Enforces "All" or empty
                .notRequired(),

            newsletterImage: Yup.string().required("* please upload an image")
        }),

        onSubmit: values => {
            console.log(values);
            async function postNewsLetter(params) {
                try {
                    const formData = new FormData();

                    // Append form values to FormData
                    formData.append('title', values.title);
                    formData.append('content', values.content);
                    formData.append('taggedUserName', values.taggedUserName);
                    formData.append('leaderboardCategory', values.leaderboardCategory);
                    formData.append('newsletterImage', values.newsletterImage);

                    const response = await fetch(`${process.env.REACT_APP_URL}/admin/createNewsletter`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    var data = await response.json()
                    console.log(data);

                    if (response.status == 200) {
                        toast.success("File downloaded successfully")
                    }

                }
                catch (e) {
                    console.log(e);

                }
            }
            postNewsLetter()

        },

    });
    return (
        <div className='container my-2'>
            <h2 className='text-center mb-3'>Add NewsLetter</h2>

            <form onSubmit={formik.handleSubmit}>

                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className='form-control'
                    placeholder='tittle'
                />

                {formik.touched.title && formik.errors.title ? (
                    <div className='error'>{formik.errors.title}</div>
                ) : null}
                <br />

                <input
                    id="content"
                    name="content"
                    type="text"
                    placeholder='content'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                    className='form-control'
                />

                {formik.touched.content && formik.errors.content ? (
                    <div className='error'>{formik.errors.content}</div>
                ) : null}
                <br />
                <input
                    id="taggedUserName"
                    name="taggedUserName"
                    type="text"
                    placeholder='taggedUserName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.taggedUserName}
                    className='form-control'
                />

                {formik.touched.taggedUserName && formik.errors.taggedUserName ? (
                    <div className='error'>{formik.errors.taggedUserName}</div>
                ) : null}
                <br />

                <input
                    id="leaderboardCategory"
                    name="leaderboardCategory"
                    type="text"
                    placeholder='if leader board write All otherwise leave blank'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.leaderboardCategory}
                    className='form-control'
                />

                {formik.touched.leaderboardCategory && formik.errors.leaderboardCategory ? (
                    <div className='error'>{formik.errors.leaderboardCategory}</div>
                ) : null}
                <br />

                <input
                    id="newsletterImage"
                    name="newsletterImage"
                    type="file"
                    placeholder='if leader board write All otherwise leave blank'
                    onBlur={formik.handleBlur}
                    accept="image/*" // Accept only image files
                    onChange={(event) => formik.setFieldValue("newsletterImage", event.currentTarget.files[0])} // Update Formik state with the selected file
                    className='form-control'
                />

                {formik.touched.newsletterImage && formik.errors.newsletterImage ? (
                    <div className='error'>{formik.errors.newsletterImage}</div>
                ) : null}
                <br />

                <br />
                <button type='submit' className='btn btn-dark'>Submit</button>

            </form>

        </div>
    )
}

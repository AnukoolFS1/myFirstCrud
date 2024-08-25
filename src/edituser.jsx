import { useEffect } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditUser=()=>{
    let navigate = useNavigate()
    let params = useParams()

    let myformik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: ''
        },
        onSubmit: async (value, { resetForm }) => {
            
            try {
                await axios.put(`http://localhost:1010/Submit/${params.id}`, value)
                resetForm()
                navigate('/')
            }
            catch (err) {
                console.log(err)
            }
        }
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:1010/Submit/${params.id}`);
                const userData = response.data;
                // Set form values with the fetched user data
                myformik.setValues(userData); // this is the reason for setting the values
            } catch (err) {
                console.log(err);
            }
        };

        fetchUserData();
    }, [params.id]);

    return (
        <form className="container pb-5 px-5 bg-warning" onSubmit={myformik.handleSubmit}>
                <h1 className="display-3 fw-bolder mb-5">Form</h1>
                <div className="p-3 my-1 bg-secondary border rounded-3">
                    <label htmlFor="name" className="text-light">Name</label>
                    <input className="form-control btn btn-outline-primary text-start text-light" type="text" placeholder="Enter Your Name" autoComplete="no" id="name" name="name" value={myformik.values.name} onChange={myformik.handleChange} />
                </div>
                <div className="p-3 my-1 bg-secondary border rounded-3">
                    <label htmlFor="phone" className="text-light">Phone</label>
                    <input className="form-control btn btn-outline-primary text-start text-light" type="text" placeholder="Enter Your Phone" autoComplete="no" id="phone" name="phone" value={myformik.values.phone} onChange={myformik.handleChange} />
                </div>
                <div className="p-3 my-1 bg-secondary border rounded-3">
                    <label htmlFor="email" className="text-light">Email</label>
                    <input className="form-control btn btn-outline-primary text-start text-light" type="email" placeholder="Enter Your Email" autoComplete="no" id="email" name="email" value={myformik.values.email} onChange={myformik.handleChange} />
                </div>
                <div className="p-3 my-1 bg-secondary border rounded-3">
                    <label htmlFor="password" className="text-light">Password</label>
                    <input className="form-control btn btn-outline-primary text-start text-light" type="password" placeholder="Enter Your Password" autoComplete="no" id="password" name="password" value={myformik.values.password} onChange={myformik.handleChange} />
                </div>
                <div>
                    <input type="submit" className="btn btn-outline-primary"
                        onClick={(e) => {
                             console.log('run');
                            }} />
                </div>
            </form>
    )
}

export default EditUser
import { useState, useEffect } from "react"
import axios from "axios"
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const FormBody = () => {
    let [update, setUpdate] = useState(0)
    const [showdata, setData] = useState([])
    const navigate = useNavigate()
    const myformik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: ''
        },
        onSubmit: async (value, { resetForm }) => {
            try {
                await axios.post(`http://localhost:1010/Submit`, value)
                resetForm()
            }
            catch (err) {
                console.log(err);
            }
        }
    })

    console.log(myformik);
    

    const Pointer = {
        cursor: "pointer"
    }


    let fetchData = async () => {
        try {
            let data = await axios.get(`http://localhost:1010/Submit`)
            data = await data.data;
            setData(data)
        } catch (err) {
            console.log('Data fetch failed', err);
        }
    }

    async function DeleteUser(x) {
        try {
            console.log('delete ran');
            await axios.delete(`http://localhost:1010/Submit/${x.id}`)
                .then(res => { console.log(res); })
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => { fetchData() }, [update])

    return (
        <>
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
                             setUpdate(prev => prev = Math.random())
                            }} />
                </div>
            </form>
            <hr />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showdata?.map(e => {
                            return (<tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.phone}</td>
                                <td>{e.email}</td>
                                <td>{e.password}</td>
                                <td className="text-center">
                                    <span className="bg-danger text-light mx-1" style={Pointer} onClick={() => { DeleteUser(e); setUpdate(prev => prev = Math.random()) }}>Delete</span>
                                    <span className="bg-warning text-light mx-1" style={Pointer} onClick={()=>{navigate(`/Edituser/${e.id}`)}}>Edit</span>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FormBody
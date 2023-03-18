import React, { useState } from "react";
import Loading from "./Loading";
import axios from "axios";

const Home = () => {
    const [fullName, setFullName] = useState("");
    const [currentPosition, setCurrentPosition] = useState("");
    const [currentLength, setCurrentLength] = useState(1);
    const [currentTechnologies, setCurrentTechnologies] = useState("");
    const [headshot, setHeadshot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("headshotImage", headshot, headshot.name);
        formData.append("fullName", fullName);
        formData.append("currentPosition", currentPosition);
        formData.append("currentLength", currentLength);
        formData.append("currentTechnologies", currentTechnologies);
        formData.append("workHistory", JSON.stringify(companyInfo));
        axios
            .post("http://localhost:4000/resume/create", formData, {})
            .then((res) => {
                if (res.data.message) {
                    console.log(res.data.data);
                    navigate("/resume");
                }
            })
            .catch((err) => console.error(err));
        setLoading(true);
    };

    const handleAddCompany = () =>
        setCompanyInfo([...companyInfo, { name: "", position: "" }]);


    const handleRemoveCompany = (index) => {
        const list = [...companyInfo];
        list.splice(index, 1);
        setCompanyInfo(list);
    };

    const handleUpdateCompany = (e, index) => {
        const { name, value } = e.target;
        const list = [...companyInfo];
        list[index][name] = value;
        setCompanyInfo(list);
    };
    if (loading) {
        return <Loading />;
    }
    return (
        <div className='app'>
            <h3>Companies you've worked at</h3>
            <form method="POST" enctype="multipart/form-data">
                {/*--- other UI tags --- */}
                {companyInfo.map((company, index) => (
                    <div className='nestedContainer' key={index}>
                        <div className='companies'>
                            <label htmlFor='name'>Company Name</label>
                            <input
                                type='text'
                                name='name'
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                            />
                        </div>
                        <div className='companies'>
                            <label htmlFor='position'>Position Held</label>
                            <input
                                type='text'
                                name='position'
                                required
                                onChange={(e) => handleUpdateCompany(e, index)}
                            />
                        </div>

                        <div className='btn__group'>
                            {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                                <button id='addBtn' onClick={handleAddCompany}>
                                    Add
                                </button>
                            )}
                            {companyInfo.length > 1 && (
                                <button id='deleteBtn' onClick={() => handleRemoveCompany(index)}>
                                    Del
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button>CREATE RESUME</button>
            </form>
        </div>
    );
};

export default Home;
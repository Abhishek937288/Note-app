import { useContext, useState } from "react";
import "./form.css";
import { UserContext } from "../../context/noteContex";
import axios from "axios";

const Form = () => {
  const {
    formMode,
    setIsForm,
    refresh,
    setRefresh,
    formData,
    setFormData,
    id,
    setId,
  } = useContext(UserContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/note/createnote",
          formData,
          { withCredentials: true }
        );
        const data = response.data;
        
        setFormData({ title: "", description: "" });
        setIsForm(false);
        setRefresh(!refresh);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      const response = await axios.put(
        `http://localhost:8080/api/note/editnote/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setFormData({ title: "", description: "" });
      setIsForm(false);
      setRefresh(!refresh);
    }
  };

  return (
    <div className="formContainer">
      <div className="mainForm">
        <h1>Add your note details</h1>
        <form onSubmit={handleSubmit}>
          <div className="formInp">
            <input
              type="text"
              required
              placeholder="Enter your titile"
              name="title"
              value={formData.title}
              onChange={handleOnChange}
            />
            <textarea
              name="description"
              id=""
              required
              placeholder="Enter your description"
              onChange={handleOnChange}
              value={formData.description}
            ></textarea>
          </div>
          <div className="formBtndiv">
            <button className="formBtn" type="submit">
              {formMode === "add" ? "Add" : "Edit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

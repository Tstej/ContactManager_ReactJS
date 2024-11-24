import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      title: "",
      company: "",
      group: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    // Define the async function inside the effect
    const fetchContact = async () => {
      setState({
        ...state,
        loading: true, // Set loading to true before the API call
      });

      try {
        const response = await ContactService.getSingleContact(contactId); // Pass contactId to the API
        const groupResponse = await ContactService.getGroups();

        setState({
          ...state,
          loading: false,
          contact: response.data, // Update the contact state
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message || "Failed to fetch contact", // Update error message
        });
      }
    };

    fetchContact(); // Call the async function
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestiae soluta voluptatum maxime, amet odio temporibus.
                    Fugit, incidunt eum, voluptatem minima voluptatum beatae
                    accusantium enim, quam officia at unde veritatis ipsum!
                  </p>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        className="form-control"
                        required={true}
                        name="grop"
                        value={contact.group}
                        onChange={updateInput}
                      >
                        <option value="">Select a Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img
                    src={contact.photo}
                    alt="Image not found"
                    className="contact-img img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;

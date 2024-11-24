import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "./../../Spinner/Spinner";

const ContactList = () => {

  let [search, setSearch] = useState({
      text : ""
  });

  let [state, setState] = useState({
    loading: false, // To display loading flag
    contacts: [], // Actual data
    filteredContacts : [],
    errorMessage: "", // For error
  });

  useEffect(() => {
    // Define the async function inside the useEffect
    const fetchContacts = async () => {
      setState((prevState) => ({
        ...prevState,
        loading: true, // Set loading state to true before fetching
      }));

      try {
        const response = await ContactService.getAllContacts();
        setState((prevState) => ({
          ...prevState, // Ensure you preserve previous state values
          loading: false,
          contacts: response.data, // Update contacts state with fetched data
          filteredContacts : response.data
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: error.message || "Failed to load contacts", // Update error message
        }));
      }
    };

    fetchContacts(); // Call the async function to fetch data

    // Cleanup function (if necessary, for instance, to cancel requests, etc.)
    return () => {
      // Any cleanup logic can go here
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  // Delete Contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        const response = await ContactService.getAllContacts();
        setState((prevState) => ({
          ...prevState, // Ensure you preserve previous state values
          loading: false,
          contacts: response.data, // Update contacts state with fetched data
          filteredContacts : response.data
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        errorMessage: error.message || "Failed to load contacts", // Update error message
      }));
    }
  };

  let searchContact = (event) =>{
      setSearch({
        ...search,
        text: event.target.value
      });

      let theContacts = state.contacts.filter(contact =>{
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
      });

      setState({
        ...state,
        filteredContacts: theContacts
      });
  }

  let { loading, contacts, errorMessage, filteredContacts } = state;

  return (
    <>
      <section className="contact-serach p-3">
        <div className="container">
          <div className="grid">
            {/* Row 1 */}
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager
                  <Link to={`/contacts/add`} className="btn btn-primary m-2">
                    <i className="fa fa-plus-circle me-2" />
                    Add Contact
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae soluta voluptatum maxime, amet odio temporibus.
                  Fugit, incidunt eum, voluptatem minima voluptatum beatae
                  accusantium enim, quam officia at unde veritatis ipsum!
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={search.text}
                        onChange={searchContact}
                        type="text"
                        className="form-control"
                        placeholder="Search Name"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6 " key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-3">
                                <img
                                  src={contact.photo}
                                  alt="Image not found"
                                  className="contact-img img-fluid"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name :
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile No. :
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email :
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-2 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => {
                                    clickDelete(contact.id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ContactList;

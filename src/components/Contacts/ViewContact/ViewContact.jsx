import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {},
  });

  useEffect(() => {
    // Define the async function inside the effect
    const fetchContact = async () => {
      setState((prevState) => ({
        ...prevState,
        loading: true, // Set loading to true before the API call
      }));

      try {
        const response = await ContactService.getSingleContact(contactId); // Pass contactId to the API
        // Fetching group details related to the contact
        const groupResponse = await ContactService.getGroup(response.data);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contact: response.data, // Update the contact state
          group: groupResponse.data, // Store group data
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: error.message || "Failed to fetch contact", // Update error message
        }));
      }
    };

    fetchContact(); // Call the async function
  }, [contactId]); // The effect runs whenever contactId changes
  let { loading, contact, errorMessage, group } = state;

  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio, eveniet magnam fuga suscipit eos facere deleniti
                quis sit eum, neque, labore nesciunt corporis. Voluptate, et.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 ? (
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-4">
                    <img
                      src={contact.photo || "default-image-url"} // Default fallback image URL if photo is missing
                      alt="Contact Image"
                      className="contact-img img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold">{contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile No.: <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company: <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to="/contacts/list" className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="alert alert-warning">
              <p>No contact or group data found.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewContact;

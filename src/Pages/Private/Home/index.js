import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../../Components/Footer";
import restrictDate from "../../../Helpers/restrictDate";

const Home = () => {
  const information = useSelector((state) => state.login);

  const logoRef = useRef(null);
  const [response, setResponse] = useState({
    loading: false,
    error: false,
    errorMessage: "",
    success: false,
    successMessage: "",
    link: "",
  });
  const [kalpasLogo, setKalpasLogo] = useState(false);
  const [customLogo, setCustomLogo] = useState({
    isCustom: false,
    uploading: false,
    logo: "",
    error: false,
  });

  const returnLogo = () => {
    if (kalpasLogo) {
      return "https://res.cloudinary.com/mahabubsunny/image/upload/v1645815150/Logo_dcwkcx.png";
    } else if (customLogo.isCustom) {
      return customLogo.logo;
    } else {
      return "https://res.cloudinary.com/mahabubsunny/image/upload/v1647976539/betterInvoice_y1uuhm.png";
    }
  };

  const [inputs, setInputs] = useState({
    biNumber: "001",
    companyName: "Kalpas Innovation Pvt. Ltd.",
    cmAddress1: "KLE-CTIE, R.H.KulkarniBuilding, KLETU Campus,",
    cmAddress2: "Vidyanagar, Hubballi, Karnataka – 580031",
    cmEmail: "Hello@Kalpas.in",
    cmWebsite: "www.Kalpas.in",
    urName: "Mr. Better Invoice",
    urPosition: "Front-End Developer (React)",
    urAddress: "Gulshan 1, Dhaka - 1212, Bangladesh",
    urEmail: "Example@gmail.com",
    urWebsite: "betterinvoice.com",
    urPhone: "012345678900",
    charge: "10",
    note: "Freelancing Service Fee",
    currency: "$",
  });
  const [serviceInputs, setServiceInputs] = useState({
    name: "Web Development",
    qty: "1",
    days: "30",
    amount: 200,
  });
  const [services, setServices] = useState([]);

  const handleLogoUpload = (e) => {
    setCustomLogo((prev) => ({
      ...prev,
      isCustom: false,
      error: false,
      logo: "",
      uploading: true,
    }));
    const customLogo = new FormData();
    // customLogo.set("key", "217e4a7b8abfe51f2a79a5865e0b806a");
    // customLogo.append("image", e.target.files[0]);

    customLogo.append("file", e.target.files[0]);
    customLogo.append("upload_preset", "betterInvoice");
    customLogo.append("cloud_name", "mahabubsunny");
    // https://api.imgbb.com/1/upload

    axios
      .post(
        "https://api.cloudinary.com/v1_1/mahabubsunny/image/upload",
        customLogo
      )
      .then(function (response) {
        setCustomLogo((prev) => ({
          ...prev,
          isCustom: true,
          error: false,
          uploading: false,
          // logo: response.data.data.display_url,
          logo: response.data.url,
        }));
        logoRef.current.value = "";
      })
      .catch(function (error) {
        setCustomLogo((prev) => ({
          ...prev,
          isCustom: false,
          error: true,
          logo: "",
          uploading: false,
        }));
        logoRef.current.value = "";
      });
  };

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServiceInputs = (e) => {
    setServiceInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleServices = async (e) => {
    e.preventDefault();
    if (services.length >= 4) return;
    setServices((prev) => [...prev, { id: Date.now(), ...serviceInputs }]);
    setServiceInputs({
      name: "",
      qty: "",
      days: "",
      amount: "",
    });
  };

  const handleRemoveService = (id) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };
  const generatePDF = async () => {
    if (services.length <= 0)
      return setResponse((prev) => ({
        ...prev,
        success: false,
        error: true,
        errorMessage: "No Service Added",
      }));
    try {
      setResponse((prev) => ({
        ...prev,
        success: false,
        error: false,
        loading: true,
      }));
      const apiResponse = await axios.post(
        "/create-invoice",
        { ...inputs, companyLogo: returnLogo(), services },
        {
          headers: {
            refresh_token: information.user.refreshToken,
          },
        }
      );
      if (apiResponse.data.status === 1) {
        setResponse((prev) => ({
          ...prev,
          success: true,
          successMessage: apiResponse.data.message,
          error: false,
          loading: false,
          link: apiResponse.data.file,
        }));
        return;
      }
      if (apiResponse.data.status === 0) {
        setResponse((prev) => ({
          ...prev,
          success: false,
          successMessage: "",
          error: true,
          errorMessage: apiResponse.data.message,
          loading: false,
          link: apiResponse.data.file,
        }));
        return;
      }
    } catch (error) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        error: true,
        errorMessage:
          error.response.data.message || "PDF Generation Failed, Try Again",
        loading: false,
      }));
    }
  };

  return (
    <React.Fragment>
      <div className="container my-4">
        <div className="row">
          <div
            className="col-md-8 rounded p-3 shadow-sm"
            style={{ background: "#fff" }}
          >
            <p className="heading m-0">Basis Information</p>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="invoiceDate" className="labels mb-2">
                  Pick Date
                </label>
                <input
                  type="date"
                  id="invoiceDate"
                  className="form-control"
                  name="biDate"
                  onChange={handleInputs}
                  min={restrictDate()}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="invoiceNumber" className="labels mb-2">
                  Invoice Number
                </label>
                <input
                  type="number"
                  id="invoiceNumber"
                  className="form-control"
                  value={inputs.biNumber || ""}
                  name="biNumber"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="companyLogo" className="labels mb-2">
                  Company Logo (By Default BetterInvoice Logo)
                </label>
                <input
                  type="file"
                  ref={logoRef}
                  id="companyLogo"
                  className="form-control"
                  name="companyLogo"
                  onChange={handleLogoUpload}
                  disabled={kalpasLogo}
                />
                {customLogo.isCustom && (
                  <p
                    className="mt-1 mb-0 text-success"
                    style={{ fontSize: 12 }}
                  >
                    Custom Logo Uploaded Successful
                  </p>
                )}
                {customLogo.error && (
                  <p className="mt-1 mb-0 text-danger" style={{ fontSize: 12 }}>
                    Custom Logo Upload Failed
                  </p>
                )}
                {customLogo.uploading && (
                  <p className="mt-1 mb-0 text-info" style={{ fontSize: 12 }}>
                    Custom Logo Uploading...
                  </p>
                )}
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="isKalpasLogo"
                    className="form-check-input"
                    name="isKalpasLogo"
                    onClick={() => setKalpasLogo(!kalpasLogo)}
                  />
                  <label
                    htmlFor="isKalpasLogo"
                    className="form-check-label ms-2"
                  >
                    Use Kalpas Logo
                  </label>
                </div>
              </div>
            </div>
            <p className="heading mt-3 mb-0">Company Information</p>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="companyName" className="labels mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="form-control"
                  value={inputs.companyName || ""}
                  name="companyName"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-6">
                <label htmlFor="companyAddress1" className="labels mb-2">
                  Company Address 1
                </label>
                <input
                  type="text"
                  id="companyAddress1"
                  className="form-control"
                  value={inputs.cmAddress1 || ""}
                  name="cmAddress1"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="companyAddress2" className="labels mb-2">
                  Company Address 2
                </label>
                <input
                  type="text"
                  id="companyAddress2"
                  className="form-control"
                  value={inputs.cmAddress2 || ""}
                  name="cmAddress2"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="companyEmail" className="labels mb-2">
                  Company Email
                </label>
                <input
                  type="email"
                  id="companyEmail"
                  className="form-control"
                  value={inputs.cmEmail || ""}
                  name="cmEmail"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="companyWebsite" className="labels mb-2">
                  Company Website
                </label>
                <input
                  type="url"
                  id="companyWebsite"
                  className="form-control"
                  value={inputs.cmWebsite || ""}
                  name="cmWebsite"
                  onChange={handleInputs}
                />
              </div>
            </div>
            <p className="heading mt-3 mb-0">Personal Information</p>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="yourName" className="labels mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="yourName"
                  className="form-control"
                  value={inputs.urName || ""}
                  name="urName"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="urPosition" className="labels mb-2">
                  Position / Designation
                </label>
                <input
                  type="text"
                  id="urPosition"
                  className="form-control"
                  value={inputs.urPosition || ""}
                  name="urPosition"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="urAddress" className="labels mb-2">
                  Complete Address
                </label>
                <input
                  type="text"
                  id="urAddress"
                  className="form-control"
                  value={inputs.urAddress || ""}
                  name="urAddress"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="urEmail" className="labels mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="urEmail"
                  className="form-control"
                  value={inputs.urEmail || ""}
                  name="urEmail"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="urWebsite" className="labels mb-2">
                  Website Address
                </label>
                <input
                  type="url"
                  id="urWebsite"
                  className="form-control"
                  value={inputs.urWebsite || ""}
                  name="urWebsite"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="urPhone" className="labels mb-2">
                  Phone
                </label>
                <input
                  type="url"
                  id="urPhone"
                  className="form-control"
                  value={inputs.urPhone || ""}
                  name="urPhone"
                  onChange={handleInputs}
                />
              </div>
            </div>

            <p className="heading mt-3 mb-0">Services</p>
            <form onSubmit={handleServices}>
              <div className="row">
                <div className="col-md-5">
                  <label htmlFor="serviceName" className="labels mb-2">
                    Name of Service
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    className="form-control"
                    value={serviceInputs.name || ""}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    name="name"
                    required
                    onChange={handleServiceInputs}
                    disabled={services.length >= 4 ? true : false}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="serviceQty" className="labels mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="serviceQty"
                    className="form-control"
                    value={serviceInputs.qty || ""}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    required
                    spellCheck="false"
                    name="qty"
                    onChange={handleServiceInputs}
                    disabled={services.length >= 4 ? true : false}
                  />
                </div>
                <div className="col-md-2">
                  <label htmlFor="serviceDays" className="labels mb-2">
                    Days
                  </label>
                  <input
                    type="number"
                    id="serviceDays"
                    required
                    className="form-control"
                    value={serviceInputs.days || ""}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    name="days"
                    onChange={handleServiceInputs}
                    disabled={services.length >= 4 ? true : false}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="serviceAmount" className="labels mb-2">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    id="serviceAmount"
                    required
                    className="form-control"
                    value={serviceInputs.amount || ""}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    name="amount"
                    onChange={handleServiceInputs}
                    disabled={services.length >= 4 ? true : false}
                  />
                </div>
              </div>
              <div className="text-end mt-2">
                <button
                  type="submit"
                  className="btn btn-success btn-sm"
                  disabled={services.length >= 4 ? true : false}
                >
                  <i className="fas fa-plus-circle me-2"></i>Add Service
                </button>
              </div>
            </form>

            <p className="heading mt-3 mb-0">Charges and Note</p>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="charge" className="labels mb-2">
                  Service Charge (Payonner)
                </label>
                <input
                  type="text"
                  id="charge"
                  className="form-control"
                  value={inputs.charge || ""}
                  name="charge"
                  onChange={handleInputs}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="note" className="labels mb-2">
                  Special Note
                </label>
                <input
                  type="text"
                  id="note"
                  className="form-control"
                  value={inputs.note || ""}
                  name="note"
                  onChange={handleInputs}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={generatePDF}>
              {response.loading ? (
                <>
                  <i className="fas fa-cog me-2 fa-spin"></i> Generating...
                </>
              ) : (
                <>
                  <i className="fas fa-cog me-2"></i>Generate Invoice
                </>
              )}
            </button>
            {response.error && (
              <p className="my-3 text-danger" style={{ fontSize: 13 }}>
                {response.errorMessage}
              </p>
            )}
            {response.success && (
              <p className="my-3 text-success" style={{ fontSize: 13 }}>
                {response.successMessage}
              </p>
            )}
            <div className="my-3">
              <button
                className="btn btn1 bg-white rounded shadow-sm"
                onClick={() =>
                  response.link !== "" && window.location.replace(response.link)
                }
              >
                Preview
              </button>
              <button
                className="btn btn2 bg-white rounded shadow-sm"
                onClick={() =>
                  response.link !== "" && window.location.replace(response.link)
                }
              >
                Download
              </button>
            </div>
            <p className="heading mb-3 pt-3">Currency</p>
            <div className="form-control text-muted" disabled>
              <img
                src="https://s3.amazonaws.com/images.wpr.com/flag-pages/flags-iso/flat/16/US.png"
                className="me-1"
                alt="usd"
              />{" "}
              USD (United States Dollar)
            </div>
            {services.length > 0 && (
              <div className="my-4 sticky">
                <p className="heading mb-3 pt-3">Services</p>
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="row bg-white my-2 mx-1 py-2 px-1 rounded shadow-sm"
                  >
                    <div className="col-md-12 delete">
                      <span
                        className="text-danger"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </span>
                      <p className="heading m-0">Name</p>
                      <h6>{service.name}</h6>
                    </div>
                    <div className="col-md-6">
                      <p className="heading m-0">Quantity</p>
                      <h6>{service.qty}</h6>
                    </div>
                    <div className="col-md-6">
                      <p className="heading m-0">Days / Months</p>
                      <h6>{service.days}</h6>
                    </div>
                    <div className="col-md-6">
                      <p className="heading m-0">Amount (USD)</p>
                      <h6>${service.amount}</h6>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;

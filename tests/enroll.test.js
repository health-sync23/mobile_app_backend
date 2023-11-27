const { app } = require("..");

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Enroll New Patient API", () => {
  it("should create a new patient and return success message", function () {
    const newPatientData = {
      fullname: "Test User",
      email: "test122@example.com",
      password: "Testpassword",
    };

    chai
      .request(app)
      .post("/new-patient")
      .send(newPatientData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal("New patient created successfully!");
      });
  });

  it("should handle empty fields and return 400 Bad Request", function () {
    const invalidPatientData = {
      fullname: "",
      email: "",
      password: "",
    };

    chai
      .request(app)
      .post("/new-patient")
      .send(invalidPatientData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Important fields cannot be empty!");
      });
  });

  it("should handle invalid email format and return 400 Bad Request", function () {
    const invalidEmailPatientData = {
      fullname: "Test User",
      email: "invalidemail",
      password: "testpassword",
    };

    chai
      .request(app)
      .post("/new-patient")
      .send(invalidEmailPatientData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("invalid email format");
      });
  });

  it("should handle invalid password format and return 400 Bad Request", function () {
    const invalidPasswordPatientData = {
      fullname: "Test User",
      email: "test@example.com",
      password: "short",
    };

    chai
      .request(app)
      .post("/new-patient")
      .send(invalidPasswordPatientData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("invalid password format");
      });
  });

  // Add more test cases for duplicate email, internal server error, etc.
});

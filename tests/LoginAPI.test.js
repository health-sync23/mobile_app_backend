const { app } = require("..");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { expect } = chai;

describe("Login Patient Handler", () => {
  it("should return a token and user information on successful login", () => {
    const testPatient = {
      email: "test@example.com",
      password: "Testpassword",
    };

    chai
      .request(app)
      .post("/signin")
      .send(testPatient)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Login successful!");
        expect(res.body).to.have.property("token");
        expect(res.body).to.have.property("id");
        // done();
      });
  });

  it("should handle empty email and password and return 400 Bad Request", () => {
    const invalidPatient = {
      email: "",
      password: "",
    };

    chai
      .request(app)
      .post("/signin")
      .send(invalidPatient)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("Enter your email AND password!");
        // done();
      });
  });

  it("should handle invalid email format and return 400 Bad Request", () => {
    const invalidEmailPatient = {
      email: "invalidemail",
      password: "Testpassword",
    };

    chai
      .request(app)
      .post("/signin")
      .send(invalidEmailPatient)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal("invalid email format");
        // done();
      });
  });

  it("should handle non-existing user and return 404 Not Found", () => {
    const nonExistingUser = {
      email: "nonexisting@example.com",
      password: "Testpassword",
    };

    chai
      .request(app)
      .post("/signin")
      .send(nonExistingUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal("User does not exist!");
        // done();
      });
  });

  it("should handle invalid password and return 401 Unauthorized", () => {
    const invalidPasswordPatient = {
      email: "test@example.com",
      password: "Invalidpassword",
    };

    chai
      .request(app)
      .post("/signin")
      .send(invalidPasswordPatient)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal("Invalid email OR password!");
        // done();
      });
  });

  // Add more test cases as needed
});

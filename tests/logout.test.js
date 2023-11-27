const Patient = require("../models/Patient");

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("..");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Logout Patient Controller", () => {
  it("should clear refreshToken and return a successful status (204) if JWT token is present", () => {
    // Assuming you have a patient with a refreshToken in your database
    const testPatient = {
      refreshToken: "testRefreshToken",
    };

    chai
      .request(app)
      .post("/logout")
      .set("Cookie", `jwt=${testPatient.refreshToken}`) // Set the mock cookie
      .end(async (err, res) => {
        try {
          expect(res).to.have.status(204);
          expect(res).to.not.have.cookie("jwt"); // Ensure the cookie is cleared

          // Check the database to ensure the refresh token is cleared
          const patientInDatabase = await Patient.findOne({
            refreshToken: testPatient.refreshToken,
          });

          expect(patientInDatabase.refreshToken).to.be.null;

          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("should return a successful status (401) if no JWT token is present", () => {
    // Call the logout endpoint without setting the refreshToken cookie
    chai
      .request(app)
      .post("/logout")
      .set("Cookie", ``) // Set the mock
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.not.have.cookie("jwt");
      });
  });
});

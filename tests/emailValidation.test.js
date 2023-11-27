const { expect } = require("chai");
const { runEmailValidation } = require("../utils/validation"); // Adjust the path accordingly

describe("runEmailValidation", () => {
  it("should return true for a valid email format", () => {
    const res = {
      status: () => {},
      json: () => {},
    };

    const validEmail = "test@example.com";
    const result = runEmailValidation(validEmail, res);

    expect(result).to.be.true;
  });

  it("should return false and set client error for an invalid email format", () => {
    const res = {
      status: (statusCode) => {
        expect(statusCode).to.equal(400);
        return res; // Return the response object for chaining
      },
      json: (data) => {
        expect(data).to.deep.equal({ message: "Invalid email format" });
      },
    };

    const invalidEmail = "invalid-email";
    const result = runEmailValidation(invalidEmail, res);

    expect(result).to.be.false;
  });
});

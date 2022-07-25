import { invalidEmail, invalidPassword } from "../Screens/SignUp";


invalidEmailCases = [
    ['123@gmail.com', false],
    ['123@u.nus.edu', false],
    ['123@yahoo.com', true],
    ['123@gmail.com@gmail.com', true]
]

invalidPasswordCases = [
    ['Hello!', true],           // no number
    ['Hello123', true],         // no special character
    ['hello!123', true],        // no uppercase letter
    ['HELLO!123', true],        // no lowercase letter
    ['Hello!123', false],       // valid password
]

describe("Sign Up functions", () => {
    test.each(invalidEmailCases)(
        'is an invalid email',
        (email, expected) => {
            expect(invalidEmail(email)).toBe(expected);
        }
    )
})

describe("Sign Up functions", () => {
    test.each(invalidPasswordCases)(
        'is an invalid password',
        (password, expected) => {
            expect(invalidPassword(password)).toBe(expected);
        }
    )
})
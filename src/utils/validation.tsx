const checkEmail = (email: string) => {
    if ((email.trim() === "")) {
        return {
            errorMessage: 'Email must be filled out'
        }
    }
    else {
        const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailFormat = EmailRegex.test(email);
        if (!emailFormat) {
            return {
                errorMessage: 'Enter valid email address'
            }
        }
    }
    return false
}


function checkPassword(password: string) {
    if (!(password.trim() === "")) {
        // const uppercaseRegExp = /(?=.*?[A-Z])/;
        // const lowercaseRegExp = /(?=.*?[a-z])/;
        // const digitsRegExp = /(?=.*?[0-9])/;
        // const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{4,}/;
        // const uppercasePassword = uppercaseRegExp.test(password);
        // const lowercasePassword = lowercaseRegExp.test(password);
        // const digitsPassword = digitsRegExp.test(password);
        // const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword = minLengthRegExp.test(password);

        let errMsg = "";

        // if (!uppercasePassword) {
        //     errMsg = "At least one uppercase";
        // } else if (!lowercasePassword) {
        //     errMsg = "At least one lowercase";
        // } else if (!digitsPassword) {
        //     errMsg = "At least one digit";
        // } else if (!specialCharPassword) {
        //     errMsg = "At least one special characters";
        // } else 
        if (!minLengthPassword) {
            errMsg = "At least 6 characters";
        } else {
            return errMsg = "";
        }
        if (errMsg) {
            return ({
                errorMessage: errMsg,
                isPasswordValid: false

            })
        }
    } else {
        return ({
            errorMessage: "Password must be filled out",
            isPasswordValid: false
        })
    }
    return false
}

export const loginValidation = (data: any) => {

    let result: any;

    result = checkEmail(data.email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }

    result = checkPassword(data.password)
    if (result.errorMessage) {
        return {
            password: result.errorMessage
        }
    }
    return true
}

export const UserValidation = (data: any) => {

    let result: any;

    if ((data.name.trim() === "")) {
        return {
            name: 'Name must be filled out'
        }
    }
    
    result = checkEmail(data.email)
    if (result.errorMessage) {
        return {
            email: result.errorMessage
        }
    }

    result = checkPassword(data.password)
    if (result.errorMessage) {
        return {
            password: result.errorMessage
        }
    }

    if (data.password != data.confirmPassword) {
        return {
            cPassword: "Password doesn't Match"
        }
    }

    
    return true
}

export const settingValidation = (data: any) => {

    if ((data.metaKey.trim() === "")) {
        return {
            errorMessage: 'MetaKey must be filled out'
        }
    }
    if ((data.metaValue === "")) {
        return {
            errorMessage: 'Metavalue must be filled out'
        }
    }
    if (data.metaValue.length === 0) {
        return {
            errorMessage: 'Metavalue must be filled out'
        }
    }
    if (data.metaValue[0].length === 0) {
        return {
            errorMessage: 'Metavalue must be filled out'
        }
    }
    return true
}

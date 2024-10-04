const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validate = {
    email: (email) => {
      if (!email.trim()) {
        return true;
      }
    },
    password: (pass) => {
      if (!pass.trim()) {
        return true;
      }
    },
    checkIfpasswordIsSame: ({password, confirmPassword}) => {
      if (password !== confirmPassword) {
        return true
      } else {
        return false;
      }
    }
  }
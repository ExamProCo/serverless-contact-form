module.exports = {
  full_name: {
    presence: {allowEmpty: false},
  },
  organization: {
  },
  email: {
    presence: {allowEmpty: false},
    email: true
  },
  phone: {
  },
  customer_type: {
    presence: {allowEmpty: false},
    inclusion: {
      within: {
        "s" : "Small",
        "m": "Medium",
        "l" : "Large"
      }
    }
  },
  inquiry: {
    presence: {allowEmpty: false},
    inclusion: {
      within: {
        "s" : "Small",
        "m": "Medium",
        "l" : "Large"
      }
    }
  },
  message: {
    presence: {allowEmpty: false}
  }
}


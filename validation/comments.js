const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateComment(data) {
    let errors = {}

    data.body = validText(data.body) ? data.text : "";

    if (!Validator.isLength(data.body, {min: 4, max: 100})){
        errors.body = 'A Comment must be between 4 and 100 chars'
    }


    if (Validator.isEmpty(data.body)) {
        errors.body = 'A Comment body is required'
    }


    return {
        errors,
        isValid: Object.keys(errors).length === 0
      };

}
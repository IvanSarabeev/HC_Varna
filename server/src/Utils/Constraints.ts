import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { PHONE_REGEX, CHARACTER_NAME_LENGTH_REGEX, EMAIL_REGEX } from 'Model/Regex';
import xssFilters from 'xss-filters';

export const validateCustomerInquery = () => {
    return [
        check("firstName")
            .notEmpty().withMessage('First name is required')
            .isAlpha().withMessage("First name contains only letter")
            .isLength({ min: 3, max: 25 }).withMessage("First name must be between 3 and 25 characters.")
            .matches(CHARACTER_NAME_LENGTH_REGEX).withMessage("First name can only contain letters, numbers, and underscores.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),
        
        check("lastName")
            .notEmpty().withMessage('Last name is required')
            .isAlpha().withMessage('Last name must only contain letters')
            .isLength({ min: 3, max: 25 }).withMessage("Last name must be between 3 and 25 characters.")
            .customSanitizer(value => xssFilters.inHTMLData(value)),

        check("email")
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please provide a valid email address')
            .matches(EMAIL_REGEX).withMessage('Please provide a valid email address')
            .isLength({ min: 5, max: 50 }).withMessage('Email must be between 5 and 50 characters.')
            .customSanitizer(value => value.trim()),
    
        check('phone')
            .optional()
            .matches(PHONE_REGEX).withMessage('Phone number is invalid')
            .isMobilePhone('any').withMessage('Please provide a valid phone number')
            .customSanitizer(value => value.trim()),
        
        check('message')
            .notEmpty().withMessage('Message is required')
            .isLength({ min: 20 }).withMessage('Message must be at least 20 characters long')
            .customSanitizer(value => xssFilters.inHTMLData(value)),
    ]
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
             status: false,
              errors: errors.array().map(err => ({ field: err.type, message: err.msg }))
            }); 
    }

    next(); // Move to next middleware If it's valid
};
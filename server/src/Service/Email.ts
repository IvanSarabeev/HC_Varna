import xssFilters from "xss-filters";
import { UserForm } from "Interfaces/UserFormIntf";
import { transport } from "utils/NodemailerConfig";

export const sendEmailResponse = async (formData: UserForm) => {
    try {
        const { firstName, lastName, email, phone, message } = formData;
    
        const sanitizedUserData = {
            firstName: xssFilters.inHTMLData(firstName),
            lastName: xssFilters.inHTMLData(lastName),
            email: xssFilters.inHTMLData(email),
            phone: xssFilters.inHTMLData(phone),
            message: xssFilters.inHTMLData(message)
        };

        // TODO: Check if the data doesn't contain any harm information
        // TODO: Add conditions if something is missing to return an error

        // TODO: Add new Data Model - CustomerInquiry for collecting messages.
        if (sanitizedUserData === null) {
            return null;
        }

        const customerInquiry = "";
        
        const emailTemplate = {
            from: sanitizedUserData.email,
            to: '', // Original Email Address
            subject: '',
            html: ``
        };

        if (sanitizedUserData) {
            await transport.sendMail(emailTemplate);

            // await userContact.save();
        }

        return { success: true, message: "Message Sended Successfully" };
    } catch (error) {
        
    }
};
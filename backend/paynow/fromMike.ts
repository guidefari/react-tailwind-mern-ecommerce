import { paynowIntegrationId, paynowIntegrationKey } from "../../config";
import { EPaynowRemotePaymentMethod, IPaynowResponse } from "../../interfaces";

const { Paynow } = require("paynow");
console.log(paynowIntegrationId, paynowIntegrationKey)
let paynow = new Paynow(paynowIntegrationId, paynowIntegrationKey);
 
paynow.resultUrl = "";
paynow.returnUrl = "";

export const makePaynowRemotePayment = async (reference: string, amount: number, mobileNumber: string, paymentMethod: EPaynowRemotePaymentMethod, authemail: string): Promise<IPaynowResponse> => {
    return new Promise(async (resolve, reject) => {
        let payment = paynow.createPayment(reference, authemail);
        payment.add("Trip", amount);
        const response: IPaynowResponse = await paynow.sendMobile(payment, mobileNumber, paymentMethod);
    
        if (response.success) {
            resolve(response);
        } else {
            reject(response.error);
        }
    })
}

//---------------------------------i think the next code was from a separate file, or maybe not--------------------------------------//

try {
    const paynowResponse = await makePaynowRemotePayment(http://trip.id, trip.cost, mobileNumber, paymentMethod, authemail);

    if (paynowResponse.success) {
        http://logger.info(`Payment Initialized for`, { tags: [ ...tags, 'payment-initialized']});
        // respond with instructions
        return res.json(response(true, "PAYMENT INITIALIZED.", {
            instructions: paynowResponse.instructions
        }));
    } else {
        return res.json(response(false, "PAYMENT NOT INITIALIZED.", {
            reason: paynowResponse.error
        }))
    }
} catch (e) {
    console.error(e)
}
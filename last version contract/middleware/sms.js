const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "a04d534a",
  apiSecret: "GJqYIytlwqJ7aHVl"
});

  const sendSms = async (to, text) => {
    try {
      const response = await vonage.sms.send({
        to:"21690502362",
        from: "Vonage APIs",
        text,
      });
      return response;
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
      throw error;
    }
  };
  
module.exports = { sendSms };

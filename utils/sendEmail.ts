import { validateEmailData } from "@/schemas/email";

type EmailData = {
  actor: string
  subject: string
  message: string
}


export async function sendEmail(data: EmailData): Promise<{success: boolean, message: string}> {
  const apiEndpoint = "/api/email";

  try {
    const result = validateEmailData(data);

    if (!result.error) {
      const response = await fetch(apiEndpoint, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("API error sending the email");
      }
  
      return await response.json();
    }
    return {
      success: false,
      message: result.error.message
    }
  } catch {
    return {
      success: false,
      message: "There was an error sending the email. Please try again later."
    };
  }
}
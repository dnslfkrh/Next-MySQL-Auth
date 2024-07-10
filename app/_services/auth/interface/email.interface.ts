export interface EmailServiceInterface {
  sendTemplateEmail<T extends keyof EMAIL_SEND>(
    type: T,
    to: string,
    params: EMAIL_SEND[T]
  ): Promise<boolean>;
  sendEmail(to: string, subject: string, text: string): Promise<boolean>;
}

export type EMAIL_SEND = {
  REGISTER: {
    code: string;
  };
  FIND_ID: {
    email: string;
  };
  FIND_PW: {
    code: string;
  };
};

export const EMAIL_SEND_SUBJECT: {
  [T in keyof EMAIL_SEND]: string;
} = {
  REGISTER: "Register Verification",
  FIND_ID: "Find ID",
  FIND_PW: "Find Password",
};

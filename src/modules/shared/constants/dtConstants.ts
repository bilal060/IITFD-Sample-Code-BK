import cfgApp from "../../../base/config/cfgApp";

export const USER_ALREADY_EXISTS = "User already exists";
export const USER_ADDED_SUCCESS = "User added successfully and verification email sent";
export const VERIFY_EMAIL_SUCCESS = "Email verified successfully";
export const FAILED_ADD_USER = "Failed to add user";
export const FAILED_VERIFY_EMAIL = "Failed to verify email";
export const FAILED_VERIFY_EMAIL_ALREADY_VERIFIED = "Email already verified";
export const FAILED_VERIFY_EMAIL_TOKEN_EXPIRED = "Verification link has expired";
export const FAILED_RECAPTCHA_VERIFICATION = "Failed to verify recaptcha";
export const EXPIRED_EMAIL_CONFIG = "emailExpiryInDays";
export const CONFIG_KEY = "cKey";
export const LOGIN_SUCCESS = "Login Successfully";
export const LOGIN_INVALID = "Username or Password is Invalid";
export const INVALID_ENTRY = "Invalid Entry";
export const UPDATED_SUCCESS = "Updated Successfully";
export const DELETED_SUCCESS = "Deleted Successfully";
export const INSERTED_SUCCESS = "Inserted Successfully";
export const ERR_FILE_NOT_EXISTS = "File not Exsist";
export const ERR_INVALID_DATA_PROVIDED = "File not Exsist";

export const dtEmailVerificationTemplate = (verifyLink: string | undefined, email?: string,
  verifyEmailButttonColor?: string, verifyEmailButttonBgColor?: string): string => `
<p>Hello <a href=${email ? `mailto:${email}` : "mailto:test@gmail.com"}>${email || "User"}</p><br />
<p>You are one step closer to activate your account. Set your password and start to access the  place.</p><br />
<p style="text-align: center;"><a style="cursor:pointer;" href=${verifyLink} target="_blank">
<button style="color:${verifyEmailButttonColor || cfgApp.verifyEmailButttonColor};
background-color:${verifyEmailButttonBgColor || cfgApp.verifyEmailButttonBgColor};
padding:10px; margin: 0px 0px 0px 10px; cursor:pointer;">Access Here</button></a> </p> <br />
<p>You can also copy and paste the following link on your browser:</p> <br /> 
<p><a href=${verifyLink} target="_blank">${verifyLink}</a></p> <br /> <br />
<p>Best regards,</p> <br /> 
<div style="color:grey; font-size:0.5rem;">
<p>If this was a mistake or you didn't intended it, you may click this <a href="/" target="_blank">Link
</a> to unsubscribe.</p>
<p>${cfgApp.businessName}<br />${cfgApp.businessEmail}<br />${cfgApp.businessAddress}</p>
</div><hr/>`;

export const dtEmailApprovalTemplate = (approvalLink: string | undefined, email?: string,
  verifyEmailButttonColor?: string, verifyEmailButttonBgColor?: string): string => `
<p>Hello <a href=${email ? `mailto:${email}` : "mailto:test@gmail.com"}>${email || "User"}</p><br />
<p>The user ${email || "test@gmail.com"} has requested access to your company. Use the link below to approve.</p><br />
<p style="text-align: center;"><a style="cursor:pointer;" href=${approvalLink} target="_blank">
<button style="color:${verifyEmailButttonColor || cfgApp.verifyEmailButttonColor};
background-color:${verifyEmailButttonBgColor || cfgApp.verifyEmailButttonBgColor};
padding:10px; margin: 0px 0px 0px 10px; cursor:pointer;">Go to Approval</button></a> </p> <br /><br />
<p>You can also copy and paste the following link on your browser:</p> <br /> 
<p><a href=${approvalLink} target="_blank">${approvalLink}</a></p> <br /> <br />
<p>Best regards,</p> <br /> 
<div style="color:grey; font-size:0.5rem;">
<p>If this was a mistake or you didn't intended it, you may click this <a href="/" target="_blank">Link
</a> to unsubscribe.</p>
<p>${cfgApp.businessName}<br />${cfgApp.businessEmail}<br />${cfgApp.businessAddress}</p>
</div><hr/>`;

export const dtEmailApprovalMessageTemplate = (validateLink: string | undefined, companyName?: string,
  email?: string, reason?: string): string => `
<p>Hello <a href=${email ? `mailto:${email}` : "mailto:test@gmail.com"}>${email || "User"}</p><br />
<p>The request access sent to company ${companyName || ""} has been approved. 
Access to link below to validate account: </p><br />
<p style="text-align: end;"><a style="cursor:pointer;" href=${validateLink} target="_blank">
ACCESS HERE</a> </p> <br /><br />
<p>You can also copy and paste the following link on your browser:</p> 
<p><a href=${validateLink} target="_blank">${validateLink}</a></p> <br /> <br />
<p>Best regards,</p> <br /> 
<div style="color:grey; font-size:0.5rem;">
<p>You received this email because ${reason}</p>
<p>If this was a mistake or you didn't intended it, you may click this <a href="/" target="_blank">Link
</a> to unsubscribe.</p>
<p>${cfgApp.businessName}<br />${cfgApp.businessEmail}<br />${cfgApp.businessAddress}</p>
</div><hr/>`;

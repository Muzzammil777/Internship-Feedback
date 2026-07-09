declare global {
  interface Window {
    Email: {
      send: (config: any) => Promise<string>;
    };
  }
}

export const sendEmailFromFrontend = (toEmail: string, subject: string, htmlContent: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const emailUser = import.meta.env.VITE_EMAIL_USER || "created.cms.movicloudlabs@gmail.com";
    const emailPass = (import.meta.env.VITE_EMAIL_PASS || "jdgiqfyegwjpedaf").replace(/\s/g, "");

    if (!window.Email) {
      const script = document.createElement("script");
      script.src = "https://smtpjs.com/v3/smtp.js";
      script.onload = () => {
        send();
      };
      script.onerror = () => {
        reject(new Error("Failed to load SMTPJS script"));
      };
      document.head.appendChild(script);
    } else {
      send();
    }

    function send() {
      window.Email.send({
        Host: "smtp.gmail.com",
        Username: emailUser,
        Password: emailPass,
        To: toEmail,
        From: emailUser,
        Subject: subject,
        Body: htmlContent,
        Port: 587
      })
        .then((message: string) => {
          if (message === "OK") {
            resolve(true);
          } else {
            reject(new Error(message));
          }
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  });
};

export const sendWelcomeEmail = (name: string, email: string, password: string, portalUrl: string): Promise<boolean> => {
  const subject = "WELCOME TO MIT CONNECT";
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to MIT Connect</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      color: #0f172a;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f8fafc;
      padding-bottom: 40px;
    }
    .main-table {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.05), 0 1px 3px rgba(124, 58, 237, 0.03);
      border: 1px solid #e2e8f0;
      margin-top: 40px;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo-badge {
      background-color: #ffffff;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      font-size: 24px;
      display: inline-block;
      margin-bottom: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.025em;
    }
    .header p {
      color: #ddd6fe;
      font-size: 14px;
      margin: 8px 0 0 0;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      background-color: #ffffff;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 12px;
    }
    .intro-text {
      font-size: 15px;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .credential-card {
      background-color: #f5f3ff;
      border: 1px solid #ddd6fe;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 30px;
    }
    .credential-row {
      margin-bottom: 16px;
    }
    .credential-row:last-child {
      margin-bottom: 0;
    }
    .credential-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #6d28d9;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .credential-value {
      font-size: 16px;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      color: #4c1d95;
      font-weight: 600;
      background-color: #ffffff;
      padding: 8px 12px;
      border: 1px solid #ddd6fe;
      border-radius: 6px;
      display: inline-block;
    }
    .cta-container {
      text-align: center;
      margin: 35px 0 25px 0;
    }
    .cta-button {
      background-color: #7c3aed;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      display: inline-block;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.2), 0 2px 4px -1px rgba(124, 58, 237, 0.1);
    }
    .divider {
      border: 0;
      border-top: 1px solid #ddd6fe;
      margin: 30px 0;
    }
    .info-footer {
      font-size: 13px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer {
      background-color: #f8fafc;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main-table">
      <tr>
        <td class="header">
          <div class="logo-badge">🎓</div>
          <h1>WELCOME TO MIT CONNECT</h1>
          <p>Unified Campus Management System</p>
        </td>
      </tr>
      <tr>
        <td class="content">
          <p class="greeting">Hello ${name},</p>
          <p class="intro-text">
            Your student account has been successfully created. You can now log in to the MIT Connect Portal to manage academics, view records, track tasks, and submit your feedback.
          </p>
          
          <div class="credential-card">
            <div class="credential-row">
              <div class="credential-label">Portal URL</div>
              <div class="credential-value" style="font-family: inherit; font-size: 14px;">${portalUrl}</div>
            </div>
            <div class="credential-row">
              <div class="credential-label">Username / Email</div>
              <div class="credential-value">${email}</div>
            </div>
            <div class="credential-row">
              <div class="credential-label">Temporary Password</div>
              <div class="credential-value">${password}</div>
            </div>
          </div>
          
          <div class="cta-container">
            <a href="${portalUrl}" class="cta-button" target="_blank">Sign In to Your Workspace</a>
          </div>
          
          <hr class="divider">
          
          <div class="info-footer">
            <p style="margin: 0 0 8px 0;"><strong>Important Security Notice:</strong> For your security, we recommend that you log in and change your password immediately upon your first sign-in.</p>
            <p style="margin: 0;">If you did not expect this email or believe this account was created in error, please contact your internship administrator.</p>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          &copy; 2026 MIT Connect. All rights reserved.<br>
          Internship Feedback System
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  return sendEmailFromFrontend(email, subject, htmlContent);
};

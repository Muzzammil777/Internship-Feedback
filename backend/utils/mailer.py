import smtplib
import os
import asyncio
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def _send_email_sync(to_email: str, subject: str, html_content: str) -> bool:
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")
    
    if not email_user or not email_pass:
        print("[EMAIL ERROR] EMAIL_USER or EMAIL_PASS not set in environment variables.")
        return False
        
    # Clean up spaces in app password
    email_pass = email_pass.replace(" ", "")
    
    try:
        # Create message container
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"OMS <{email_user}>"
        msg["To"] = to_email
        
        # Attach HTML content
        part = MIMEText(html_content, "html")
        msg.attach(part)
        
        # Connect to Gmail SMTP server using port 587 (STARTTLS)
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=15) as server:
            server.starttls()
            server.login(email_user, email_pass)
            server.sendmail(email_user, to_email, msg.as_string())
            
        print(f"[EMAIL SUCCESS] Email sent to {to_email} with subject: {subject}")
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send email to {to_email}: {str(e)}")
        return False

async def send_email(to_email: str, subject: str, html_content: str) -> bool:
    """
    Sends an HTML email asynchronously using standard smtplib run in a separate thread pool.
    This prevents blocking the FastAPI event loop during network requests.
    """
    if not to_email:
        print("[EMAIL WARNING] Recipient email is empty, skipping.")
        return False
        
    return await asyncio.to_thread(_send_email_sync, to_email, subject, html_content)

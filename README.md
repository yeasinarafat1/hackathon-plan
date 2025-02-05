## **Project Title**: Transparency Portal

**Purpose**:  
The Transparency Portal provides a secure and efficient platform for citizens to report corruption. It supports both anonymous and non-anonymous reporting while ensuring privacy, transparency, and accountability. Users must create accounts to submit complaints, undergo KYC verification using their **Bangladesh NID**, and are limited to **one complaint per user** to prevent spam.

---

### **Key Features**

1. **User Accounts & KYC Verification**:

   - All users must create an account with **email, phone number, and password**.
   - **KYC verification** using the **Bangladesh NID** ensures authenticity.
   - Each user can submit **only one complaint** (either anonymous or non-anonymous) to prevent spam.

2. **Anonymous Reporting**:

   - Users can submit complaints without linking their identity.
   - **Optional Email**: If provided, authorities can contact the user for further details while maintaining anonymity.

3. **Non-Anonymous Reporting**:

   - Complaints are linked to the user's **verified account**.
   - Authorities can contact the user via **email or phone** for further details.
   - Users receive real-time **notifications** about complaint status updates.

4. **Complaint Submission with Attachments**:

   - Users can upload **evidence** in **audio, video, image, or PDF** formats.

5. **Anonymous Complaint Tracking**:

   - Anonymous users get a unique **Complaint ID** to track the status.

6. **Spam Prevention**:

   - **Single Complaint Per User** policy.
   - **Google reCAPTCHA** to prevent bot submissions.

7. **AI Integration**:

   - **OpenAI Model** classifies complaints by severity (**Critical, Moderate, Minor**) and generates summaries for admin review.

8. **Comprehensive Admin Dashboard**:
   - View complaints, AI-generated severity levels, and user details (if non-anonymous).
   - Filter by **severity, type, or status**.
   - Contact users via **email/SMS** for additional information.
   - Update complaint statuses (**Under Review, Resolved, etc.**).

---

### **Tech Stack**

1. **Frontend**:

   - **Framework**: React.js and Next.js.
   - **Styling**: Tailwind CSS.

2. **Backend**:

   - **Framework**: Appwrite Cloud.
   - **Database**: Appwrite Cloud.
   - **AI Integration**: OpenAI API for classification and summarization.
   - **Notification Service**: Nodemailer (email) or Twilio (SMS).

3. **Deployment**:
   - **Frontend**: Vercel.
   - **Backend**: Appwrite Cloud.

---

## **Project Flow**

### **Step 1: User Registration & KYC Verification**

1. Users **register with their email, phone number, and password**.
2. **KYC Verification**: Users must submit their **Bangladesh NID** for identity verification.
3. Upon verification, the user gains access to the complaint system.

---

### **Step 2: Complaint Submission**

1. **User selects complaint type**:

   - **Anonymous Complaint**: No identity linked, but optional email for follow-up.
   - **Non-Anonymous Complaint**: Linked to the user’s **verified account**.

2. **User fills out complaint details**:

   - **Type of corruption** (e.g., bribery, fraud).
   - **Description** (what, where, when).
   - **Optional email for anonymous complaints**.
   - **Attach supporting files** (audio, video, image, PDF).

3. **System validates complaint**:
   - **Checks if the user has already submitted a complaint** (to enforce the one-complaint-per-user rule).
   - Stores data in the **Appwrite database**.
   - Generates a **Complaint ID** for tracking (if anonymous).

---

### **Step 3: AI Classification and Summarization**

1. OpenAI processes the complaint:
   - Classifies it into **Critical, Moderate, or Minor**.
   - Generates a **summary** for admins.

---

### **Step 4: Tracking and Notifications**

1. **Anonymous Users**:

   - Track complaints using a unique **Complaint ID**.

2. **Non-Anonymous Users**:
   - Receive notifications (via **email/SMS**) about status updates.
   - Can view complaint history in their account dashboard.

---

### **Step 5: Admin Review and Follow-Up**

1. Admin accesses the dashboard with features to:
   - View complaints with AI-generated **severity levels and summaries**.
   - **Filter complaints** by severity, type, or status.
   - **Update complaint statuses** (e.g., "Under Review," "Resolved").
   - **Contact users via email/SMS** for more information.

---

### **Privacy & Security Considerations**

- **Anonymous Complaints**:

  - No personal data is stored unless an optional **email** is provided.
  - The system encrypts email addresses for **secure follow-ups**.

- **Non-Anonymous Complaints**:

  - Authorities can contact users via **email/phone** for follow-ups.
  - Status updates are **sent via email/SMS**.

- **Single Complaint Policy**:
  - Each user can submit **only one complaint** to prevent spam.
  - The system **checks user records** before allowing submissions.

### **Final Thoughts**

This approach balances **privacy, security, and efficiency**, ensuring that:  
✅ **KYC verification prevents spam** while maintaining accountability.  
✅ **Anonymous users stay protected** but can be contacted via optional email.  
✅ **Non-anonymous users receive updates and direct communication**.  
✅ **The system is optimized for hackathon constraints** while being scalable for future improvements.

# Note that though we have limited recource and time so we will skip KYC for this project it be something to implement in future.

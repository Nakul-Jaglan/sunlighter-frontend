# Employment Verification Request System

## Overview
A complete system for employees to request employment verification from their employers, and for employers to approve or reject these requests.

## How It Works

### For Employees:
1. **Add Employment Record**: Employee adds their employment history with company details
2. **Request Verification**: Employee can request verification from their employer for any employment record
3. **Track Status**: View all verification requests and their current status (Pending, Approved, Rejected, Expired)

### For Employers:
1. **Receive Requests**: When an employee adds your company and requests verification, you'll see it in your dashboard
2. **Review Details**: See employee information, job details, and any message from the employee
3. **Approve/Reject**: Decide whether to approve or reject the verification request with optional response message
4. **Track Statistics**: View counts of total, pending, approved, and rejected requests

## Features

### Employee Features:
- **Create Verification Requests**: Request verification for employment records
- **Track Request Status**: Monitor pending, approved, rejected, and expired requests
- **Add Messages**: Include context messages to help employers identify them
- **Automatic Company Matching**: System tries to match company names with registered employers

### Employer Features:
- **Request Management**: View and process verification requests from employees
- **Detailed Employee Information**: See employee name, email, job title, and employment dates
- **Response Messages**: Add messages when approving or rejecting requests
- **Statistics Dashboard**: Track verification request metrics
- **Status Filtering**: Filter requests by status (Pending, Approved, Rejected, All)

### System Features:
- **Automatic Expiration**: Requests expire after 30 days if not processed
- **Database Integration**: Full CRUD operations with PostgreSQL
- **Real-time Updates**: Status changes reflect immediately
- **Secure Authentication**: Role-based access control
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

### Employee Endpoints:
- `POST /employment-verification-requests/` - Create new verification request
- `GET /employment-verification-requests/my-requests` - Get employee's requests

### Employer Endpoints:
- `GET /employment-verification-requests/pending` - Get requests for employer
- `PUT /employment-verification-requests/{id}/status` - Update request status
- `GET /employment-verification-requests/stats` - Get verification statistics

## Database Schema

### Employment Verification Requests Table:
- `id`: Primary key
- `employment_id`: Reference to employment record
- `employee_id`: Reference to employee user
- `employer_id`: Reference to employer user (auto-matched)
- `company_name`: Company name as entered by employee
- `company_website`: Optional company website
- `company_handle`: Auto-matched company handle (@company)
- `status`: pending | approved | rejected | expired
- `verification_message`: Optional message from employee
- `verification_notes`: Internal notes (employer response)
- `created_at`: Request creation timestamp
- `updated_at`: Last update timestamp
- `verified_at`: Verification decision timestamp
- `expires_at`: Request expiration timestamp (30 days)

## User Interface

### Navigation:
- **Employees**: "Verification Requests" link in user dropdown
- **Employers**: "Verify Employees" link in user dropdown

### Employee Pages:
- `/verification-requests`: Create and view verification requests

### Employer Pages:
- `/employer/verification-requests`: Manage employee verification requests

## Security & Privacy
- Only employees can create verification requests for their own employment records
- Only matched employers can see and respond to verification requests
- All requests expire automatically after 30 days
- Role-based access control ensures data privacy
- Secure JWT authentication required for all operations

## Benefits
1. **Trust Building**: Verified employment history builds trust with potential employers
2. **Automated Process**: Reduces manual verification processes
3. **Transparency**: Clear status tracking for all parties
4. **Privacy Focused**: Only relevant employers see verification requests
5. **Time-bound**: Automatic expiration prevents stale requests
6. **User Friendly**: Intuitive interfaces for both employees and employers

This system creates a seamless flow where employees can get their employment history verified by employers, creating a trusted network of verified employment data.

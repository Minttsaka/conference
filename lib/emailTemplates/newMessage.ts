export const newMessageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .email-header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .email-body {
            padding: 20px;
            color: #333333;
        }
        .email-body p {
            line-height: 1.6;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #777777;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>New Message from {{name}}</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <p>Hi,</p>
            <p>You have received a new message from your portfolio contact form:</p>
            <p><strong>Message:</strong></p>
            <p>{{message}}</p>
            <p>You can reply directly to this email to respond to {{name}}.</p>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>&copy; {{currentYear}} Miracle Tsaka. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`

export const headActivationTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Approval & Account Creation - QuizMaster</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 12px 20px;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 10px;
        }
        .btn:hover {
            background-color: #218838;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to QuizMaster!</h1>
        <p>Dear <strong>{{name}}</strong>,</p>
        <p>We are excited to inform you that your school, <strong>{{school}}</strong> has been <strong>approved</strong> to use QuizMaster, and your account as the head of the school has been successfully created.</p>
        
        <p>To verify your account and set up your password, please click the button below:</p>
        
        <a href="{{url}}" class="btn">Verify Account</a>
        
        <p>Once you have verified your account, you can start configuring your school in the app. Here are a few steps to get you started:</p>
        <ul>
            <li>Add your classes and lessons.</li>
            <li>Register students and assign them to classes.</li>
            <li>Add teachers to manage classes and lessons.</li>
            <li>Customize your school's settings.</li>
            <li>Explore more features in QuizMaster.</li>
        </ul>
        
        <p>Here are your account details:</p>
        <p>
            <strong>Username:</strong> {{username}}<br>
            <strong>Password:</strong> {{password}}
        </p>

        <p>If you have any questions or need assistance, feel free to <a href="https://quizmaster.dctfusion.tech/contact">contact our support team</a>.</p>
        
        <div class="footer">
            <p>Best regards,<br>QuizMaster Team</p>
        </div>
    </div>
</body>
</html>
`
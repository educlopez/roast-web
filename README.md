# Roast by Edu Calvo

Welcome to the Roast by Edu Calvo project! This website offers a free service where users can submit their web projects for redesign and improvement. The goal is to provide creative ideas, detailed analysis, and a fresh redesign to help projects stand out online.

## Table of Contents

- [Roast by Edu Calvo](#roast-by-edu-calvo)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technical Information](#technical-information)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

Roast by Edu Calvo is a platform designed to help individuals and businesses enhance their web presence. Users can submit their projects, and Edu Calvo will provide feedback and a redesign based on the submitted information.

## Features

- **Free Redesign Service**: Submit your project for a free redesign.
- **User-Friendly Interface**: Easy-to-use submission form.
- **Real-Time Updates**: Get notified about the status of your submission.
- **Social Media Sharing**: Projects will be shared on social media for visibility.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/educlopez/smoothui.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd smoothui
   ```

3. **Install Dependencies**:
   Make sure you have Node.js and npm installed. Then, run:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project and add the following environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   RESEND_API_KEY=your_resend_api_key
   ```

5. **Run the Development Server**:
   Start the development server:

   ```bash
   npm run dev
   ```

6. **Open the Project**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the project.

## Usage

To submit your project for a redesign, fill out the submission form available on the website. Provide the URL of your project and any additional comments you may have. After submission, you will receive a confirmation and updates regarding your project.

## Technical Information

- **Backend**: The project uses Supabase as the backend service for managing submissions and user data.
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase instance.
  - `SUPABASE_SERVICE_ROLE_KEY`: The service role key for accessing Supabase.
  - `RESEND_API_KEY`: The API key for sending emails via Resend.

## Contributing

We welcome contributions to improve the Roast by Edu Calvo project! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Thank you for your interest in Roast by Edu Calvo! If you have any questions, feel free to reach out to the maintainers.

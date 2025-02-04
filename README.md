# Roast web

![Screenshot of roast-web](/public/og.jpg)

<div align="center">

![Next.js Badge](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)
![Motion Badge](https://img.shields.io/badge/Motion-ECD53F?style=flat)
![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=flat)

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fpheralb%2Fsvgl%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/educlopez/roast-web/goto?ref=main)
![GitHub stars](https://img.shields.io/github/stars/educlopez/roast-web)
![GitHub issues](https://img.shields.io/github/issues/educlopez/roast-web)
![GitHub forks](https://img.shields.io/github/forks/educlopez/roast-web)
![GitHub PRs](https://img.shields.io/github/issues-pr/educlopez/roast-web)

</div>

Welcome to the Roast web project! This website offers a free service where users can submit their web projects for redesign and improvement. The goal is to provide creative ideas, detailed analysis, and a fresh redesign to help projects stand out online.

## Table of Contents

- [Roast web](#roast-web)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technical Information](#technical-information)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

Roastweb is a platform designed to help individuals and businesses enhance their web presence. Users can submit their projects, and Edu Calvo will provide feedback and a redesign based on the submitted information.

## Features

- **Free Redesign Service**: Submit your project for a free redesign.
- **User-Friendly Interface**: Easy-to-use submission form.
- **Real-Time Updates**: Get notified about the status of your submission.
- **Social Media Sharing**: Projects will be shared on social media for visibility.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/educlopez/roast-web.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd roast-web
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

We welcome contributions to improve the Roast web project! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Thank you for your interest in Roast web! If you have any questions, feel free to reach out to the maintainers.

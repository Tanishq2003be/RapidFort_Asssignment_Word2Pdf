# Word2PDF

## Overview

**Word2PDF** is a complete web application designed to convert Microsoft Word documents (`.doc` and `.docx`) into PDF format. It is built with React.js for the frontend and Node.js with Express for the backend. The app features a responsive design with support for both dark and light themes, and it uses Tailwind CSS for styling. It also integrates various tools and libraries to optimize the development process.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Styling**: Tailwind CSS
- **Development Tools**: Vite, Nodemon
- **Libraries**:
  - `multer` (for handling file uploads)
  - `docx-pdf` (for converting Word documents to PDF)
  - `hummus-recipe` (for password protection of pdf)
  - `cors`

## Installation

### Frontend

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/Doc2PDF.git
   cd Doc2PDF

   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to view the application.

### Backend

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start the Server**:

   ```bash
   nodemon index.js
   ```

   Ensure the backend server is running and accessible.

## Usage

1. **Access the Application**: Go to `http://localhost:3000` in your browser.
2. **Choose a File**: Click the "Choose File" button to upload a .doc or .docx file from your device.
3. **Start Conversion**: Press the "Convert File" button to begin the file conversion process.
4. **Download the PDF**: Once the conversion is finished, you will be provided with a link to download the converted PDF file.
5. **View metadata**: Once file is converted into pdf you will able to see metadata of file at bottom of download button.
6. **Password Protected**: Once file is converted into pdf you will provide a password to open pdf file.
7. **Paasword to open file**: Password for user: secure123 and for owner: owner123 you can change this password inside code for your choice

## Configuration

- **API Endpoint**: The frontend is configured to communicate with the backend API endpoint at `http://localhost:3000/convertFile` (adjust if necessary).

## Screenshots

**Layout**

![Layout UI/UX](image.png)

**Select a File after clicking on Choose A File**

![Choose a File](image-1.png)

**File Uploaded**

![File Uploaded](image-2.png)

**View metadata and download file after clicking convert file**

![Download file and view metadata](image-3.png)

**Enter password after clicking on download**

![Enter Password](image-4.png)

**Password is protected**

![Protected Password](image-5.png)

**Converted PDF**

![Result](image-6.png)

**Download from top right corner**

![Download](image-7.png)

**Pdf Downloaded**

![Downloaded PDF](image-8.png)

## Contributing

We welcome contributions to improve the project. To contribute:

1. **Fork the Repository**.
2. **Create a New Branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Make Your Changes**.
4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add your message here"
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature
   ```
6. **Create a Pull Request**.

## Kubernetes Deployment

# React App and Node.js Backend Deployment on Kubernetes

This project contains a React frontend and a Node.js backend for converting Word documents to PDF. The app is designed to be deployed on Kubernetes.

## Prerequisites

Before deploying the application, ensure you have the following:

- **Kubernetes Cluster**: Set up and running (e.g., Minikube for local development, GKE, EKS, or AKS for cloud).
- **kubectl**: Kubernetes command-line tool installed and configured to connect to your cluster.
- **Docker**: For building and pushing container images.
- **Docker Registry Account**: For pushing images (e.g., Docker Hub, AWS ECR, GCR).
- **Ingress Controller**: Optional, if you plan to expose your app via domain.

## Setup Instructions

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

**Step 2: Build Docker Images**

Frontend Docker Image: Build the Docker image for the React frontend.

```bash
docker build -t your-docker-username/frontend-app:latest ./frontend
```

# React App and Node.js Backend Deployment on Kubernetes

This project contains a React frontend and a Node.js backend for converting Word documents to PDF. The app is designed to be deployed on Kubernetes.

## Prerequisites

Before deploying the application, ensure you have the following:

- **Kubernetes Cluster**: Set up and running (e.g., Minikube for local development, GKE, EKS, or AKS for cloud).
- **kubectl**: Kubernetes command-line tool installed and configured to connect to your cluster.
- **Docker**: For building and pushing container images.
- **Docker Registry Account**: For pushing images (e.g., Docker Hub, AWS ECR, GCR).
- **Ingress Controller**: Optional, if you plan to expose your app via domain.

## Setup Instructions

### Step 1: Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-folder>
```

**Step 2: Build Docker Images**

**Frontend Docker Image**: Build the Docker image for the React frontend.

```bash
docker build -t your-docker-username/frontend-app:latest ./frontend
```

**Backend Docker Image**: Build the Docker image for the Node.js backend.

```bash
docker build -t your-docker-username/backend-app:latest ./backend
```

**Step 3: Push Docker Images to a Container Registry**

Push the frontend and backend Docker images to your container registry.

Push Frontend Image:

```bash
docker push your-docker-username/frontend-app:latest
```

**Push Backend Image:**

```bash
docker push your-docker-username/backend-app:latest
```

**Running Docker Containers**

Frontend:

```bash
docker run -p 3001:3001 your-docker-username/frontend-app
```

Backend:

```bash
docker run -p 3000:3000 your-docker-username/backend-app
```

### Key Sections:

1. **Prerequisites**: Ensures the user has everything needed to get started.
2. **Setup Instructions**: Guides the user on how to clone, open, and set up the project in Visual Studio Code.
3. **Running the Application**: Details the commands to run both the frontend and backend locally.
4. **Debugging and Extensions**: Provides tips for better development experience in VS Code.
5. **Docker**: Optional instructions for building and running the app with Docker.
6. **Common Issues**: Helps troubleshoot common errors encountered during setup.

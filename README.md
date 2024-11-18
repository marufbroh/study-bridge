# Study Bridge

Study Bridge is an advanced learning platform that enables users to buy and access courses and empowers instructors to create and manage their own courses. The platform is built with modern technologies to ensure a smooth and engaging user experience.

---

## 🌟 Features

### General Features
- **Home Page**: Course listings, "Explore Now" section, and engaging UI.
- **Course Details Page**: Detailed information about each course.
- **Authentication**: Register as a user or instructor, login, and manage account with secure JWT-based authentication.
- **Stripe Integration**: Seamless payment handling for course enrollments.
- **Email Functionality**: Send notifications and updates using Resend.

### Dashboard Features
- **Instructor Dashboard**: Manage course data, reviews, and enrollments.
- **Analytics**: Monitor student progress and course performance.
- **Course Creation**: Add metadata, upload images, and publish/unpublish courses.
- **Module Management**: Create and reorder modules, update titles, and manage lessons.
- **Lesson Management**: Add videos, update titles, and manage lesson visibility.
- **Quiz Management**: Add quizzes and integrate them with courses.
- **Progress Tracking**: Show course completion in real-time.

### Learning Features
- **Video Player**: Stream lessons with progress tracking and watch history updates.
- **Lesson Navigation**: Sidebar with links to lessons and real-time state management.
- **Course Completion Certificate**: Downloadable certificates for completed courses.
- **Quiz Submission**: Evaluate knowledge through quizzes linked to lessons.

---

## 🛠️ Technologies Used

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Mongoose, MongoDB
- **Authentication**: Auth.js (with JWT refresh tokens)
- **Payments**: Stripe
- **File Management**: Cloudinary
- **Forms**: React Hook Form
- **Email Sending**: Resend

---


---

## 🗄️ Database Design

### Key Models
1. **User**: Tracks user information, roles, and account details.
2. **Course**: Manages course metadata, modules, and lessons.
3. **Module**: Organizes lessons and supports reordering.
4. **Lesson**: Includes video links, quiz data, and watch history.
5. **Quiz**: Holds quiz questions and answers for lessons.
6. **Enrollment**: Tracks users enrolled in courses.

---

## ⚡ Pages and Components

### Public Pages
- **Home Page**
- **Course List**
- **Course Details**

### Authentication Pages
- **Login**
- **Register**
- **Reset Password**
- **Account Update**

### Dashboard Pages
- **Instructor Dashboard**
- **Analytics**
- **Course Management**
- **Module Management**
- **Lesson Management**
- **Quiz Management**

---

## Acknowledgements

I would like to thank **LWS and Tapas Adhikary** for providing an excellent learning resource that guided me in building this project. The tutorials and insights from LWS were invaluable in helping me develop and enhance my skills throughout the process.

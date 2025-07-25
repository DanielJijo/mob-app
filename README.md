# TaskFlow - Modern Todo Management App

A beautiful, responsive task management application built with Next.js, Supabase, and modern UI components. This app provides a seamless experience for managing your daily tasks with features like authentication, real-time updates, and a polished user interface.

## 🚀 Live Demo

**[View Live App](https://your-app-url.vercel.app)**

## ✨ Features

### Authentication & Security
- 🔐 Google & GitHub OAuth integration via Supabase
- 🛡️ Row-level security for data protection
- 👤 Personalized user dashboard
- 🔄 Automatic session management

### Task Management
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- 📝 Rich task details (title, description, due date, priority)
- 🎯 Priority levels (High, Medium, Low) with visual indicators
- ✔️ Mark tasks as complete/incomplete
- 🗑️ Delete confirmation dialogs

### User Experience
- 📱 Fully responsive design (mobile-first)
- 🎨 Modern, clean UI with smooth animations
- 🔍 Real-time search functionality
- 🏷️ Filter by status (All, Open, Completed)
- 📅 Due date tracking with overdue indicators
- 🎭 Empty states for better UX
- ➕ Floating Action Button for quick task creation

### Technical Features
- ⚡ Built with Next.js 14 and React 18
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🧩 shadcn/ui component library
- 🗄️ Supabase for backend and authentication
- 🔄 Real-time data synchronization
- 📊 Context API for state management
- 🎭 Smooth animations and transitions

## 🏗️ Architecture

### High-Level Architecture Diagram

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Supabase      │    │   Database      │
│   (Next.js)     │◄──►│   (Backend)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React         │    │ • Auth          │    │ • tasks table   │
│ • TypeScript    │    │ • Real-time     │    │ • RLS policies  │
│ • Tailwind CSS  │    │ • REST API      │    │ • Indexes       │
│ • Context API   │    │ • Row Security  │    │ • Triggers      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
\`\`\`

### Component Architecture

\`\`\`
App Layout
├── AuthProvider (Authentication Context)
├── TaskProvider (Task Management Context)
├── Dashboard
│   ├── Header (Search, Filters, User Menu)
│   ├── TaskList (Task Cards Grid)
│   ├── TaskCard (Individual Task Display)
│   ├── TaskDialog (Create/Edit Modal)
│   ├── EmptyState (No Tasks View)
│   └── FloatingActionButton (Quick Add)
└── LoginPage (OAuth Authentication)
\`\`\`

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Supabase Auth (Google, GitHub OAuth)
- **State Management**: React Context API
- **Deployment**: Vercel
- **Database**: PostgreSQL with Row Level Security

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/taskflow-app.git
cd taskflow-app
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Environment Setup
Create a \`.env.local\` file in the root directory:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. Database Setup
1. Create a new Supabase project
2. Run the SQL script from \`scripts/create-tasks-table.sql\` in your Supabase SQL editor
3. Enable Google/GitHub OAuth in Supabase Auth settings

### 5. OAuth Configuration
In your Supabase project:
1. Go to Authentication → Settings → Auth Providers
2. Enable Google and/or GitHub providers
3. Add your OAuth app credentials
4. Set redirect URLs to your domain

### 6. Run Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit \`http://localhost:3000\` to see the app running.

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
\`\`\`

## 📱 Features Walkthrough

### Authentication Flow
1. Users land on a beautiful login page
2. Choose between Google or GitHub OAuth
3. Automatic redirect to dashboard after successful login
4. Persistent sessions with automatic refresh

### Task Management
1. **Create**: Click FAB or "Add Task" button
2. **Read**: View all tasks in card format with priority indicators
3. **Update**: Click edit button to modify task details
4. **Delete**: Delete with confirmation dialog

### Filtering & Search
- **Search**: Real-time search across task titles and descriptions
- **Filter**: Toggle between All, Open, and Completed tasks
- **Visual Indicators**: Priority colors and due date badges

## 🎯 Key Features Implemented

✅ Google/GitHub OAuth authentication  
✅ Responsive design (mobile-first)  
✅ Full CRUD operations  
✅ Real-time search and filtering  
✅ Priority levels with visual indicators  
✅ Due date tracking  
✅ Smooth animations  
✅ Empty states  
✅ Floating Action Button  
✅ Delete confirmations  
✅ Error handling  
✅ Loading states  
✅ TypeScript implementation  
✅ Clean code architecture  

## 🔮 Future Enhancements

- [ ] Offline support with service workers
- [ ] Push notifications for due dates
- [ ] Task categories and tags
- [ ] Drag & drop task reordering
- [ ] Dark mode toggle
- [ ] Task sharing and collaboration
- [ ] Calendar integration
- [ ] Export functionality
- [ ] Advanced filtering options
- [ ] Task templates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the icon library

---

**This project is a part of a hackathon run by https://www.katomaran.com**
#   m o b - a p p  
 
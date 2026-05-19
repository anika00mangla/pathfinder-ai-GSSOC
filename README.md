<h1 align="center">PathFinder AI 🧠💼</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/harshdwivediiiii/pathfinder-ai/main/public/pathfinder-ai.gif" alt="PathFinder AI Preview" width="100%" />
</p>

<p align="center">
  <strong>Your AI-Powered Career Coach & Resume Builder</strong>
</p>

<p align="center">
  PathFinder AI is an intelligent web application that helps users craft professional resumes,
  generate tailored cover letters, and prepare for interviews using AI-powered workflows.
  Whether you're launching your career or making your next big move,
  <strong>PathFinder AI</strong> becomes your personalized career companion.
</p>

---

## ✨ Features

- 📄 **AI Resume Builder** – Create personalized, ATS-friendly resumes.
- ✉️ **Cover Letter Generator** – Generate tone-matched, role-specific letters.
- 🎯 **Interview Preparation** – Practice with adaptive, role-based AI questions.
- 📊 **Industry Insights** – Get real-time trends, salary data, and in-demand skills.
- 🔐 **Secure Authentication** – Authenticated via Clerk with complete session management.
- ⚡ **Modern UI/UX** – Responsive, elegant, and production-ready interface.
- ☁️ **Cloud Deployment** – Optimized deployment with Vercel.

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | Next.js 14 (App Router) |
| Authentication | Clerk.dev |
| AI Engine | Gemini API (Google AI) |
| Database | PostgreSQL + Prisma ORM |
| Styling | TailwindCSS + ShadCN UI |
| Deployment | Vercel |

---

## 🚀 Tech Badges

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Gemini%20API-Google%20AI-red?style=for-the-badge&logo=google" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-3982CE?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel" />
</p>

---

# ⚡ Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/harshdwivediiiii/pathfinder-ai.git
cd pathfinder-ai
```

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add:

```env
DATABASE_URL=your_postgresql_connection_string

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧪 Developer Notes (Clerk Keyless Mode)

When developing locally, Clerk can run in **keyless mode** (without API keys).

In this state:

- Authentication routes will redirect safely
- Protected dashboards won't crash
- Ideal for rapid frontend development

For full authentication behavior, configure:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
```

---

## 🗄️ Generate Prisma Client

```bash
npx prisma generate
```

---

## ▶️ Run the Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# 🔐 Authentication

All user accounts are securely managed using **Clerk.dev**.

After authentication, users pass through an onboarding flow before accessing their personalized dashboard experience.

---

# 🤖 AI Capabilities

PathFinder AI leverages the **Gemini API** to power:

- Resume bullet generation
- AI cover letter writing
- Interview preparation questions
- Career guidance workflows
- Personalized AI responses

Prompts are dynamically customized using:

- User input
- Job descriptions
- Tone selection
- Industry context

---

# 🌟 Open Source & GSoC 2026

We warmly welcome contributors from all backgrounds ❤️

PathFinder AI is actively preparing for **Google Summer of Code 2026 (GSoC'26)**.

We encourage contributions in:

- AI integrations
- Resume intelligence systems
- Performance optimization
- UI/UX enhancements
- Accessibility improvements
- Developer tooling
- Analytics dashboards
- Backend scalability
- Open-source documentation

---

# 🧑‍💻 How to Contribute

## 1️⃣ Fork the Repository

Click the **Fork** button at the top-right corner.

---

## 2️⃣ Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

---

## 3️⃣ Make Your Changes

Follow the existing coding style and project structure.

---

## 4️⃣ Commit Your Changes

```bash
git commit -m "feat: add your feature"
```

---

## 5️⃣ Push to GitHub

```bash
git push origin feature/your-feature-name
```

---

## 6️⃣ Create a Pull Request

Open a PR with:

- Proper description
- Screenshots (if UI changes)
- Related issue references

---

# 📌 Contribution Guidelines

Before contributing, ensure:

- ✅ Code is production-ready
- ✅ UI is responsive
- ✅ Existing conventions are followed
- ✅ No unnecessary dependencies are added
- ✅ Documentation is updated if needed
- ✅ Changes are tested locally

---

# 🏷️ Issue Labels

| Label | Meaning |
|------|------|
| `good first issue` | Beginner-friendly tasks |
| `gsoc` | GSoC-related issues |
| `bug` | Bug fixes |
| `enhancement` | Feature improvements |
| `documentation` | Docs-related work |
| `frontend` | Frontend/UI tasks |
| `backend` | Backend/API tasks |
| `ai` | AI/ML improvements |
| `help wanted` | Maintainer needs help |

---

# ✅ How to Get Assigned an Issue

1. Comment on the issue.
2. Explain your planned approach.
3. Wait for maintainer approval.
4. Start working after assignment.

### Example

```text
Hi maintainers 👋

I would like to work on this issue under GSoC'26.

Planned approach:
- Improve validation flow
- Optimize API handling
- Update related documentation

Could you please assign it to me?
```

---

# 🔥 Pull Request Guidelines

Before submitting a PR:

- Sync with latest `main`
- Resolve merge conflicts
- Add screenshots for UI changes
- Keep PRs focused
- Reference related issues

### PR Naming Convention

```text
feat: add resume analytics dashboard
fix: resolve onboarding bug
docs: improve setup guide
```

---

# 🧪 Development Standards

## Frontend

- Use reusable components
- Follow Tailwind conventions
- Ensure mobile responsiveness
- Maintain accessibility standards

## Backend

- Validate inputs properly
- Avoid exposing secrets
- Follow RESTful principles
- Handle edge cases gracefully

## AI Features

- Optimize prompt engineering
- Reduce token usage
- Ensure safe AI responses
- Add fallback handling

---

# 📖 Beginner-Friendly Contribution Ideas

New contributors can start with:

- Documentation improvements
- UI polishing
- Loading skeletons
- Accessibility fixes
- Mobile responsiveness
- Error handling
- Unit testing
- Analytics integration
- AI prompt optimization

---

# 🏆 Contributor Recognition

All contributors will be recognized publicly.

- Contributors appear in the README
- Major contributors receive mentions
- Long-term contributors may become collaborators

---

# ❤️ Our Contributors

Thanks to all the amazing contributors who make PathFinder AI better 🚀

<p align="center">
  <a href="https://github.com/harshdwivediiiii/pathfinder-ai/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=harshdwivediiiii/pathfinder-ai" />
  </a>
</p>

> Every commit automatically updates contributor profile pictures in the README.

---

# 🤝 Code of Conduct

Please be respectful, inclusive, and collaborative.

We aim to maintain a beginner-friendly and welcoming open-source environment for everyone.

---

# 📄 License

This project is licensed under the [MIT License](LICENSE).

---

# ✉️ Contact

For questions, collaborations, or feedback:

📧 **harshvardhandwivedi18@gmail.com**

---

# 🌐 Deployment

Deploy instantly using **Vercel**.

```bash
https://vercel.com/new
```

Need deployment help?

Check the official Next.js deployment documentation:

```bash
https://nextjs.org/docs/app/building-your-application/deploying
```

---

# 🌍 Support the Project

If you like PathFinder AI:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧑‍💻 Contribute to open source
- 🚀 Join during GSoC'26
- 📢 Share with developers

---

<p align="center">
  <strong>PathFinder AI</strong> – <em>Smart Careers Start Here.</em>
</p>
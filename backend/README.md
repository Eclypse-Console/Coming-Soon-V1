
# 🟣 Eclypse Coming Soon – Backend

This is the backend for the **Eclypse Coming Soon** project, built using Bun, Drizzle ORM, and PostgreSQL.



## ⚙️ Getting Started

### 📄 Step 1: Define Environment Variables

Create a `.env` file in the root of backend folder and add the following:

```env
PORT=define_port_number_here
DATABASE_URL=define_database_url_here
```
---

### 🔧 Step 2: Install Dependencies

```bash
bun install
```

---

### 🛠️ Step 3: Generate Migration from Schema

```bash
bun run generate:migration
```

---

### 🚀 Step 4: Push Schema to Database

```bash
bun run push:migration
```

---

### ▶️ Step 5: Start the Backend Server

```bash
bun start
```
 
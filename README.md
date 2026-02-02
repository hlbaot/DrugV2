# DrugV2 – Modern Social Network Application

DrugV2 là một ứng dụng mạng xã hội hiện đại được xây dựng với **Next.js App Router**, tập trung vào hiệu suất cao, trải nghiệm người dùng mượt mà và kiến trúc code dễ bảo trì.

Dự án mô phỏng các chức năng cốt lõi của một social network như đăng bài, tương tác (like, save), tải dữ liệu động và cuộn vô hạn.

---

## 🚀 Technical Highlights

### ⚡ Data Fetching & State Management
- **TanStack Query (React Query v5)**
  - Quản lý server state, thay thế hoàn toàn `useEffect`
  - Caching, background refetching giúp UI luôn nhanh và đồng bộ
  - **Optimistic Updates** cho các hành động như Like / Save (UI cập nhật ngay)
  - **Infinite Query** cho news feed (infinite scrolling)
- **Zustand**
  - Quản lý client state gọn nhẹ, tách biệt khỏi UI
  - Áp dụng store initializer pattern, an toàn với SSR (Next.js App Router)

### 🧠 Next.js App Router Architecture
- Kết hợp **Server Components & Client Components** đúng ngữ cảnh
- Tối ưu hiệu năng và SEO với server-side data fetching
- Tách rõ routing, logic data, state và UI

### 🔐 Authentication & API
- **NextAuth.js (v5)** quản lý đăng nhập và session
- **Axios + Interceptors** xử lý token và request tập trung

### 🎨 UI & UX
- **Tailwind CSS** cho layout nhanh và nhất quán
- **MUI** cho các component phức tạp
- **Swiper** cho slider ảnh/video
- Toast/Alert cho phản hồi người dùng

---

## 🛠 Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- TanStack Query v5
- Zustand
- NextAuth.js
- Axios
- Tailwind CSS, MUI

---

## 📦 Installation & Run (pnpm)

```bash
pnpm install
pnpm dev

# DrugV2 – Ứng dụng Mạng Xã Hội

DrugV2 là một ứng dụng mạng xã hội được xây dựng bằng **Next.js 15 App Router**, tập trung vào kiến trúc rõ ràng, hiệu suất cao và trải nghiệm người dùng mượt mà.

Dự án bao gồm các chức năng cốt lõi của một social network: đăng bài, tương tác (like, save, comment), trang profile, nhắn tin realtime và hệ thống follow/unfollow.

---

## 🚀 Tech Stack

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Next.js | 15 (App Router) | Framework chính |
| React | 19 | UI rendering |
| TypeScript | 5.7 | Type safety |
| TanStack Query | v5 | Server state & data fetching |
| Zustand | v5 | Client state management |
| NextAuth.js | v5 (beta) | Authentication & session |
| Axios | latest | HTTP client |
| Socket.IO Client | v4 | Realtime messaging |
| Tailwind CSS | 3.4 | Styling |
| MUI (Material UI) | v7 | UI components |
| Formik + Yup | latest | Form validation |
| SweetAlert2 | latest | Toast & Alert |
| Swiper | v11 | Image/video slider |
| date-fns | v4 | Định dạng ngày giờ |

---

## 📂 Cấu Trúc Dự Án

```
src/
├── api/                    # Các hàm gọi API (axios)
│   ├── API_getPost.ts      # Lấy danh sách bài viết & comments
│   ├── API_likePost.ts     # Like / Unlike bài viết
│   ├── API_savePost.ts     # Save / Unsave bài viết
│   ├── API_createPost.ts   # Tạo bài viết mới
│   ├── API_updatePost.ts   # Chỉnh sửa bài viết
│   ├── API_deletePost.ts   # Xóa bài viết
│   ├── API_Comment.ts      # Thêm comment
│   ├── API_userProfile.ts  # Profile, follow, unfollow
│   ├── API_Message.ts      # Tin nhắn (list & room detail)
│   ├── API_search.ts       # Tìm kiếm user
│   └── ...
│
├── hooks/
│   ├── queries/            # TanStack Query - useQuery hooks
│   │   ├── usePosts.ts     # usePostsFeed, useSavedPosts, usePostComments
│   │   ├── useProfile.ts   # useUserProfile, useUserPosts, useFollowers, useFollowing, useFullProfile
│   │   └── useMessage.ts   # useMessageList, useMessageRoom
│   └── mutations/          # TanStack Query - useMutation hooks
│       ├── usePostMutations.ts     # useLikePost, useSavePost, useAddComment
│       └── useProfileMutations.ts  # useFollowUser, useUnfollowUser, useUpdateProfile
│
├── store/                  # Zustand stores (client state)
│   ├── useUserStore.ts     # Thông tin user đăng nhập + persist middleware
│   ├── usePostStore.ts     # Danh sách bài viết feed
│   ├── useProfileStore.ts  # Dữ liệu profile (myProfile, viewedProfile)
│   ├── useSavePostStore.ts # Danh sách bài viết đã lưu
│   └── StoreInitializer.tsx# Xử lý SSR hydration cho Zustand
│
├── socket/                 # Socket.IO hooks
│   ├── message.ts          # useMessageSocket - join/leave room, nhận/gửi tin nhắn
│   ├── comment.ts          # Socket cho comments realtime
│   └── notifications.ts    # Socket cho notifications
│
├── components/             # UI components dùng chung
│   ├── QueryProvider.tsx   # TanStack Query provider wrapper
│   ├── ThemeProvider.tsx   # Dark/Light mode provider
│   ├── header.tsx          # Header navigation
│   ├── navbar.tsx          # Sidebar navigation
│   ├── post.tsx            # Card bài viết
│   ├── modal_create.tsx    # Modal tạo bài viết
│   ├── modal_detailPost.tsx# Modal xem chi tiết bài viết + comments
│   ├── modal_editProfile.tsx  # Modal chỉnh sửa profile
│   ├── modal_follow_list.tsx  # Modal danh sách follow/following
│   └── ...
│
├── pages/                  # Page components (được render trong app router)
│   ├── postFeedPage.tsx    # Trang News Feed
│   ├── profilePage.tsx     # Trang Profile cá nhân
│   ├── savePostFeedPage.tsx# Trang bài viết đã lưu
│   └── messagePage.tsx     # Trang nhắn tin
│
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── (auth)/             # Route group: đăng nhập, đăng ký
│   └── (dashboard)/        # Route group: các trang chính
│       ├── home/           # /home - News Feed
│       ├── [username]/     # /[username] - Profile page
│       ├── save/           # /save - Saved posts
│       └── message/        # /message - Nhắn tin
│
└── interfaces/             # TypeScript interfaces & types
```

---

## 🔐 Authentication

- **NextAuth.js v5** quản lý session người dùng
- **Axios Interceptors** tự động đính kèm token vào mọi request
- Session được lưu trong cookie, user info được persist bằng Zustand

---

## 🎨 UI / UX

- **Tailwind CSS** cho layout và responsive design
- **MUI (Material UI v7)** cho các component phức tạp (Modal, TextField, ...)
- **Formik + Yup / Zod** cho form validation (đăng nhập, đăng ký, tạo bài, chỉnh sửa profile)
- **SweetAlert2** cho popup xác nhận (xóa bài, ...)
- **react-toastify** cho toast notification
- **Swiper** cho slider ảnh/video trong bài viết
- **next-themes** cho Dark / Light mode
- **Skeleton loading** cho trạng thái chờ dữ liệu

---

## 📦 Cài Đặt & Chạy

Dự án sử dụng **pnpm** làm package manager. Làm theo các bước dưới đây để chạy dự án trên máy của bạn.

---

### Bước 1 – Cài pnpm (nếu chưa có)

> Bỏ qua bước này nếu bạn đã cài pnpm.

```bash
npm install -g pnpm
```

Kiểm tra cài đặt thành công:

```bash
pnpm --version
```

---

### Bước 2 – Clone repository

```bash
git clone https://github.com/your-username/DrugV2.git
cd DrugV2
```

---

### Bước 3 – Cấu hình biến môi trường

Sao chép file `.env.example` thành `.env.local` và điền đầy đủ thông tin:

```bash
cp .env.example .env.local
```

Mở `.env.local` và điền vào:

```env
# Database (Postgres)
POSTGRES_URL=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Auth
AUTH_SECRET=   # Tạo bằng lệnh: openssl rand -base64 32
AUTH_URL=      # Ví dụ: http://localhost:3000
```

---

### Bước 4 – Cài dependencies

```bash
pnpm i
```

---

### Bước 5 – Chạy dev server

```bash
pnpm dev
```

Mở trình duyệt và truy cập: **http://localhost:3000**

---

### Các lệnh khác

```bash
# Build production
pnpm build

# Chạy bản production sau khi build
pnpm start
```

---

## 🗺 Các Trang Chính

| Route | Trang | Mô tả |
|---|---|---|
| `/home` | News Feed | Xem bài viết, like, save, comment |
| `/[username]` | Profile | Xem profile, follow/unfollow, danh sách bài viết |
| `/save` | Saved Posts | Danh sách bài viết đã lưu |
| `/message` | Messages | Danh sách hội thoại + nhắn tin realtime |
| `/login` | Đăng nhập | Form đăng nhập |
| `/register` | Đăng ký | Form đăng ký tài khoản |

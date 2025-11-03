export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    email: string;
    id: number;
    avatarUrl: string | null;
    username: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
}
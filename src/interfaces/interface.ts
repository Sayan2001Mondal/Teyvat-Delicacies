export interface SignUp{
    username: string;
    email: string;
    password: string;
    profile_pic : FileList | null;
}

export interface SignIn{
  email:string;
  password:string;
}
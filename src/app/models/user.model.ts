export interface User {
  id: number,
  fullname: string,
  email: string,
  password: string,
  profiles?: string[],
  avatar: string
}

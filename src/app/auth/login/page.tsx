import { signInWithGithub } from './actions'
import Login from '@/components/Auth/Login/Login'

export default function LoginPage() {
  return (
    <Login action={signInWithGithub} />
  )
}
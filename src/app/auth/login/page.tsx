import { signInWithGithub } from './actions'
import Login from '@/components/auth/login/login'

export default function LoginPage() {
  return (
    <Login action={signInWithGithub} />
  )
}
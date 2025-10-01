import { signInWithGithub } from './actions'

export default function LoginPage() {
  return (
    <form>
      <button formAction={signInWithGithub}>Login with GitHub</button>
    </form>
  )
}
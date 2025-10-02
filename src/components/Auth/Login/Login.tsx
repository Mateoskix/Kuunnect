import React from "react";
import { Github, Orbit } from "lucide-react";

type LoginProps = {
  action: () => void;
};

const Login = ({ action }: LoginProps) => {
  return (
    <section className="flex flex-col gap-10 lg:gap-20 items-center">
      <div className="flex flex-row justify-center items-center">
        <Orbit className="lg:w-24 lg:h-24 md:w-16 md:h-16 w-12 h-12 text-primary mr-2" />
        <h1 className="page-title text-primary">Kuunnect</h1>
      </div>
      <form>
        <button formAction={action} className="styled-button px-8 py-2 flex flex-row justify-center items-center gap-2">Login with GitHub <Github className="w-4 h-4" /> </button>
      </form>
    </section>
  );
};

export default Login;

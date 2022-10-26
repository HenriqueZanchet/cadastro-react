import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { email, password } = ev.currentTarget
    alert(`email:${email}, password:${password}`)
    const request = await fetch(`/api/login/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await request.json()

    if (request.status >= 200 && request.status <= 299) {
      localStorage.setItem("token", responseData.token)
      alert("PARABAEINZ!")
      setRoute("teste")
      return
    }

    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }


  return <>
    <div className="modal">
      <h1>Login</h1>
      <form onSubmit={enviarDados} id="login">
        <div>
          <label htmlFor="email">E-mail</label>
          <input name="email" id="email" type="text" placeholder="E-mail"/>
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input data-mascara="password" name="password" id="password" type="password" placeholder="Senha"/>
        </div>
      <div className="action">
        <button type="submit" form="login">Entrar</button>
        <button onClick={() => setRoute("register")}>Cadastrar-se</button>
      </div>
      </form>
    </div>
  </>
}
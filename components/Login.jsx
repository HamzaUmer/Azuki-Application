import React from 'react'
const styles = {
    app__login_wrapper: 'flex min-h-screen items-center justify-center bg-[#b6271c] text-[#FFFDD0] text-lg font-bold',
    app__login_button: 'rounded-xl border px-10 py-5',
}

const Login = ({login}) => {
  return (
    <div className={styles.app__login_wrapper}>
        <button className={styles.app__login_button} onClick={login}>
            Connect With Metamask
        </button>
    </div>
  )
}

export default Login
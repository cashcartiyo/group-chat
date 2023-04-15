import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signinImage from '../assets/signup.jpg'

const cookies = new Cookies()

const initialState = {
  fullName: '',
  username: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(true)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, password, phoneNumber, avatarURL } = form

    const URL = "https://groupchat-8000.herokuapp.com/auth"

    const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL,
    })

    cookies.set('token', token)
    cookies.set('username', username)
    cookies.set('fullName', fullName)
    cookies.set('userId', userId)

    if (isSignup) {
      cookies.set('phoneNumber', phoneNumber)
      cookies.set('avatarURL', avatarURL)
      cookies.set('hashedPassword', hashedPassword)
    }
    window.location.reload()
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                  placeholder='Full Name'
                  name='fullName'
                  type='text'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input
                placeholder='Username'
                name='username'
                type='text'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='fullName'>Phone Number</label>
                <input
                  placeholder='Phone Number'
                  name='phoneNumber'
                  type='text'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='avatarURL'>Avatar URL</label>
                <input
                  placeholder='Aatar URL'
                  name='avatarUR'
                  type='text'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input
                placeholder='Password'
                name='password'
                type='password'
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  type='password'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup ? 'Sign Up!' : 'Sign In!'}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup
                ? 'Alredy have an account ?'
                : 'Dont have an account ?'
              }
              <span onClick={switchMode}>
                {isSignup ? ' Sign in!' : 'Sign Up!'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={signinImage} alt='sign in' />
      </div>
    </div>
  )
}

export default Auth

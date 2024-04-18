import React from 'react'

const Contact = () => {
  return (
    <section>
      <div className='px-4 mx-auto max-w-screen-md'>
        <h2 className='heading text-center '>Contact Us</h2>
        <p className='mb-8 lg:mb-16 font-light text-center text_para'>
          Got a technical issue? Want to send feedback about a beta feature? Let us Know
        </p>
   <form action='' className='space-y-8'>
     <div>
      <label htmlFor='email' className='form_label'>
Your Email
      </label>
      <input type='email' className='form_input mt-1' id='email' placeholder='example@gmail.com' />
     </div>
     <div>
      <label htmlFor='subject' className='form_label'>
Subject
      </label>
      <input type='text' className='form_input mt-1' id='subject' placeholder='Let us know how we can help you' />
     </div>
     <div>
      <label htmlFor='message' className='form_label'>
Your Message
      </label>
      <textarea rows={6} type='text' className='form_input mt-1' id='message' placeholder='Leave a comment...' />
     </div>
     <button type='button' className='btn rounded sm:w-fit'>Submit</button>
   </form>
      </div>
    </section>
  )
}

export default Contact

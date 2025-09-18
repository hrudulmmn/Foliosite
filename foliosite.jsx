function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-slate-400 mb-6">Feel free to reach out for collaborations or just a chat.</p>
        
        <form className="grid gap-4 max-w-md mx-auto">
          <input type="text" placeholder="Your Name" className="p-3 rounded bg-slate-800 border border-slate-700" />
          <input type="email" placeholder="Your Email" className="p-3 rounded bg-slate-800 border border-slate-700" />
          <textarea placeholder="Your Message" className="p-3 rounded bg-slate-800 border border-slate-700"></textarea>
          <button className="px-4 py-2 bg-sky-500 rounded hover:bg-sky-400">Send</button>
        </form>

        <div className="flex justify-center space-x-6 mt-6">
          <a href="https://github.com" className="hover:text-sky-400">GitHub</a>
          <a href="https://linkedin.com" className="hover:text-sky-400">LinkedIn</a>
          <a href="mailto:youremail@gmail.com" className="hover:text-sky-400">Email</a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
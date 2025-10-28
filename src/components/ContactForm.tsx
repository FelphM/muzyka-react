export function ContactForm() {
  return (
    <>
      <form action="" method="post">
        <label>
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="alice@gmail.com"
            required
          />
        </label>
        <label>
          Subject
          <input type="text" name="subject" id="subject" required/>
        </label>
        <label>
          Message
          <textarea
            name="message"
            id="message"
            placeholder="Hi there!..."
          ></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </>
  );
}

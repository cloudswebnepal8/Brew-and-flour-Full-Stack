export default function FloatButtons() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const chat = () => alert('Chat support is not connected in this demo template.')

  return (
    <div className="float-btns">
      <button className="float-btn up" aria-label="Scroll to top" onClick={scrollTop}>&#8593;</button>
      <button className="float-btn chat" aria-label="Chat" onClick={chat}>&#128172;</button>
    </div>
  )
}

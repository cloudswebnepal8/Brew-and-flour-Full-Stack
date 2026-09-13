import { useNavigate, useLocation } from 'react-router-dom'

export default function ReservePill() {
  const navigate = useNavigate()
  const location = useLocation()

  if (location.pathname === '/reserve') return null

  return (
    <button className="reserve-pill" onClick={() => navigate('/reserve')}>
      &#128197; Reserve Table
    </button>
  )
}

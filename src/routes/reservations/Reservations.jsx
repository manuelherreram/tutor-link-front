import MyReservationsPanel from "../../components/myReservationsPanel/MyReservationsPanel"
import { useAuth } from "../../contexts/AuthContext"
import './Reservations.css'

const Reservations = () => {
const {userId}= useAuth()

  return (
    <div className="container-reservations">
   
      <MyReservationsPanel userId={userId} />
    </div>
  )
}

export default Reservations


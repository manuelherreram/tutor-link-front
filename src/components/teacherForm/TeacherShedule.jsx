import { useEffect } from "react"
import { addSchedule } from "../../api/apiReservations"
import { Form } from "antd"
// importar id profe


const TeacherShedule = () => {
  
    const [schedule,setShedule]=useState({})


    

useEffect(()=>{
    const addScheduleData= async()=>{
        const res = addSchedule()
        setShedule(res)
    }

},[])






  return (
    <Form>

        
    </Form>
  )
}

export default TeacherShedule

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJS.register(ArcElement,Tooltip,Legend);


const ChartPie = ({chartData})=>{
    return(
        <div>
            <Pie 
                data = {chartData} 
                width={"30%"}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    )
}

export default ChartPie;
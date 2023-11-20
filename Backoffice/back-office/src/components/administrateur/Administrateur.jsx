import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement,} from "chart.js";
import { Doughnut, Bar} from "react-chartjs-2";
import axios from 'axios';
import BarNav from "./Navbar";
import sary from '../../Assets/Images/school-svgrepo-com.svg';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale,  BarElement,);

const Administrateur = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);

    const [dash, setDash] = useState({
      Niveau: [], // Assurez-vous que niveaux est une propriété dans votre objet dash
    });
    useEffect(() => {
      const getAllDash = async () => {
        try{
          const response = await axios.get('http://localhost:4000/Administrateur/dashbord');
          setDash(response.data);
          console.log(response.data);
        }catch(error){
          console.error(error);
        }
      }
      getAllDash();
    }, []);
    const [mention, setMention] = useState([])
    useEffect(() => {
      const getAllMention = async () => {
        try{
          const response = await axios.get('http://localhost:4000/Administrateur/mention');
          setMention(response.data);
          console.log(response.data);
        }catch(error){
          console.error(error);
        }
      }
      getAllMention();
    }, []);

    const data = {
        labels: Object.values(dash).map((niveau) => niveau.Niveau),
        datasets: [
          {
            label: 'Par Niveaux',
            data: Object.values(dash).map((niveau) => niveau.Total),
            backgroundColor: [  'blue'],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    return(
        <div className="content">
            <div className="nav">
                <BarNav/>
            </div>
            <div className="compent">
              <div className="componet-content">
                  <h3>statistique des étudiants</h3>
                  <div className="dashboard">
                    <div className="dash-top">
                    {mention.map((item, index) => (
                      <div key={index} className="anatiny">
                        <img src={sary} alt="" width={'25%'}/>
                        <p className="men">{item.Mention}</p>
                        <p className="tot">{item.Total}</p>
                      </div>
                    ))}
                    </div>
                    <div className="dash-bottom">
                        <div className="chart-anatiny">
                            <Bar options={options} data={data} />
                        </div> 
                    </div>
                  </div>
              </div>
            </div>
        </div>
    )
}

export default Administrateur;